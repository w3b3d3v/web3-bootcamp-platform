import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { MdGroup } from 'react-icons/md'

const IssueCard = ({ issue }) => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const isLight = theme === 'light'

    return (
        <div
            className={`flex md:flex-row flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg ${isLight ? 'bg-gray-200 bg-opacity-75' : 'bg-black-200 bg-opacity-75'
                }`}
        >
            <div className="flex h-[40px] md:h-full w-[40px] md:w-[80px] items-center justify-center md:rounded-[20px] rounded-[10px] bg-[#99e24d]">
                <MdGroup size={70} color="white" />
            </div>
            <div className="mb-4 flex w-full flex-col gap-3">
                <div className="flex w-full items-center justify-between">
                    <span className="md:text-[24px] text-[18px] text-[#99e24d]">{issue.title}</span>
                    <button className="text-white mr-2 md:mr-4 rounded bg-[#99e24d] bg-opacity-30 px-2 py-1 md:text-sm text-[10px] hover:bg-[#649e26] focus:outline-none focus:ring-2 focus:ring-[#99e24d]">
                        Apply
                    </button>
                </div>
                <div className="flex w-full">
                    <p className="text-[12px] md:text-[16px]">
                        {issue.body}
                    </p>
                </div>
                <div className="flex md:flex-row flex-col gap-3 text-gray-400">
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
    )
}

export default IssueCard
