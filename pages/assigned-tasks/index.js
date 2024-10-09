import React, { useEffect, useState } from 'react'
import { withProtected } from '../../hooks/route'
import { getAllTasksProgress } from '../../lib/tasks'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import Sortbar from '../../components/SortBar'
import IssueCard from '../../components/Card/Issue'
import { useFilterState } from '../../components/Filter/utils'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/initFirebase'
import { useSortItems } from '../../hooks/useSortItems'

const AssignedTasksPage = ({ issues }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLightTheme = theme === 'light'
  const [searchQuery, setSearchQuery] = useState('')
  const [userScreenName, setUserScreenName] = useState(null)
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

  const sortFields = ['contextDepth', 'Amount']
  const initialSortBy = 'contextDepth'

  const { sortedItems, sortBy, setSortBy, sortOptions } = useSortItems(
    filteredIssues,
    sortFields,
    initialSortBy
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const screenName = user?.reloadUserInfo?.screenName
        setUserScreenName(screenName)
      } else {
        setUserScreenName(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const userAssignedIssues = sortedItems.filter((issue) => issue.assignees.includes(userScreenName))

  if (userScreenName === null) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>My Tasks - WEB3DEV</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col xl:w-[80%]">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex">
            <div className="flex w-full flex-col items-center md:mx-4 lg:flex-row lg:items-start">
              <div className="flex w-[80%] flex-col items-center lg:w-[25%]">
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
              </div>
              <div className="w-full flex-1 p-2">
                {userAssignedIssues.length === 0 ? (
                  <p>{t('no-signed-issue')}.</p>
                ) : (
                  <div className="flex w-[100%] flex-col gap-2">
                    <div className="flex h-10 flex-row items-center justify-between">
                      <Sortbar
                        sortOptions={sortOptions}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        t={t}
                      />
                      <label
                        className={`flex h-10 w-[80px] items-center justify-center text-[12px] md:w-[100px] md:text-[16px] ${
                          isLightTheme ? 'text-black-400' : 'text-[#99e24d]'
                        }`}
                      >
                        {userAssignedIssues.length} {t('projects')}
                      </label>
                    </div>
                    <div className='flex justify-center font-bold text-sm md:text-2xl text-[#99e24d]'>
                    {t('issue.titleMyTasksInProgress')}
                    </div>
                    <div className="flex flex-col gap-4">
                      {userAssignedIssues.map((issue) => (
                        <IssueCard
                          key={issue.github_id}
                          issue={issue}
                          userInfo={userScreenName}
                          isAssignedView={true}
                        />
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
    const issues = await getAllTasksProgress()
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

export default withProtected(AssignedTasksPage)
