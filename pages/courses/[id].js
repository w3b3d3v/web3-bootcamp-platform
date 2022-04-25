import { getCourse } from '../../lib/course'
import { getAllCourses } from '../../lib/courses'
import { withProtected } from '../../hooks/route'
import { Button } from '../../components/Button'
import { auth } from '../../firebase/initFirebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../lib/user';
import { CalendarIcon } from '@heroicons/react/solid'
import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../../components/layout'
import ReactMarkdown from 'react-markdown'
import Tabs from '../../components/Tabs'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import ShareLinkCard from '../../components/Card/ShareLink'
import ComingSoonCard from '../../components/Card/ComingSoon'
import NotFound from '../404'
import Link from 'next/link';
import ICalendarLink from "react-icalendar-link";
import countdown from "../../lib/utils/countdown";
import Head from 'next/head';
import { getAllCohorts } from '../../lib/cohorts';

function Course({ course }) {
  if (!course.active) return <NotFound />

  const [user, setUser] = useState();
  const [registerOnCohort, setRegisterOnCohort] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cohorts, setCohorts] = useState();
  const [cohort, setCohort] = useState();

  useEffect(async () => {
    setCohorts(await getAllCohorts());
  }, [])

  useEffect(async () => {
    if(cohorts){
      const currentCohort = cohorts.find(c => c.courseId === course.id);
      setCohort(currentCohort);
    }
  }, [cohorts])

  useEffect(async () => {
    if (auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser);
      setUser(userSession);
    }
  }, [auth.currentUser, registerOnCohort])

  useEffect(() => {
    if (document) {
      const userCohortStartDate = new Date(cohort?.startDate).getTime();
      const interval = setInterval(function () {
        const ct = countdown(userCohortStartDate);
        setTimeLeft(ct);
        if (!ct) {
          clearInterval(interval);
        }
      }, 1000);
    }
  })
  const registerUserInCohort = async () => {
    await registerUserInCohortInFirestore(cohort.id, auth.currentUser.uid)
    setRegisterOnCohort(true)
  }

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
        {user?.cohorts?.length == 0 || !user?.cohorts?.map(cohort => cohort).map(item => item.cohort.path == cohort.id) ?
          <>
            <div className="flex">
              <div id={`cadastrar-se-cohort-curso`}>
                <button onClick={() => registerUserInCohort()} className="flex item w-full justify-center p-6 bg-gradient-to-r from-green-400 to-violet-500 rounded-lg cursor-pointer">Inscreva-se agora ✨</button>
              </div>
            </div>
            <div className="flex pt-6">
              <ComingSoonCard />
            </div>
          </>
          :
          <>
            <div className="flex flex-col justify-center items-center p-2 lg:p-6 bg-gradient-to-r from-cyan-900 to-teal-500 rounded-lg lg:items-center mb-4">
              <div className="flex flex-col w-3/4 justify-center items-center">
                <p className='text-2xl mb-3'>Evento ao vivo ✨</p>
                <p className='text-sm lg:text-base'>No lançamento de cada projeto, ocorrerá uma LIVE MASSA! Adicione no seu calendário para não esquecer. Nos veremos lá!</p>
                <div className='flex flex-row flex-wrap items-start w-full text-lg lg:text-3xl items-center justify-center lg:justify-between mt-3 font-bold'>{timeLeft && '⏰' + timeLeft}
                  <button className='flex flex-row mt-3 lg:flex-row bg-indigo-500 text-sm lg:text-base p-2 lg:p-3 rounded-lg items-center' onClick={() => calendarFunction()}>

                    <ICalendarLink className='flex flex-row items-center'
                    event={{
                      title: course?.title,
                      description: course?.description,
                      startTime: cohort.kickoffStartTime,
                      endTime: cohort.kickoffEndTime,
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
              <ShareLinkCard course={course.id}/>
            </div>
            <div className="flex pt-6">
              <ComingSoonCard />
            </div>
            <br />
          </>
        }
        {
          timeLeft == null && user?.cohorts?.map(cohort => cohort.path).includes(course.id) &&
          <>
            <div className="container my-8">
              <Tabs course={course} />

              <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
                {course?.sections &&
                  Object.keys(course?.sections).sort().map((section) => {
                    return (
                      <div key={section}>
                        <span className="mb-4 font-bold">
                          {section?.replace('Section_', 'Sessão ')}
                        </span>
                        <ul className="mt-2 mb-8 flex flex-col">
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
                                      className="checkbox absolute h-full w-full appearance-none rounded-full border border-gray-400 checked:border-none focus:outline-none"
                                    />
                                    <div className="check-icon z-1 hidden h-full w-full rounded-full border-4 border-indigo-700" />
                                  </div>
                                  <Link href={`/courses/${course.id}/lessons/${lesson.file}`}>
                                    <a>
                                      <p className="m-0 p-0">
                                        {lesson.title}
                                      </p>
                                    </a>
                                  </Link>
                                </div>
                              </li>
                            )
                          }).sort((a, b) => a - b)}
                        </ul>
                      </div>
                    )
                  })}
              </div>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const course = await getCourse(params.id)
  return {
    props: {
      course,
    },
  }
}

export async function getStaticPaths() {
  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`)
  return {
    paths,
    fallback: false,
  }
}

export default withProtected(Course)
