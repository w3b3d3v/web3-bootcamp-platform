import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import { db } from '../../firebase/initFirebase'
import { collection, getDocs } from 'firebase/firestore'

const IssueCard = ({ issue }) => {
  return (
    <div className="m-2 flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg text-indigo-500">{issue.title}</h3>
        <p className="text-sm text-indigo-500">{issue.project_name}</p>
      </div>
      <p className="mb-4 text-sm text-gray-700">{issue.body}</p>
      <div className="text-sm text-gray-700">
        <p>
          <strong>Status:</strong> {issue.state}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(issue.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong> {new Date(issue.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 rounded-lg bg-gray-200 p-2 text-sm text-gray-700">
        {issue.fields &&
          issue.fields.length > 0 &&
          issue.fields.map((field, index) => (
            <p key={index}>
              <strong>{field.field}:</strong> {field.value}
            </p>
          ))}
        {issue.assignees && issue.assignees.length > 0 && (
          <p>
            <strong>Assignees:</strong>{' '}
            {issue.assignees.map((assignee, index) => (
              <span key={index} className="block">
                {assignee}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}

const Sidebar = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="text-white w-full p-4 sm:w-64">
      <h3 className="mb-4 text-xl">Filtros</h3>
      <div className="mb-4">
        <label>
          <span className="mb-2 block">Status:</span>
          <select
            name="status"
            onChange={handleFilterChange}
            className="text-white w-full rounded-lg bg-gray-800 p-2"
          >
            <option value="">Todos</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
      </div>
    </div>
  )
}

const Profile = () => {
  const [issues, setIssues] = useState([])
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tasks'))
        const issuesList = querySnapshot.docs.map((doc) => doc.data())
        setIssues(issuesList)
      } catch (error) {
        console.error('Error fetching issues:', error)
      }
    }

    fetchIssues()
  }, [])

  const filteredIssues = issues.filter((issue) => {
    return !filters.status || issue.state === filters.status
  })

  return (
    <>
      <Head>
        <title>Tasks - WEB3DEV</title>
      </Head>
      <div className="flex flex-col sm:flex-row">
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1 p-4">
          {filteredIssues.length === 0 ? (
            <p>Nenhuma issue encontrada.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredIssues.map((issue) => (
                <IssueCard key={issue.github_id} issue={issue} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default withProtected(Profile)
