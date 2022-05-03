import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/initFirebase';

export default function Tabs({ course, isLessonPage, lessonsSubmitted }) {
  const getCourse = course;
  if(!getCourse?.sections) return null;
  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(
    Object.keys(getCourse?.sections).sort()
  );
  const toggle = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  };
  const checkSectionCompleted = (section) => {
    if(lessonsSubmitted){

      return lessonsSubmitted.map(item => item.section == section && item.completed == item.total).filter(Boolean)[0];
    }
  };
  const checkCurrentSection = (section) => {
    if(lessonsSubmitted){

      if(lessonsSubmitted.find(item => item.completed < item.total).section == section) return 'bg-violet-600';
    }
  };
  return (
    <div className="flex flex-col rounded dark:bg-black-200 p-4">
      <div className="flex flex-row justify-between">
        {Object.keys(getCourse?.sections).sort().map((section) => {
          return (
            <div className={'flex justify-between'} key={section}>
              {isLessonPage ?
                <div className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100  ${checkSectionCompleted(section) ? 'dark:bg-green-500 ' : checkCurrentSection(section)} `}
                >
                  <div className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${checkSectionCompleted(section) ? 'dark:bg-green-500 ' : checkCurrentSection(section)}`}>
                    <p className="m-0 p-0">
                      {section?.replace('Section_', 'Sessão ')}
                    </p>
                  </div>
                </div>
                :
                <a href={`#${!isLessonPage ? section : ''}`} onClick={() => toggle(section)} className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100 ${checkSectionCompleted(section) ? 'dark:bg-green-500 ' : checkCurrentSection(section)} `}
                >
                  <div className={`item flex-grow px-4 font-bold py-2 rounded shadow-lg ${checkSectionCompleted(section) ? 'dark:bg-green-500 ' : checkCurrentSection(section)}`}>
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
