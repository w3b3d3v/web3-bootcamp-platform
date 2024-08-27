import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { getUserFromFirestore } from '../../../lib/user'
import Modal from '../../Modal/ModalTask'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

const IssueCard = ({ issue, userInfo }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const { user, loginGithub } = useAuth()
  const [message, setMessage] = useState('')
  const [userProps, setUserProps] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await getUserFromFirestore(user)
          if (userData) {
            setUserProps(userData)
            setError(null)
          } else {
            setError('Usuário não encontrado.')
          }
        } catch (err) {
          setError('Erro ao buscar dados do usuário.')
        } finally {
          setLoading(false)
          setInitialLoading(false)
        }
      }
    }
    fetchUserData()
  }, [user])

  function canTakeTask(userContext, taskContext) {
    const contextOrder = {
      Beginner: 0,
      Novice: 1,
      Intermediate: 2,
      Professional: 3,
      Expert: 4,
    }

    const userContextValue = contextOrder[userContext]
    const taskContextValue = contextOrder[taskContext]

    return userContextValue >= taskContextValue
  }

  const hasPermission = canTakeTask(
    userInfo?.contextLevel,
    issue.fields.find((item) => item.field === 'Context Depth')?.value
  )

  const handleApply = () => {
    if (user?.provider !== 'github.com') {
      setShowModal(true)
    } else {
      toast.success('Issue successfully applied')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleLoginGithub = () => {
    setShowModal(false)
    loginGithub()
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => router.back()}>Voltar</button>
      </div>
    )
  }

  return (
    <Tooltip
      followCursor
      disabled={hasPermission}
      title="You do not have sufficient context level for this task"
      className={`${hasPermission ? 'order-0' : 'order-5'}`}
    >
      <div
        data-testid="cardIssue"
        className={`flex flex-col justify-center gap-2 rounded-lg p-4 shadow-lg md:flex-row
          ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'}
        `}
      >
        <div
          className={`flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#99e24d] md:h-full md:w-[80px] md:rounded-[20px]
            ${hasPermission ? '' : 'opacity-50'}
          `}
        >
          <MdGroup size={70} color="white" />
        </div>
        <div className="mb-4 flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <span
              className={`text-[18px] text-[#99e24d] md:text-[24px]
                ${hasPermission ? '' : 'opacity-50'}
              `}
            >
              {issue.title}
            </span>
            <button
              title={`${hasPermission ? 'Apply for task' : ''}`}
              onClick={handleApply}
              disabled={!hasPermission}
              style={{ cursor: hasPermission ? 'pointer' : 'not-allowed' }}
              className={`text-white mr-2 rounded bg-[#99e24d] bg-opacity-30 px-2 py-1 text-[10px] 
                ${hasPermission ? 'hover:bg-[#649e26]' : 'cursor-not-allowed bg-opacity-25'}
                focus:outline-none focus:ring-2 focus:ring-[#99e24d] md:mr-4 md:text-sm`}
            >
              Apply
            </button>
          </div>
          <div
            className={`flex flex-col gap-3 text-gray-400 md:flex-row
              ${hasPermission ? '' : 'opacity-50'}
            `}
          >
            <p className="text-[16px]">
              <strong>Board:</strong> {issue.project_name}
            </p>
            <p className="text-[16px]">
              <strong>Created At:</strong> {new Date(issue.createdAt).toLocaleDateString()}
            </p>
            {issue.fields.map((field, index) => (
              <p key={index} className="text-[16px]">
                <strong>{field.field}:</strong> {field.value}
              </p>
            ))}
          </div>
          <section className="bg-[#3d5527]">
            <div className={`flex w-full ${hasPermission ? '' : 'opacity-50'}`}>
              <button
                className="tap-highlight-transparent flex h-full w-full items-center justify-start gap-3 bg-[#3d5527] py-4 !px-4 outline-none transition-opacity"
                onClick={toggleCollapse}
              >
                {isCollapsed ? 'Show Details' : 'Hide Details'}
              </button>
            </div>
            {!isCollapsed && (
              <div
                style={{ margin: '0 1rem' }}
                className={`flex w-full ${hasPermission ? '' : 'opacity-50'}`}
              >
                <ReactMarkdown
                  className="d-column w-[95%]"
                  rehypePlugins={[rehypeRaw, rehypePrism, remarkGfm]}
                  children={issue.body}
                />
              </div>
            )}
          </section>
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>{t('Please log in with GitHub')}</h2>
          <p className="text-[22px]">
            {t('You need to be authenticated with GitHub to apply for this issue.')}
          </p>
          <div className="flex gap-4">
            <button
              className="mt-4 rounded-[10px] bg-[#99e24d] bg-opacity-30 px-4 py-2 text-[22px] text-[#99e24d] hover:ring-2 hover:ring-[#99e24d] focus:ring-2 focus:ring-[#99e24d]"
              onClick={handleLoginGithub}
            >
              Login with GitHub
            </button>
          </div>
        </Modal>
      )}
    </Tooltip>
  )
}

export default IssueCard
