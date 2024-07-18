import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import { getAllTasks } from '../../lib/tasks'
import { useTranslation } from 'react-i18next'

const IssueCard = ({ issue }) => {
  return (
    <div className="m-2 flex flex-col justify-between rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg text-indigo-500">{issue.title}</h3>
      </div>
      <div className="text-sm text-gray-700">
        <p>
          <strong>Board:</strong> {issue.project_name}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(issue.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong> {new Date(issue.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

const Sidebar = ({ filters, setFilters }) => {
  const { t } = useTranslation()

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="text-white w-full p-4 sm:w-64">
      <h3 className="mb-4 text-xl">{t('filters')}</h3>
      <div className="mb-4">
        <label>
          <span className="mb-2 block">Status:</span>
          <select
            name="status"
            onChange={handleFilterChange}
            className="text-white w-full rounded-lg bg-gray-800 p-2"
          >
            <option value="">{t('all')}</option>
            <option value="OPEN">{t('open')}</option>
            <option value="CLOSED">{t('closed')}</option>
          </select>
        </label>
      </div>
    </div>
  )
}

const TaskPage = ({ issues }) => {
  const { t } = useTranslation()
  const [filters, setFilters] = useState({})

  const filteredIssues = issues.filter((issue) => {
    return !filters.status || issue.state === filters.status
  })

  return (
    <>
      <Head>
        <title> Tasks - WEB3DEV</title>
      </Head>
      <div className="flex flex-col sm:flex-row">
        <Sidebar filters={filters} setFilters={setFilters} t={t} />
        <div className="flex-1 p-4">
          {filteredIssues.length === 0 ? (
            <p>{t('no-issues-found')}.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredIssues.map((issue) => (
                <IssueCard key={issue.github_id} issue={issue} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const issues = await getAllTasks()
    return {
      props: { issues },
    }
  } catch (error) {
    console.error('Error fetching issues:', error)
    return {
      props: { issues: [] },
    }
  }
}

export default withProtected(TaskPage)
