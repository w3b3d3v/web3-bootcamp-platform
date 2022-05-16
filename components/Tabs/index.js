import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Tabs({ course, isLessonPage, lessonsSubmitted, cohort }) {
  const getCourse = course;
  const { user } = useAuth()
  if(!getCourse?.sections) return null;
  // list all the section as tabs
  const [activeTab, setActiveTab] = useState(
    Object.keys(getCourse?.sections).sort()
  );
  const toggle = (tab) => {
    if(activeTab !== tab) setActiveTab(tab);
  };
  const checkLessons = () => {
    const list = [];
    const courseSectionsLength = {};
    Object.keys(course?.sections).sort().map((section) => {
      course?.sections[section].map((lesson) => {
        courseSectionsLength[section] = courseSectionsLength[section] ? courseSectionsLength[section] + 1 : 1;
        list.push({ section, ...lesson }
        );
      });
    });
    const userLessons = lessonsSubmitted.filter(item => item.user == user.uid);
    const userLessonsSubmittedInCurrentCohort = userLessons.filter(item => item.cohort === cohort?.id);
    const sectionsCompleted = userLessonsSubmittedInCurrentCohort.map(lesson => {
      return list.map(item => (item.section == lesson.section && item.file == lesson.lesson && item));
    }).map(item => item.filter(Boolean)).flat();
    const sectionsCompletedInCurrentCohort = sectionsCompleted.map(item => item.section).reduce(function(obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    const sections = Object.keys(courseSectionsLength);
    const completed = sections.map(section => {
      return {
        section,
        completed: sectionsCompletedInCurrentCohort[section] ? sectionsCompletedInCurrentCohort[section] : 0,
        total: courseSectionsLength[section]
      };
    });
    return completed;
  };
  const checkSectionCompleted = (section) => {
    if(checkLessons() && section) {
      return checkLessons().map(item => item?.section == section && item?.completed == item?.total).filter(Boolean)[0];
    }
  };
  const checkCurrentSection = (section) => {
    if(checkLessons()) {
      if(checkLessons().find(item => item.completed < item.total)?.section == section) return 'bg-violet-600';
    }
  };
  return (
    <div className="flex flex-col rounded-lg bg-white-100 shadow-xl dark:bg-black-200 p-4">
      <div className="flex flex-row justify-between">
        {Object.keys(getCourse?.sections).sort().map((section) => {
          return (
            <div className={'flex justify-between'} key={section}>
              {isLessonPage ?
                <div className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100  ${checkSectionCompleted(section) ? 'bg-green-500 ' : checkCurrentSection(section)} `}
                >
                  <p className="m-0 p-0">
                    {section?.replace('Section_', 'Sessão ')}
                  </p>
                </div>
                :
                <a href={`#${!isLessonPage ? section : ''}`} onClick={() => toggle(section)} className={`item flex-grow px-4 font-bold py-2 hover:no-underline rounded shadow-lg text-black-100 dark:text-white-100 ${checkSectionCompleted(section) ? 'bg-green-500 ' : checkCurrentSection(section)} `}
                >
                  <p className="m-0 p-0">
                    {section?.replace('Section_', 'Sessão ')}
                  </p>
                </a>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
