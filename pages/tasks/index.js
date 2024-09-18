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
import IssueCard from '../../components/Card/Issue'
import { useFilterState } from '../../components/Filter/utils'
import { getUserFromFirestore } from '../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/initFirebase'
import { sortFilter } from '../../components/SortBar/utils'

const TaskPage = ({ issues }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLightTheme = theme === 'light'
  const [searchQuery, setSearchQuery] = useState('')
  const [userAuth, setUserAuth] = useState(null)
  const [dataSortBar, setDataSortBar] = useState('ContextDepth')
  const sortedIssues = sortFilter(dataSortBar, filteredIssues)
  const filterSortbar = (data) => {
    setDataSortBar(data)
  }
  const {
    filters,
    selectedFilters,
    isOpen,
    toggleFilterDropdown,
    handleFilterSelection,
    clearAllFilters,
    filteredIssues,
    availableAmounts,
    getFilterComponentProps,
  } = useFilterState(issues)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUserAuth(userSession)
      } else {
        setUserAuth(null)
      }
    })

    return () => unsubscribe()
  }, [])

  if (userAuth === undefined) {
    return <p>Loading...</p>
  }


  return (
    <>
      <Head>
        <title>Tasks - WEB3DEV</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col xl:w-[80%]">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex">
            <div className="flex w-full flex-col items-start md:mx-4 lg:flex-row">
              <Filter
                filters={filters}
                selectedFilters={selectedFilters}
                isOpen={isOpen}
                toggleOpen={toggleFilterDropdown}
                handleFilterChange={handleFilterSelection}
                clearFilters={clearAllFilters}
                filteredAmounts={availableAmounts}
                getFilterProps={getFilterComponentProps}
              />
              <div className="flex-1 p-2 ">
                {sortedIssues.length === 0 ? (
                  <p>{t('no-issues-found')}.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex h-10 flex-row items-center justify-between">
                      <Sortbar filters={filters} sendFilterSortbar={filterSortbar} t={t} />
                      <label
                        className={`h-10 w-[80px] text-[10px] md:w-[100px] md:text-[16px] ${
                          isLightTheme ? 'text-black-400' : 'text-[#99e24d]'
                        }`}
                      >
                        {sortedIssues.length} {t('projects')}
                      </label>
                    </div>
                    <div
                      className={`flex flex-row gap-2 rounded-lg p-2 shadow-lg ${
                        isLightTheme ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
                      }`}
                    >
                      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-white-100 bg-opacity-25">
                        <AiOutlineLike size={30} color="#99e24d" />
                      </div>
                      <div className="flex w-full flex-col gap-0">
                        <div className="flex w-full items-center justify-between">
                          <span className="text-white text-[18px] md:text-[24px]">
                            {t('issue.goodFirst')}
                          </span>
                          <div className="flex w-[auto] items-center justify-center gap-1 rounded-[10px] bg-[#99e24d] bg-opacity-30 px-2 md:w-[auto] md:rounded-[10px]">
                            {userAuth?.contextLevel ? (
                              <>
                                <span>{t('issue.yourContextLevel')}:</span>
                                <p className="text-[12px] text-[#99e24d] md:text-[16px]">
                                  {userAuth.contextLevel}
                                </p>
                              </>
                            ) : (
                              <p>{t('issue.noContextLevel')}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex w-full">
                          <p className="text-[12px] md:text-[16px]">{t('issue.applyListIssue')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {sortedIssues.map((issue) => (
                        <IssueCard key={issue.github_id} issue={issue} t={t} userInfo={userAuth} />
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
