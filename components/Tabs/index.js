import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { checkSections, colorTab } from './tabFunctions'
import { useTranslation } from "react-i18next"

export default function Tabs({ course, lessonsSubmitted, cohort }) {
  const { t } = useTranslation()

  const isCourse = lessonsSubmitted || cohort

  if (!isCourse) {
    const sectionAnalytics = course?.analytics
    return (
      <div className="flex flex-col rounded-lg">
        <div className="flex flex-row justify-center items-center">
        {sectionAnalytics?.photoUrls?.slice(0, 3).map((source, index) => (
          <img
            key={source}
            src={source}
            alt="User avatar"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginLeft: index !== 0 ? '-15px' : '0',
              position: 'relative',
              zIndex: sectionAnalytics?.photoUrls.length - index,
            }}
          />
        ))}
        </div>
        {sectionAnalytics?.students && (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {sectionAnalytics.students} entusiastas nesse grupo de estudos!
          </p>
        )}
      </div>
    )    
  }

  if (!course?.sections) return null
  const [activeTab, setActiveTab] = useState(Object.keys(course?.sections).sort())

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className="mt-6 mb-6 flex flex-col rounded-lg p-4 shadow-xl lg:mt-12">
      <div className="flex flex-row justify-between maxsm:flex-col maxsm:text-center">
        {Object.keys(course?.sections)
          .sort()
          .map((section) => {
            const sectionAnalytics = course.analytics?.find((item) => item.section === section)
            return (
              <div className="flex flex-col justify-between" key={section}>
                <a
                  href={`#${section}`}
                  onClick={() => toggle(section)}
                  className={`item b-3 flex-grow rounded px-4 py-2 font-bold shadow-lg hover:no-underline ${sectionAnalytics ? 'active' : ''}`}
                >
                  <p className="m-0 p-0">{section?.replace('Section_', 'Seção ')}
                  </p>
                </a>
                {sectionAnalytics && (
                  <div className="flex flex-col items-center">
                    <p className="m-0 mt-2 p-0" style={{ fontSize: '14px' }}>
                      {sectionAnalytics?.students} {t('sectionTabs.peopleBuilding')}!
                    </p>
                    <div className="ml-2 flex flex-row items-center">
                      {sectionAnalytics?.photoUrls.slice(0, 3).map((source, index) => (
                        <img
                          key={source}
                          src={source}
                          alt="User avatar"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            marginLeft: index !== 0 ? '-25px' : '15px',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            zIndex: sectionAnalytics?.photoUrls.length - index,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}