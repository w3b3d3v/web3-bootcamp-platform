import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { checkSections, colorTab } from './tabFunctions'
import { getCourseAnalytics } from '../../lib/courses'

export default function Tabs({ course, isLessonPage, lessonsSubmitted, cohort }) {
  const getCourse = course
  const { user } = useAuth()
  if (!getCourse?.sections) return null
  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(Object.keys(getCourse?.sections).sort())
  const [buildAnalytics, setBuildAnalytics] = useState();

  useEffect(async () => {
    setBuildAnalytics(await getCourseAnalytics(course.id))
  }, [course])

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className="flex flex-col rounded-lg p-4 shadow-xl lg:mt-12 mt-6 mb-6">
      <div className="flex flex-row justify-between maxsm:flex-col maxsm:text-center">
        {Object.keys(getCourse?.sections)
          .sort()
          .map((section) => {
            const sectionAnalytics = buildAnalytics?.find((item) => item.section === section);
  
            return (
              <div className="flex justify-between flex-col" key={section}>
                {isLessonPage ? (
                  <div
                    className={`item flex-grow rounded px-4 py-2 font-bold shadow-lg hover:no-underline mb-3 ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).currentSection
                    )}`}
                  >
                    <p className="m-0 p-0 text-center center">{section?.replace('Section_', 'Seção ')}</p>
                  </div>
                ) : (
                  <a
                    href={`#${!isLessonPage ? section : ''}`}
                    onClick={() => toggle(section)}
                    className={`item flex-grow rounded px-4 py-2 font-bold shadow-lg hover:no-underline b-3 ${colorTab(
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).isSectionCompleted,
                      checkSections(course, lessonsSubmitted, section, user?.uid, cohort).currentSection
                    )}`}
                  >
                    <p className="m-0 p-0">{section?.replace('Section_', 'Seção ')}</p>
                  </a>
                )}
                {sectionAnalytics && (
                  <div className="flex flex-col items-center">
                  <p className="m-0 p-0 mt-2">{sectionAnalytics?.students} pessoas construindo!</p>
                  <div className="flex flex-row ml-2 items-center">
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
  );  
}  