import React, { useState } from 'react'
const Tabs = (course) => {
  const getCourse = course?.course
  if (!getCourse?.sections) return null

  const sections = Object.keys(getCourse?.sections).map((section) => {
    return {
      section,
      lessons: getCourse?.sections[section],
    }
  })

  const [activeTab, setActiveTab] = useState(sections[0].section)

  const handleClick = (section) => {
    setActiveTab(section)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-8">
        {sections?.map((section) => {
          return (
            <ul
              key={section?.section}
              className={`item flex-grow ${
                activeTab === section.section
                  ? 'mr-12 rounded-t border-primary-300 pt-3 text-sm text-primary-300'
                  : 'mr-12 flex cursor-pointer items-center py-3 text-sm text-gray-600 hover:text-primary-300'
              }`}
              onClick={() => handleClick(section?.section)}
            >
              <li className="font-bold">{section?.section}</li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}
export default Tabs
