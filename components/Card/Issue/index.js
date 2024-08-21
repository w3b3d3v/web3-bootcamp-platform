import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

const IssueCard = ({ issue, user }) => {
  // const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'

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
    user?.contextLevel,
    issue.fields.find((item) => item.field === 'Context Depth')?.value
  )

  return (
    <Tooltip
      followCursor
      disabled={hasPermission}
      title="You do not have sufficient context level for this task"
    >
      <div
        data-testid="cardIssue"
        className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg md:flex-row
          ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'}
          ${hasPermission ? 'order-0' : 'order-5'}
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
              disabled={!hasPermission}
              style={{ cursor: hasPermission ? 'pointer' : 'not-allowed' }}
              className={`text-white mr-2 rounded bg-[#99e24d] bg-opacity-30 px-2 py-1 text-[10px] 
                ${hasPermission ? 'hover:bg-[#649e26]' : 'cursor-not-allowed bg-opacity-25'}
                focus:outline-none focus:ring-2 focus:ring-[#99e24d] md:mr-4 md:text-sm`}
            >
              Apply
            </button>
          </div>
          <div className={`flex w-full ${hasPermission ? '' : 'opacity-50'}`}>
            <p className="text-[12px] md:text-[16px]">{issue.body}</p>
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
        </div>
      </div>
    </Tooltip>
  )
}

export default IssueCard
