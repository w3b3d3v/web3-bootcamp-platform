import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { getUserFromFirestore } from '../../lib/user'
import Modal from '../Modal/ModalTask'
import { useRouter } from 'next/router'

const IssueCard = ({ issue, userInfo }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [userProps, setUserProps] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const {loginGithub } = useAuth() 
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
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

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => router.back()}>Voltar</button>
      </div>
    )
  }

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
    const issueLevel = issue.fields.find((field) => field.field === 'Context Depth')?.value
    if (user?.provider !== 'github.com') {
      setShowModal(true)
    } else {
        setMessage('Aplicação bem-sucedida!')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleLoginGithub = () => {
    setShowModal(false)
    loginGithub()
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg md:flex-row ring-2 ring-white-400
        ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'}
         ${hasPermission ? 'order-0' : 'order-5'}
      `}
    >
      <div
        className={`flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#99e24d] md:h-full md:w-[80px] md:rounded-[20px]
          ${hasPermission ? '' : 'opacity-50'}
        `}
      >        <MdGroup size={70} color="white" />
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
          <abbr title={!hasPermission ? "You do not have sufficient context level for this task" : ""}>
            <button
              onClick={handleApply}
              disabled={!hasPermission}
              style={{ cursor: hasPermission ? 'pointer' : 'not-allowed' }}
              className={`text-white mr-2 rounded bg-[#99e24d] bg-opacity-30 px-2 py-1 text-[10px] 
              ${hasPermission ? 'hover:bg-[#649e26]' : 'cursor-not-allowed bg-opacity-25'}
              ${user?.provider === 'github.com' ? 'bg-[#99e24d]' : 'bg-red-500 hover:bg-red-800 focus:ring-red-800'}
              focus:outline-none focus:ring-2 focus:ring-[#99e24d] md:mr-4 md:text-sm`}
            >
              Apply
            </button>
            {message && <p>{message}</p>}
          </abbr>
        </div>
        <div className={`flex w-full ${hasPermission ? '' : 'opacity-50'}`}>
          <p className="text-[12px] md:text-[16px]">{issue.body}</p>
        </div>
        <div
          className={`flex flex-col gap-3 text-gray-400 md:flex-row
            ${hasPermission ? '' : 'opacity-50'}
          `}
        >          <p className="text-[16px]">
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
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>{t('Please log in with GitHub')}</h2>
          <p>{t('You need to be authenticated with GitHub to apply for this issue.')}</p>
          <div className="flex gap-4">
            <button
              onClick={handleLoginGithub}
            >
              Login with GitHub
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default IssueCard
