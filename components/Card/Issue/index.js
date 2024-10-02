import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'
import React, { useState } from 'react'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { contextOrder } from '../../../lib/utils/constants'

const IssueCard = ({ issue, userInfo, isAssignedView }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [isCollapsed, setIsCollapsed] = useState(true)

  function canTakeTask(userContext, taskContext) {
    const userContextValue = contextOrder[userContext]
    const taskContextValue = contextOrder[taskContext]

    return userContextValue >= taskContextValue
  }

  const hasPermission = isAssignedView || canTakeTask(
    userInfo?.contextLevel,
    issue.fields.find((item) => item.field === 'Context Depth')?.value
  )

  const handleApply = () => {
    alert('Apply')
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

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
              hidden={isAssignedView}
              title={`${hasPermission ? t('issue.applyForTask') : ''}`}
              onClick={handleApply}
              disabled={!hasPermission}
              style={{ cursor: hasPermission ? 'pointer' : 'not-allowed' }}
              className={`text-white mr-2 rounded bg-[#99e24d] bg-opacity-30 px-2 py-1 text-[10px] 
                ${hasPermission ? 'hover:bg-[#649e26]' : 'cursor-not-allowed bg-opacity-25'}
                focus:outline-none focus:ring-2 focus:ring-[#99e24d] md:mr-4 md:text-sm`}
            >
              {t('issue.apply')}
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
              <strong>{t('issue.createdAt')}:</strong> {new Date(issue.createdAt).toLocaleDateString()}
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
                {isCollapsed ? t('issue.showDetails') : t('issue.hideDetails')}
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
    </Tooltip>
  )
}

export default IssueCard
