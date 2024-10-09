require('dotenv').config()
const functions = require('firebase-functions')
const { db } = require('./lib/initDb')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const projects = [{ id: 24, name: 'Community Board', type: 'Codebase' }]

async function fetchKanbanProjectsGraphQL(organization, projectNumber, token, mode) {
  const query = `
      query {
        organization(login: "${organization}") {
          projectV2(number: ${projectNumber}) {
            id
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    title
                    body
                    url
                    assignees(first: 10) {
                      nodes {
                        login
                      }
                    }
                    createdAt
                    updatedAt
                    closedAt
                    state
                  }
                }
                fieldValues(first: 20) {
                  nodes {
                    ... on ProjectV2ItemFieldTextValue {
                      text
                      field {
                        ... on ProjectV2FieldCommon {
                          name
                        }
                      }
                    }
                    ... on ProjectV2ItemFieldNumberValue {
                      number
                      field {
                        ... on ProjectV2FieldCommon {
                          name
                        }
                      }
                    }
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field {
                        ... on ProjectV2FieldCommon {
                          name
                        }
                      }
                    }
                    ... on ProjectV2ItemFieldDateValue {
                      date
                      field {
                        ... on ProjectV2FieldCommon {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data from GitHub API')
    }

    const responseData = await response.json()
    const items = responseData.data.organization.projectV2.items.nodes

    if (mode === 'updated') {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000)
      const updatedItems = items.filter((item) => {
        if (item.content && item.content.updatedAt) {
          const updatedAt = new Date(item.content.updatedAt)
          return updatedAt >= sixtyMinutesAgo
        }
        return false
      })
      return updatedItems
    }

    return items
  } catch (error) {
    console.error('Error fetching Kanban projects:', error)
    throw error
  }
}

async function fetchAllProjectsData(organization, projects, token, mode) {
  const allIssues = []

  function transformIssueData(issue, projectName, projectId, projectType) {
    console.log('issue: ', issue)
    const content = issue.content || {}
    let status = null
    return {
      github_id: issue.id,
      project_id: projectId,
      project_name: projectName,
      project_type: projectType,
      title: content.title,
      body: content.body || '',
      url: content.url || '',
      assignees:
        content.assignees && content.assignees.nodes
          ? content.assignees.nodes
              .filter((assignee) => assignee && assignee.login)
              .map((assignee) => assignee.login)
          : [],
      createdAt: content.createdAt || null,
      updatedAt: content.updatedAt || null,
      closedAt: content.closedAt || null,
      state: content.state || 'unknown',
      fields:
        issue.fieldValues && issue.fieldValues.nodes
          ? issue.fieldValues.nodes
              .filter((node) => node.field && (node.text || node.number || node.date || node.name))
              .filter((node) => node.field.name !== 'Title')
              .map((node) => {
                if (node.field.name === 'Status') {
                  status = node.text || node.name
                  return null
                }
                return {
                  field: node.field.name,
                  value: node.text || node.number || node.date || node.name,
                }
              })
              .filter(Boolean)
          : [],
      status: status,
    }
  }

  for (const project of projects) {
    try {
      const nodes = await fetchKanbanProjectsGraphQL(organization, project.id, token, mode)
      if (nodes && nodes.length > 0) {
        const transformedNodes = nodes.map((issue) =>
          transformIssueData(issue, project.name, project.id, project.type)
        )
        allIssues.push(...transformedNodes)
      }
    } catch (error) {
      console.error(`Failed to fetch data for project ${project.name} (ID: ${project.id}):`, error)
    }
  }

  return allIssues
}

async function storeIssuesInFirestore(issues, mode) {
  const validIssues = issues.filter((issue) => issue.title !== undefined)

  const promises = validIssues.map(async (issue) => {
    const filteredIssue = {}
    for (const key in issue) {
      if (issue[key] !== undefined) {
        filteredIssue[key] = issue[key]
      }
    }

    try {
      if (mode === 'updated') {
        // Buscar o documento existente pelo github_id
        const querySnapshot = await db
          .collection('tasks')
          .where('github_id', '==', issue.github_id)
          .get()

        if (!querySnapshot.empty) {
          // Se o documento existir, atualize-o
          const docRef = querySnapshot.docs[0].ref
          await docRef.update(filteredIssue)
          return { github_id: issue.github_id, result: 'updated' }
        }
      }

      // Se o modo não for 'updated' ou se o documento não existir, crie um novo
      const issueDoc = db.collection('tasks').doc()
      await issueDoc.set(filteredIssue)
      return { github_id: issue.github_id, result: 'stored' }
    } catch (error) {
      console.error(`Error handling issue with github_id ${issue.github_id}:`, error)
      return { github_id: issue.github_id, result: 'failed', reason: error.message }
    }
  })

  return Promise.all(promises)
}

exports.fetchAndStoreIssues = functions.https.onRequest(async (req, res) => {
  const organization = 'w3b3d3v'
  const mode = req.query.mode === 'history' ? 'history' : 'updated'

  try {
    const allIssues = await fetchAllProjectsData(organization, projects, GITHUB_TOKEN, mode)
    if (!allIssues) return res.status(500).send('Error fetching issues')
    const results = await storeIssuesInFirestore(allIssues, mode)
    res.status(200).json({
      message: `Fetched and ${
        mode === 'updated' ? 'updated' : 'stored'
      } all projects issues successfully in ${mode} mode.`,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('An error occurred while fetching and storing issues.')
  }
})
