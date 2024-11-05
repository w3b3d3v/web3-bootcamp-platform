import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { contextOrder } from '../../../lib/utils/constants'
import Modal from '../../../components/Modal/ModalTask'

const IssueCard = ({ issue, userInfo }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [isCollapsed, setIsCollapsed] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  function canTakeTask(userContext, taskContext) {
    const userContextValue = contextOrder[userContext]
    const taskContextValue = contextOrder[taskContext]

    return userContextValue >= taskContextValue
  }

  const hasPermission = true // TODO: this context level validation is being postponed temporarily
  // const hasPermission = canTakeTask(
  //   userInfo?.contextLevel,
  //   issue.fields.find((item) => item.field === 'Context Depth')?.value
  // )

  const handleApply = (issue_url) => {
    window.open(issue_url, '_blank')
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const buttonClasses = `search-bar text-white py-2 px-4 text-left ${
    isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200'
  }`

  const applyButtonClasses = `${buttonClasses} ${
    isLight ? 'bg-[#99e24d] bg-opacity-75' : 'bg-[#649e26]'
  } ${hasPermission ? 'hover:bg-[#649e26]' : 'cursor-not-allowed opacity-50'}`

  return (
    <Tooltip
      followCursor
      key={issue.id}
      disabled={hasPermission}
      title={t('issue.contextLevelTask')}
      className={`${hasPermission ? 'order-0' : 'order-5'}`}
    >
      <div
        data-testid="cardIssue"
        className={`flex flex-col justify-center gap-2 rounded-lg p-4 shadow-lg
          ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'}
        `}
      >
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <span
              className={`text-[18px] text-[#99e24d] md:text-[24px]
                ${hasPermission ? '' : 'opacity-50'}
              `}
            >
              {issue.title}
            </span>
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
              <strong>{t('issue.createdAt')}:</strong>{' '}
              {new Date(issue.createdAt).toLocaleDateString()}
            </p>
            {issue.fields.map((field, index) => (
              <p key={index} className="text-[16px]">
                <strong>{field.field}:</strong> {field.value}
              </p>
            ))}
          </div>
          {isCollapsed && (
            <div className={`flex w-full justify-end gap-2 ${hasPermission ? '' : 'opacity-50'}`}>
              <button
                className={buttonClasses}
                onClick={toggleCollapse}
                style={{ width: 'fit-content' }}
              >
                {t('issue.showDetails')}
              </button>
              <button
                title={`${hasPermission ? t('issue.applyForTask') : ''}`}
                //onClick={() => handleApply(issue.url)}
                onClick={openModal}
                disabled={!hasPermission}
                className={applyButtonClasses}
                style={{ width: 'fit-content' }}
              >
                {t('issue.apply')}
              </button>
            </div>
          )}
          {!isCollapsed && (
            <>
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
              <div
                className={`mt-4 flex w-full justify-end gap-2 ${
                  hasPermission ? '' : 'opacity-50'
                }`}
              >
                <button
                  className={buttonClasses}
                  onClick={toggleCollapse}
                  style={{ width: 'fit-content' }}
                >
                  {t('issue.hideDetails')}
                </button>
                <button
                  title={`${hasPermission ? t('issue.applyForTask') : ''}`}
                  onClick={() => handleApply(issue.url)}
                  disabled={!hasPermission}
                  className={applyButtonClasses}
                  style={{ width: 'fit-content' }}
                >
                  {t('issue.apply')}
                </button>
              </div>
            </>
          )}
        </div>
        {isModalOpen && (
        <Modal onClose={closeModal}>
          <p className='font-semibold md:text-lg font- mx-1 mb-2 text-center leading-none'><span className='text-2xl'>🚨</span>  {t('messages.title-access-git')} </p>
            <p className='mb-2'> {t('messages.example-msg')} <span className='text-2xl'>👇</span></p>
            
            <img src="/assets/img/msg-model-task.png" />
            <div className="mb-2">
              <button
                className={`mt-4 rounded-[20px] bg-[#96E150] px-4 py-2 md:text-[22px]  hover:ring-2 hover:ring-[#96E150] focus:ring-2
                  ${theme === 'light' ? 'bg-opacity-100 text-black-400 hover:ring-[#1E96FF]' : 'bg-opacity-30 text-[#96E150]'} `}
                onClick={() => handleApply(issue.url)}
              >
                {t('issue.apply')}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </Tooltip>
  )
}

export default IssueCard
