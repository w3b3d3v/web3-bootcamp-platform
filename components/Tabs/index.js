import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { checkSections, colorTab } from './tabFunctions'
import { useTranslation } from "react-i18next"

export default function Tabs({ course, isLessonPage, lessonsSubmitted, cohort }) {
  if (!isLessonPage) {
    const sectionAnalytics = course.analytics?.[0];

    return (
      <div className="flex flex-col rounded-lg">
        <div className="flex flex-row justify-center items-center">
          {sectionAnalytics?.photoUrls.slice(0, 3).map((source, index) => (
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
        {sectionAnalytics && (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {sectionAnalytics.students} entusiastas nesse grupo de estudos!
          </p>
        )}
      </div>
    );    
  }

  const getCourse = course
  const { user } = useAuth()
  if (!getCourse?.sections) return null
  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(Object.keys(getCourse?.sections).sort())
  const { t } = useTranslation();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className="mt-6 mb-6 flex flex-col rounded-lg p-4 shadow-xl lg:mt-12">
      <div className="flex flex-row justify-between maxsm:flex-col maxsm:text-center">
        {Object.keys(getCourse?.sections)
          .sort()
          .map((section) => {
            const sectionNumber = section.replace('Section_', '');
            let sectionAnalytics = course.analytics?.find((item) => item.section === section)
            return (
              <div className="flex flex-col justify-between" key={section}>
                {isLessonPage ? (
                  <div
                    className={`item mb-3 flex-grow rounded px-4 py-2 font-bold shadow-lg hover:no-underline ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .currentSection
                    )}`}
                  >
                    <p className="center m-0 p-0 text-center">
                      {t('section') + ' ' + sectionNumber}
                    </p>
                  </div>
                ) : (
                  <a
                    href={`#${!isLessonPage ? section : ''}`}
                    onClick={() => toggle(section)}
                    className={`item b-3 flex-grow rounded px-4 py-2 font-bold shadow-lg hover:no-underline ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort)
                        .currentSection
                    )}`}
                  >
                    <p className="m-0 p-0">{t('section') + ' ' + sectionNumber}</p>
                  </a>
                )}
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