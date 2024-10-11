import React, { useEffect, useState, useMemo } from 'react'
import { Link } from '@nextui-org/react'
import { withProtected } from '../../hooks/route'
import { getAllTasks, getAllTasksProgress } from '../../lib/tasks'
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
import { toast } from 'react-toastify'
import Modal from '../../components/Modal/ModalTask'

const TaskPage = ({ initialIssues }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLightTheme = theme === 'light'
  const [searchQuery, setSearchQuery] = useState('')
  const [userAuth, setUserAuth] = useState(null)
  const [userProvider, setUserProvider] = useState(null)
  const [issues, setIssues] = useState(initialIssues)
  const [showAssigned, setShowAssigned] = useState(false)
  const [userScreenName, setUserScreenName] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        const userProvider = user?.providerData?.[0]?.providerId
        setUserProvider(userProvider)
        setUserAuth(userSession)
        setUserScreenName(user?.reloadUserInfo?.screenName)
      } else {
        setUserAuth(null)
        setUserProvider(null)
        setUserScreenName(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      if (showAssigned) {
        try {
          const assignedIssues = await getAllTasksProgress()
          setIssues(assignedIssues)
        } catch (error) {
          console.error('Error fetching assigned issues:', error)
          toast.error(t('messages.error-fetching-issues'))
        }
      } else {
        setIssues(initialIssues)
      }
    }

    fetchAssignedTasks()
  }, [showAssigned, initialIssues])

  const filteredIssues = useMemo(() => {
    if (!showAssigned) {
      return issues.filter((issue) => issue.status === 'Todo')
    }
    return issues.filter((issue) => issue.assignees.includes(userScreenName))
  }, [issues, showAssigned, userScreenName])

  const {
    filters,
    selectedFilters,
    isOpen,
    toggleFilterDropdown,
    handleFilterSelection,
    clearAllFilters,
    filteredIssues: filterStateIssues,
    availableAmounts,
    getFilterComponentProps,
  } = useFilterState(filteredIssues)

  const sortFields = ['contextDepth', 'Amount']
  const initialSortBy = 'contextDepth'

  const { sortedItems, sortBy, setSortBy, sortOptions } = useSortItems(
    filterStateIssues,
    sortFields,
    initialSortBy
  )

  const toggleShowAssigned = () => {
    setShowAssigned((prev) => !prev)
  }

  const showToastConectGit = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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
            <div className="flex w-full flex-col items-center md:mx-4 lg:flex-row lg:items-start">
              <div className="flex w-[80%] flex-col items-center lg:w-[25%]">
                <div className="my-3 flex w-[100%] justify-center">
                  {userProvider === 'github.com' ? (
                    <button
                      onClick={toggleShowAssigned}
                      className={`rounded-[8px] bg-opacity-30 py-2 px-1 text-xs lg:px-8 lg:text-sm ${
                        isLightTheme
                          ? 'bg-[#99e24d] bg-opacity-70 text-black-400 hover:bg-[#649e26]'
                          : 'bg-[#99e24d] text-white-400 hover:bg-[#649e26]'
                      }`}
                    >
                      {showAssigned ? t('issue.viewAllTasks') : t('issue.myTasks')}
                    </button>
                  ) : (
                    <div className="cursor-not-allowed opacity-50">
                      <button
                        onClick={showToastConectGit}
                        className={`rounded-[8px] bg-opacity-30 py-2 px-1 text-xs lg:px-8 lg:text-sm ${
                          isLightTheme
                            ? 'bg-[#99e24d] text-black-400'
                            : 'bg-[#99e24d] text-white-400'
                        }`}
                      >
                        {t('issue.viewMyTasks')}
                      </button>
                    </div>
                  )}
                </div>
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
                        className={`flex h-10 w-[80px] items-center justify-center text-[12px] md:w-[100px] md:text-[16px] ${
                          isLightTheme ? 'text-black-400' : 'text-[#99e24d]'
                        }`}
                      >
                        {sortedItems.length} {t('projects')}
                      </label>
                    </div>
                    {showAssigned && (
                      <div className="flex justify-center text-sm font-bold text-[#99e24d] md:text-2xl">
                        {t('issue.myTasks')}
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      {sortedItems.map((issue) => (
                        <IssueCard
                          key={issue.github_id}
                          issue={issue}
                          userInfo={userAuth}
                          userProvider={userProvider}
                          isAssignedView={showAssigned}
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
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>{t('messages.title-connect-git')}</h2>
          <p>{t('messages.modal-connect-git')}</p>
          <div className="flex gap-4">
            <button
              className="mt-4 rounded-[10px] bg-[#99e24d] bg-opacity-30 px-4 py-2 text-[22px] text-[#99e24d] hover:ring-2 hover:ring-[#99e24d] focus:ring-2 focus:ring-[#99e24d]"
              onClick={() => {}}
            >
              {t('buttons.git-connect')}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export async function getServerSideProps() {
  try {
    const initialIssues = await getAllTasks()
    return {
      props: { initialIssues },
    }
  } catch (error) {
    console.error('Error fetching issues:', error)
    return {
      props: { initialIssues: [] },
    }
  }
}

export default withProtected(TaskPage)
