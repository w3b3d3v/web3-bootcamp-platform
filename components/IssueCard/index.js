import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { getUserFromFirestore } from '../../lib/user'
import Modal from '../Modal/ModalTask'

const IssueCard = ({ issue }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [userProps, setUserProps] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showModalLevel, setShowModalLevel] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userData = await getUserFromFirestore(user)
        setUserProps(userData)
      }
    }

    fetchUserData()
  }, [user])

  const handleApply = () => {
    const issueLevel = issue.fields.find((field) => field.field === 'Context Depth')?.value
    if (user?.provider !== 'github.com') {
      setShowModal(true)
    } else if (userProps?.contextLevel !== issueLevel) {
        setShowModalLevel(true)
    } else {
        setMessage('Aplicação bem-sucedida!')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCloseModalLevel = () => {
    setShowModalLevel(false)
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg md:flex-row ${
        isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
      }`}
    >
      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#99e24d] md:h-full md:w-[80px] md:rounded-[20px]">
        <MdGroup size={70} color="white" />
      </div>
      <div className="mb-4 flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-[18px] text-[#99e24d] md:text-[24px]">{issue.title}</span>
          <button
            onClick={handleApply}
            className={`text-white mr-2 rounded md:mr-4 ${
              user?.provider === 'github.com' ? 'bg-[#99e24d]' : 'bg-red-500'
            } bg-opacity-30 px-2 py-1 text-[10px] hover:bg-[#649e26] focus:outline-none focus:ring-2 focus:ring-[#99e24d] md:text-sm`}
          >
            Apply
          </button>
          {message && <p>{message}</p>}
        </div>
        <div className="flex w-full">
          <p className="text-[12px] md:text-[16px]">{issue.body}</p>
        </div>
        <div className="flex flex-col gap-3 text-gray-400 md:flex-row">
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
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <h2>{t('Please log in with GitHub')}</h2>
          <p>{t('You need to be authenticated with GitHub to apply for this issue.')}</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                /* Função para redirecionar para o login do GitHub */
              }}
            >
              Login with GitHub
            </button>
          </div>
        </Modal>
      )}
      {showModalLevel && (
        <Modal onClose={handleCloseModalLevel}>
          <h3>{t('You do not have the Context level for this issue.')}</h3>
          <div className="flex gap-4"></div>
        </Modal>
      )}
    </div>
  )
}

export default IssueCard
