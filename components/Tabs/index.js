import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { checkSections, colorTab } from './tabFunctions'

export default function Tabs({ course, isLessonPage, lessonsSubmitted, cohort }) {
  const getCourse = course
  const { user } = useAuth()
  if (!getCourse?.sections) return null
  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(Object.keys(getCourse?.sections).sort())
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className="flex flex-col rounded-lg bg-white-100 p-4 shadow-xl dark:bg-black-200 lg:mt-12 mt-6">
      <div className="flex flex-row justify-between maxsm:flex-col maxsm:text-center">
        {Object.keys(getCourse?.sections)
          .sort()
          .map((section) => {
            return (
              <div className={'flex justify-between'} key={section}>
                {isLessonPage ? (
                  <div
                    className={`item flex-grow rounded px-4 py-2 font-bold text-black-100 shadow-lg hover:no-underline dark:text-white-100 mb-3 ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).currentSection
                    )}  `}
                  >
                    <p className="m-0 p-0">{section?.replace('Section_', 'Seção ')}</p>
                  </div>
                ) : (
                  <a
                    href={`#${!isLessonPage ? section : ''}`}
                    onClick={() => toggle(section)}
                    className={`item flex-grow rounded px-4 py-2 font-bold text-black-100 shadow-lg hover:no-underline dark:text-white-100 mb-3 ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).currentSection
                    )}  `}
                  >
                    <p className="m-0 p-0">{section?.replace('Section_', 'Seção ')}</p>
                  </a>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
