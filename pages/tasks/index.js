import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import { getAllTasks } from '../../lib/tasks'
import { useTranslation } from 'react-i18next'
import SearchBar from '../../components/SearchBar'
import { MdGroup } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"
import { Button, Image, Text } from '@nextui-org/react'


const IssueCard = ({ issue }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-row gap-2 rounded-lg bg-black-200 p-4 shadow-lg">
      <div className='flex items-center justify-center rounded-[20px] bg-cyan-500 w-[100px] h-full'>
        <MdGroup size={80} color="white" />
      </div>
      <div className="flex flex-col mb-4 w-full gap-3">
        <div className='flex w-full justify-between items-center'>
          <span className="text-[24px] text-white">{issue.title}</span>
          <button className="mr-4 px-2 py-1 text-sm text-white bg-cyan-500 rounded hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            Apply
          </button>
        </div>
        <div className='flex w-full'>
          <p className='text-[16px]'>
          Our practical learning platform, located at build.w3d.community, offers courses focused on blockchain and web3 technologies.
          </p>
        </div>
        <div className="flex flex-row gap-3 text-sm text-gray-400">
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

const Sortbar = ({ filters, setFilters }) => {
  const { t } = useTranslation()

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="text-white w-full sm:w-64 h-10">
      
      <div className=" flex flex-row gap-1 items-center rounded-lg w-[200px] bg-black-200 justify-center">
      <span className=" text-[14px]">{t('Sort by')}</span>
        <label>
          <select
            name="status"
            onChange={handleFilterChange}
            className="text-white w-full text-cyan-500 border-none bg-none text-[14px]"
          >
            <option value="">{t('context depth')}</option>
            <option value="">{t('reward')}</option>
          </select>
        </label>
      </div>
    </div>
  )
}

const TaskPage = ({ issues }) => {
  const { t } = useTranslation()
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const filteredIssues = issues.filter((issue) => {
    return !filters.status || issue.state === filters.status
  })

  return (
    <>
      <Head>
        <title> Tasks - WEB3DEV</title>
      </Head>
      <div className='flex flex-col'>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className='flex'>
          <div className="flex flex-col sm:flex-row w-[100%]">
            <Sidebar filters={filters} setFilters={setFilters} t={t} />
            <div className="flex-1 p-4 ">
              {filteredIssues.length === 0 ? (
                <p>{t('no-issues-found')}.</p>
              ) : (
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row h-10 justify-between items-center'>
                    <Sortbar filters={filters} setFilters={setFilters} t={t} />
                    <label className='h-10 text-[16px]'>
                     247 PROJECT
                   </label>
                  </div>
                  <div className="flex flex-row gap-2 rounded-lg bg-black-200 p-4 shadow-lg">
                    <div className='flex items-center justify-center rounded-[10px] w-[50px] h-[50px] bg-white-100 bg-opacity-25'>
                      <AiOutlineLike  size={30} color="white" />
                    </div>
                    <div className="flex flex-col w-full gap-0">
                      <div className='flex w-full justify-between items-center'>
                      <span className="text-[24px] text-white">Good first issues</span>
                      <div className='flex items-center justify-center rounded-[20px] bg-cyan-500 bg-opacity-30 w-[30px]'>
                        <p className='text-cyan-500'>
                        1
                        </p>
                      </div>
                    </div>
                    <div className='flex w-full'>
                      <p className='text-[16px]'>
                        Apply to a list of curated issues well suited for those new to the project to kickstart your journey.          </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {filteredIssues.map((issue) => (
                    <IssueCard key={issue.github_id} issue={issue} t={t} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
