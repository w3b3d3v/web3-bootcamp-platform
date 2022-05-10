import { getCourse } from '../../lib/course';
import { getAllCourses } from '../../lib/courses';
import { withProtected } from '../../hooks/route';
import { Button } from '../../components/Button';
import { auth } from '../../firebase/initFirebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../lib/user';
import { CalendarIcon } from '@heroicons/react/solid';
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout';
import ReactMarkdown from 'react-markdown';
import Tabs from '../../components/Tabs';
import DiscordCard from '../../components/Card/Discord';
import WalletCard from '../../components/Card/Wallet';
import ShareLinkCard from '../../components/Card/ShareLink';
import ComingSoonCard from '../../components/Card/ComingSoon';
import NotFound from '../404';
import Link from 'next/link';
import ICalendarLink from "react-icalendar-link";
import countdown from "../../lib/utils/countdown";
import Head from 'next/head';
import { getAllCohorts } from '../../lib/cohorts';
import { getLessonsSubmissions } from '../../lib/lessons';
import Image from 'next/image';

function Course({ course, currentDate }) {
  if(!course.active) return <NotFound />;

  const [user, setUser] = useState();
  const [registerOnCohort, setRegisterOnCohort] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cohorts, setCohorts] = useState();
  const [cohort, setCohort] = useState();
  const [lessonsSubmitted, setLessonsSubmitted] = useState();
  let counter = 0;

  useEffect(async () => {
    setCohorts(await getAllCohorts());
  }, []);
  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(user?.uid));
  }, [user]);
  useEffect(async () => {
    if(cohorts) {
      const currentCohort = cohorts.find(c => c.courseId === course.id);
      setCohort(currentCohort);
    }
  }, [cohorts]);

  useEffect(async () => {
    if(auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser);
      setUser(userSession);
    }
  }, [auth.currentUser, registerOnCohort]);

  const userCohortStartDate = new Date(cohort?.startDate).getTime();
  useEffect(() => {
    const serverdate = new Date(currentDate);

    const interval = setInterval(function() {
      const updateserver = serverdate.setSeconds(serverdate.getSeconds() + 1);
      if(userCohortStartDate) {
        const ct = countdown(userCohortStartDate, new Date(updateserver));
        if(!ct) {
          clearInterval(interval);
        }
        return setTimeLeft(ct);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [userCohortStartDate]);

  const registerUserInCohort = async () => {
    await registerUserInCohortInFirestore(cohort.id, auth.currentUser.uid);
    setRegisterOnCohort(true);
  };
  const userIsRegisteredInCohort = () => {
    return !!user?.cohorts
      ?.map(cohort => cohort)
      .every(item => item.id !== course.id);
  };
  const userSubmissions = (allLessons) => {
    const userSubmitted = lessonsSubmitted.map((lesson) => {
      if(lesson.lesson == allLessons.file && lesson.user == user.uid) return true;
      return false;
    });
    if(userSubmitted.every(item => item === false)) counter++;
    return userSubmitted.some(item => item === true);
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
  const userIsNotRegisteredAndCohortIsOpen = () => {
    return (!user?.cohorts || user?.cohorts?.length == 0) || userIsRegisteredInCohort() && (cohort?.endDate > new Date(currentDate));
  };
  const userIsNotRegisteredAndCohortIsClosed = () => {
    return ((!user?.cohorts || user?.cohorts?.length == 0) || userIsRegisteredInCohort()) && (cohort?.endDate < new Date(currentDate));
  };
  const userIsRegisteredAndCohortWillOpen = () => {
    return (!userIsRegisteredInCohort()) && (cohort?.startDate > new Date(currentDate));
  };
  const userIsRegisteredAndCohortIsOpen = () => {
    return (!userIsRegisteredInCohort()) && (cohort?.startDate < new Date(currentDate)) && (timeLeft == null && user?.cohorts?.map(cohort => cohort.id).includes(course.id));
  };
  return (
    <Layout>
      <Head>
        <title>Curso {course.id} - Bootcamp Web3Dev</title>
      </Head>
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        {/* Page title starts */}
        <div className="relative z-10 pt-8 pb-16">
          <div className="container mx-auto flex flex-col items-start justify-between lg:flex-row lg:items-center">
            <div className="flex flex-col items-start lg:flex-row lg:items-center">
              <div className="mt-10 ml-0 lg:my-0">
                <h1 className="mb-2 text-2xl font-bold">{course?.title}</h1>

                <p className="flex items-center text-xs text-gray-500 dark:text-gray-300 w-2/3">
                  {course?.description/*.substring(0, 100) + '...'*/}
                </p>
              </div>
            </div>
          </div>
        </div>
        {userIsNotRegisteredAndCohortIsClosed() &&
          <div className="flex flex-col justify-center items-center p-2 lg:p-6 bg-gradient-to-r from-cyan-900 to-teal-500 rounded-lg lg:items-center mb-4">
            <div className="flex flex-col w-3/4 justify-center items-center">
              <p className='text-2xl text-center'>As inscrições para este bootcamp estão encerradas, aguarde a próxima turma abrir para se inscrever!</p>
            </div>
          </div>
        }
        {userIsNotRegisteredAndCohortIsOpen() &&
          <>
            <button id={`signup-cohort`} onClick={() => registerUserInCohort()} className="flex item w-full justify-center p-6 bg-gradient-to-r from-green-400 to-violet-500 rounded-lg cursor-pointer">Inscreva-se agora ✨</button>
            <div className="flex pt-6">
              <ComingSoonCard />
            </div>
          </>
        }
        {userIsRegisteredAndCohortWillOpen() &&
          <>
            <div className="flex flex-col justify-center items-center p-2 lg:p-6 bg-gradient-to-r from-cyan-900 to-teal-500 rounded-lg lg:items-center mb-4">
              <div className="flex flex-col w-3/4 justify-center items-center">
                <p className='text-2xl mb-3'>Evento ao vivo ✨</p>
                <p className='text-sm lg:text-base'>No lançamento de cada projeto, ocorrerá uma LIVE MASSA! Adicione no seu calendário para não esquecer. Nos veremos lá!</p>
                <div className='flex flex-row flex-wrap items-start w-full text-lg lg:text-3xl items-center justify-center lg:justify-between mt-3 font-bold text-white-100'>{timeLeft && '⏰' + timeLeft}
                  <button className='flex flex-row mt-3 lg:flex-row bg-indigo-500 text-sm lg:text-base p-2 lg:p-3 rounded-lg items-center' onClick={() => calendarFunction()}>

                    <ICalendarLink className='flex flex-row items-center text-white-100'
                      event={{
                        title: course?.title,
                        description: course?.description,
                        startTime: cohort?.kickoffStartTime,
                        endTime: cohort?.kickoffEndTime,
                        location: "https://discord.web3dev.com.br"
                      }}>
                      <CalendarIcon className='h-7 w-7 mr-2' />Adicionar ao calendário
                    </ICalendarLink>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="item flex-grow">
                <DiscordCard />
              </div>
              <div className="item flex-grow">
                <WalletCard />
              </div>
            </div>
            <div className="flex pt-6">
              <ShareLinkCard course={course.id} />
            </div>
            <div className="flex pt-6">
              <ComingSoonCard />
            </div>
            <br />
          </>
        }
        {userIsRegisteredAndCohortIsOpen() &&
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="item flex-grow">
                <DiscordCard />
              </div>
              <div className="item flex-grow">
                <WalletCard />
              </div>
            </div>
            <div className="container my-8">
              <Tabs course={course} lessonsSubmitted={checkLessons()} />

              <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
                {course?.sections &&
                  Object.keys(course?.sections).sort().map((section) => {
                    return (
                      <div key={section}>
                        <span id={section} className="mb-4 font-bold">
                          {section?.replace('Section_', 'Sessão ')}
                        </span>
                        <ul className="mt-2 mb-8 flex flex-col list-none	">
                          {course?.sections[section].map((lesson) => {
                            return (
                              <li
                                key={lesson.title}
                                className="mb-2 items-center rounded bg-white-200 px-2 py-2 dark:bg-black-300"
                              >
                                <div className="flex items-center">
                                  <div className="relative mr-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                    <input
                                      disabled
                                      type="radio"
                                      name="radio"
                                      className="checkbox absolute h-full w-full mt-1 appearance-none rounded-full border border-gray-400 "
                                    />
                                    <div className="check-icon z-1 h-full w-full rounded-full">
                                      {userSubmissions(lesson) ?
                                        <Image
                                          className="h-full w-full "
                                          width={48}
                                          height={48}
                                          src={'/assets/img/checked-radio-button.png'}
                                          alt={lesson.title}
                                        />
                                        :
                                        <Image
                                          className="h-full w-full"
                                          width={48}
                                          height={48}
                                          src={'/assets/img/radio-button.png'}
                                          alt={lesson.title}
                                        />
                                      }
                                    </div>
                                  </div>
                                  <div className={counter > 1 ? 'pointer-events-none' : ''}>
                                    <Link href={`/courses/${course.id}/lessons/${lesson.file}`}>
                                      <a id="access-lesson" className='text-black-100 dark:text-white-100'>
                                        <p className="m-0 p-0">
                                          {lesson.title}
                                        </p>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            );
                          }).sort((a, b) => a - b)}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex pt-6 mb-3">
              <ShareLinkCard course={course.id} />
            </div>
          </>
        }
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const course = await getCourse(params.id);
  const currentDate = new Date().toISOString();
  return {
    props: {
      course,
      currentDate
    },
  };
}

//export async function getStaticPaths() {
//  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`);
//  return {
//    paths,
//    fallback: false,
//  };
//}

export default withProtected(Course);
