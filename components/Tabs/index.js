import React, { useState, useEffect } from 'react';

export default function Tabs({ course, isLessonPage }) {
  const getCourse = course;
  if(!getCourse?.sections) return null;

  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(
    Object.keys(getCourse?.sections).sort()
    //Object.values(getCourse?.sections).sort().map(item => window.location.href.includes(item.file) ? true : false)
  );

  const toggle = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {Object.keys(getCourse?.sections).sort().map((section) => {
          return (
            <div key={section}>
              {/*{console.log(Object.values(getCourse?.sections).sort().map(item => item).flat().map(value => window.location.href.includes(value.file)) )}*/}
              {isLessonPage ?
                <div className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100 ${activeTab === section ? 'bg-gray-200   dark:bg-indigo-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'}`}
                >
                  <div className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'
                    }`}>
                    <p className="m-0 p-0">
                      {section?.replace('Section_', 'Sessão ')}
                    </p>
                  </div>
                </div>
                :
                <a href={`#${!isLessonPage ? section : ''}`} onClick={() => toggle(section)} className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100 ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'}`}
                >
                  <div className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${activeTab === section ? 'bg-gray-200   dark:bg-black-100 dark:text-primary-100' : 'bg-white-100 dark:bg-black-200'
                    }`}>
                    <p className="m-0 p-0">
                      {section?.replace('Section_', 'Sessão ')}
                    </p>
                  </div>
                </a>
                }
            </div>
          );
        })}
      </div>
    </div>
  );
};
