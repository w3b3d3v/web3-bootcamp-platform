import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
const Tabs = (course) => {
  const getCourse = course?.course
  if (!getCourse?.sections) return null

  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(
    Object.keys(getCourse?.sections)[0]
  )

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-8">
        {Object.keys(getCourse?.sections).sort().map((section) => {
          return (
            <div key={section} onClick={() => toggle(section)} className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'
              }`}>
              <p className="m-0 p-0">
                <a href={`#${section}`} className=' text-black-100 dark:text-white-100'>
                  {section?.replace('Section_', 'Sessão ')}
                </a>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Tabs
