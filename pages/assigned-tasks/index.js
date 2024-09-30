import React, { useEffect, useState } from 'react'
import { Link } from '@nextui-org/react'
import { withProtected } from '../../hooks/route'
import { getAllTasks } from '../../lib/tasks'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import Sortbar from '../../components/SortBar'
import IssueCard from '../../components/Card/Issue'
import { useFilterState } from '../../components/Filter/utils'
import { getUserFromFirestore } from '../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/initFirebase'
import { useSortItems } from '../../hooks/useSortItems'

const AssignedTasksPage = ({ issues }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLightTheme = theme === 'light'
  const [searchQuery, setSearchQuery] = useState('')
  const [userAuth, setUserAuth] = useState(null)
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
  const initialSortBy = 'contextDepth' // Definimos o valor inicial aqui

  const { sortedItems, sortBy, setSortBy, sortOptions } = useSortItems(
    filteredIssues,
    sortFields,
    initialSortBy
  )

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
              <div className='flex flex-col w-[20%]'>
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
              <div className="flex-1 p-2 ">
                {sortedItems.length === 0 ? (
                  <p>{t('no-issues-found')}.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex h-10 flex-row items-center justify-between">
                      <Sortbar
                        sortOptions={sortOptions}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        t={t}
                      />
                      <label
                        className={`h-10 w-[80px] text-[10px] md:w-[100px] md:text-[16px] ${
                          isLightTheme ? 'text-black-400' : 'text-[#99e24d]'
                        }`}
                      >
                        {sortedItems.length} {t('projects')}
                      </label>
                    </div>
                    <div className="flex flex-col gap-4">
                      {sortedItems.map((issue) => (
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

export default withProtected(AssignedTasksPage)
