import React, { useEffect, useState } from 'react'
import { withProtected } from '../../hooks/route'
import { getAllTasks } from '../../lib/tasks'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { AiOutlineLike } from 'react-icons/ai'
import Head from 'next/head'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import Sortbar from '../../components/SortBar'
import IssueCard from '../../components/IssueCard'

const TaskPage = ({ issues }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const uniqueFields = {};

  issues.forEach(issue => {
    issue.fields.forEach(({ field, value }) => {
      if (!uniqueFields[field]) {
        uniqueFields[field] = new Set();
      }
      uniqueFields[field].add(value);
    });
  });

  const filterOptions = Object.fromEntries(
    Object.entries(uniqueFields).map(([field, values]) => [field, Array.from(values)])
  );

  const filteredIssues = issues.filter((issue) => {
    return Object.keys(filters).every(filterKey => {
      if (!filters[filterKey]) return true;
      return issue.fields.some(field => field.field === filterKey && field.value === filters[filterKey]);
    });
  });

  const [issueCount, setIssueCount] = useState(filteredIssues.length)

  useEffect(() => {
    setIssueCount(filteredIssues.length)
  }, [filteredIssues])

  return (
    <>
      <Head>
        <title>Tasks - WEB3DEV</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="flex xl:w-[80%] w-full flex-col">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex">
            <div className="flex w-full flex-col items-start lg:flex-row md:mx-4">
              <Filter filters={filterOptions} selectedFilters={filters} setFilters={setFilters} issues={issues} />
              <div className="flex-1 p-2 ">
                {filteredIssues.length === 0 ? (
                  <p>{t('no-issues-found')}.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex h-10 flex-row items-center justify-between">
                        <Sortbar filters={filters} setFilters={setFilters} t={t} />
                        <label className={`h-10 w-[80px] md:w-[100px] md:text-[16px] text-[10px] ${isLight ? 'text-black-400' : 'text-[#99e24d]'}`}>{filteredIssues.length} PROJECTS</label>
                    </div>
                    <div
                        className={`flex flex-row gap-2 rounded-lg p-2 shadow-lg ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
                          }`}
                    >
                      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-white-100 bg-opacity-25">
                        <AiOutlineLike size={30} color="#99e24d" />
                      </div>
                      <div className="flex w-full flex-col gap-0">
                        <div className="flex w-full items-center justify-between">
                          <span className="text-white md:text-[24px] text-[18px]">Good first issues</span>
                          <div className="flex md:w-[30px] w-[20px] items-center justify-center md:rounded-[20px] rounded-[10px] bg-[#99e24d] bg-opacity-30">
                            <p className="text-[#99e24d] text-[12px] md:text-[16px]">1</p>
                          </div>
                        </div>
                        <div className="flex w-full">
                          <p className="md:text-[16px] text-[12px]">
                            Apply to a list of curated issues well suited for those new to the
                            project to kickstart your journey.
                          </p>
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