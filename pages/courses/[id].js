import { getCourse } from '../../lib/course'
import { withProtected } from '../../hooks/route'
import { auth } from '../../firebase/initFirebase'
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../lib/user'
import { CalendarIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import Tabs from '../../components/Tabs'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import ShareLinkCard from '../../components/Card/ShareLink'
import ComingSoonCard from '../../components/Card/ComingSoon'
import NotFound from '../404'
import Link from 'next/link'
import ICalendarLink from 'react-icalendar-link'
import countdown from '../../lib/utils/countdown'
import Head from 'next/head'
import { getAllCohorts, getCurrentCohort } from '../../lib/cohorts'
import { getLessonsSubmissions } from '../../lib/lessons'
import Image from 'next/image'
import Loading from '../../components/Loading'
import {dateFormat} from '../../lib/dateFormat'

function Course({ course, currentDate }) {
  if (!course.active) return <NotFound />

  const [user, setUser] = useState()
  const [registerOnCohort, setRegisterOnCohort] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [cohorts, setCohorts] = useState()
  const [cohort, setCohort] = useState()
  const [lessonsSubmitted, setLessonsSubmitted] = useState()
  const [loading, setLoading] = useState(true)
  let counter = 0
  useEffect(async () => {
    setCohorts(await getAllCohorts())
  }, [])
  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(user?.uid))
  }, [user])
  useEffect(async () => {
    if (cohorts) {
      setCohort(getCurrentCohort(user, cohorts, course, currentDate))
    }
  }, [cohorts, user])

  useEffect(async () => {
    if (auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser)
      setUser(userSession)
    }
  }, [auth.currentUser, registerOnCohort])

  const userCohortStartDate = new Date(cohort?.startDate).getTime()
  useEffect(() => {
    const serverdate = new Date(currentDate)

    const interval = setInterval(function () {
      const updateserver = serverdate.setSeconds(serverdate.getSeconds() + 1)
      if (userCohortStartDate) {
        const ct = countdown(userCohortStartDate, new Date(updateserver))
        if (!ct) {
          clearInterval(interval)
        }
        return setTimeLeft(ct)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [userCohortStartDate])

  useEffect(() => {
    if (cohort) {
      setLoading(false)
    }
  }, [cohort])

  const registerUserInCohort = async () => {
    await registerUserInCohortInFirestore(cohort.id, auth.currentUser.uid)
    setRegisterOnCohort(true)
  }
  const userIsRegisteredInCurrentCohort = () => {
    return !!user?.cohorts.find(
      (userCohort) => userCohort.course_id == course.id && userCohort.cohort_id == cohort?.id
    )
  }

  const userSubmissions = (allLessons) => {
    const userSubmitted = lessonsSubmitted.map((lesson) => {
      if (
        lesson.lesson == allLessons.file &&
        lesson.user == user.uid &&
        lesson.cohort_id === cohort.id
      )
        return true
      return false
    })
    if (userSubmitted.every((item) => item === false)) counter++
    return userSubmitted.some((item) => item === true)
  }
  const daysLeftToStart = () => {
    if (typeof timeLeft == 'string') return timeLeft?.split('d')[0]
  }
  const undefinedCohortStartDate = () => daysLeftToStart() > 180

  const under30dCohortStartDate = () => !undefinedCohortStartDate()

  const userIsRegisteredAndCohortIsFuture = () =>
    userIsRegisteredInCurrentCohort() && undefinedCohortStartDate()

  const userIsNotRegisteredAndCohortIsOpen = () => {
    if (!cohort) return
    return (
      !user?.cohorts ||
      user?.cohorts?.length == 0 ||
      (!userIsRegisteredInCurrentCohort() && cohort?.endDate >= new Date(currentDate))
    )
  }
  const userIsNotRegisteredAndCohortIsClosed = () => {
    if (!cohort) return true
    return (
      (!user?.cohorts || user?.cohorts?.length == 0 || !userIsRegisteredInCurrentCohort()) &&
      cohort?.endDate <= new Date(currentDate)
    )
  }
  const userIsRegisteredAndCohortWillOpenSoon = () => {
    return (
      userIsRegisteredInCurrentCohort() &&
      cohort?.startDate >= new Date(currentDate) &&
      under30dCohortStartDate()
    )
  }
  const userIsRegisteredAndCohortIsOpen = () => {
    return (
      !userHasAlreadyParticipatedInACohort() &&
      userIsRegisteredInCurrentCohort() &&
      cohort?.startDate <= new Date(currentDate) &&
      timeLeft == null &&
      user?.cohorts?.map((cohort) => cohort.course_id).includes(course.id)
    )
  }
  const userHasAlreadyParticipatedInACohort = () => {
    const endedCohorts = []
    cohorts?.map((cohort) => {
      if (cohort.courseId === course.id && cohort.endDate <= new Date(currentDate)) {
        endedCohorts.push(cohort)
      }
    })
    const userEndedCohorts = user?.cohorts
      .map((cohort) => {
        if (cohort.course_id == course.id) {
          return endedCohorts.find((endedCohorts) => cohort.cohort_id == endedCohorts.id)
        }
      })
      .filter(Boolean)
    return userEndedCohorts?.length > 0
  }

  const styleImageCover = {
    borderRadius:'10px'
  }
  
  const [kickoffStartDate, setKickoffStartDate] = useState()
  const [kickoffEndDate, setKickoffEndDate] = useState()


  useEffect(() => {
    if (!cohort?.kickoffStartTime && !cohort?.kickoffEndTime) return
    const cohortKickoffDateGMTPattern = dateFormat(cohort?.kickoffStartTime)
    const cohortKickoffEndDateGTMPattern = dateFormat(cohort?.kickoffEndTime)
    setKickoffStartDate(cohortKickoffDateGMTPattern)
    setKickoffEndDate(cohortKickoffEndDateGTMPattern)
    
  },[cohort])
  
  return (
    <>
      <Head>
        <meta property="og:title" content={course.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bootcamp.web3dev.com.br/" />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course?.resized_img_url || course.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`${course.title} `} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        {/*Twitter Start*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bootcamp.web3dev.com.br/" />
        <meta property="twitter:title" content={course.title} />
        <meta property="twitter:description" content={course.description} />
        <meta property="twitter:image" content={course.image_url} />
        {/*Twitter End*/}

        <title>Curso {course.id} -Web3Dev</title>
      </Head>
      
      <div className="mx-auto max-w-7xl px-6 mt-0 lg:mt-10">

      <div className="flex justify-between mb-8 flex-col lg:flex-row">

        <div className='self-center lg:max-w-lg max-w-3xl'>

          <h1 className="text-2xl font-bold">{course?.title}</h1>

            <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
              {course?.description /*.substring(0, 100) + '...'*/}
            </p>
          </div>
            <div className='h-full lg:mx-0 mx-auto'>
              <Image 
              src={course?.image_url}               
              width="300px"
              height='300px'
              style={styleImageCover}></Image>
            </div>
      </div>
        

        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {userIsNotRegisteredAndCohortIsClosed() && (
              <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
                <div className="flex w-3/4 flex-col items-center justify-center">
                  <p className="text-center text-2xl">
                    As inscrições estão encerradas, aguarde a próxima turma abrir para se inscrever!
                  </p>
                </div>
              </div>
            )}

            {userIsRegisteredAndCohortIsFuture() && (
              <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center ">
                <div className="flex flex-col items-center justify-center">
                  <Link href={'https://discord.web3dev.com.br/'}>
                    <a id="discord-logo-link" target="_blank">
                      <Image src={'/assets/img/discord_icon.svg'} width={128} height={128} />
                    </a>
                  </Link>
                  <p className="mt-0 mb-0 text-center text-2xl text-white-100">
                    Inscrição feita! <br />A data de lançamento será anunciada no nosso{' '}
                    <Link href={'https://discord.web3dev.com.br/'}>
                      <a
                        id="discord-text-link"
                        target="_blank"
                        className="text-decoration-none text-white-100"
                      >
                        Discord
                      </a>
                    </Link>
                    .
                  </p>
                  <br />
                  <Link href={'https://discord.web3dev.com.br/'}>
                    <a
                      id="discord-button-link"
                      target="_blank"
                      className="text-decoration-none rounded-lg bg-violet-600 p-1 px-2 text-white-100 hover:no-underline"
                    >
                      <p>Aproveita para já entrar lá!</p>
                    </a>
                  </Link>
                </div>
              </div>
            )}
            {userIsNotRegisteredAndCohortIsOpen() && !userHasAlreadyParticipatedInACohort() && (
              <>
                <button
                  id={`signup-cohort`}
                  onClick={() => registerUserInCohort()}
                  className="item flex w-full cursor-pointer justify-center rounded-lg bg-gradient-to-r from-green-400 to-violet-500 p-6"
                >
                  Inscreva-se agora &#x1F31F;
                </button>
                <div className="flex pt-6">
                  <ComingSoonCard />
                </div>
              </>
            )}
            {userIsRegisteredAndCohortWillOpenSoon() && (
              <>
                <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6 ">
                  <div className="flex w-3/4 flex-col items-center justify-center">
                    <p className="mb-3 text-2xl">Evento ao vivo &#x1F31F;</p>
                    <p className="text-sm lg:text-base">
                      No lançamento de cada projeto, ocorrerá uma LIVE MASSA! Adicione no seu
                      calendário para não esquecer. Nos veremos lá!
                    </p>
                    <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center text-lg font-bold text-white-100 lg:justify-between lg:text-3xl md:flex-col">
                      {timeLeft && '⏰' + timeLeft}
                      <button
                        className="mt-3 flex flex-row items-center rounded-lg bg-transparent p-2 text-sm lg:flex-row lg:p-3 lg:text-base mb-4 border-none"
                        onClick={() => calendarFunction()}
                      >
                        <ICalendarLink
                          className="flex flex-row items-center text-white-100"
                          event={{
                            title: course?.title,
                            description: course?.description,
                            startTime: cohort?.kickoffStartTime,
                            endTime: cohort?.kickoffEndTime,
                            location: 'https://discord.web3dev.com.br',
                          }}
                        >
                          <CalendarIcon className="mr-2 h-7 w-7" />
                          Adicionar ao calendário
                        </ICalendarLink>
                        
                      </button>

                        <button 
                        className='bg-black-300 p-2 rounded-lg flex items-center border-black-400 max-w-xs'
                        type='button'
                        >
                        <img src="/assets/img/google-logo.svg" className='w-9 h-9' />  
                        <a
                        href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${kickoffStartDate}/${kickoffEndDate}&text=Bootcamp Web3dev ${course?.title}`}
                        target="_blank"
                        >
                          <p className="text-white-100 text-sm font-bold">Adicionar ao calendário Google </p>
                        </a>
                        </button>

                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-11">
                  <div className="flex-1">
                    <DiscordCard />
                  </div>
                  <div className="flex-1">
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
            )}
            {(userIsRegisteredAndCohortIsOpen() || userHasAlreadyParticipatedInACohort()) && (
              <>
                <div className="flex flex-col lg:flex-row gap-11 content-end">
                  <div className="flex-1">
                    <DiscordCard />
                  </div>
                  <div className="flex-1">
                    <WalletCard />
                  </div>
                </div>
                <div className="my-8">
                  <Tabs course={course} lessonsSubmitted={lessonsSubmitted} cohort={cohort} />

                  <div className="z-10 my-8 w-full rounded-lg bg-white-100 shadow-xl dark:bg-black-200 p-7">
                    {course?.sections &&
                      Object.keys(course?.sections)
                        .sort()
                        .map((section) => {
                          return (
                            <div key={section}>
                              <span id={section} className="mb-4 font-bold">
                                {section?.replace('Section_', 'Seção ')}
                              </span>
                              <ul className="mt-4 mb-4 flex list-none flex-col	">
                                {course?.sections[section]
                                  .map((lesson) => {
                                    return (
                                      <li
                                        key={lesson.title}
                                        className="mb-4 items-center rounded bg-white-200 py-2 dark:bg-black-300 px-4"
                                      >
                                        <div className="flex items-center">
                                          <div className="relative mr-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                            <input
                                              disabled
                                              type="radio"
                                              name="radio"
                                              className="checkbox absolute mt-1 h-full w-full appearance-none rounded-full border border-gray-400 "
                                            />
                                            <div className="check-icon z-1 mb-1 h-full w-full rounded-full">
                                              {userSubmissions(lesson) ? (
                                                <Image
                                                  className="h-full w-full "
                                                  width={48}
                                                  height={48}
                                                  src={'/assets/img/checked-radio-button.svg'}
                                                  alt={lesson.title}
                                                />
                                              ) : (
                                                <Image
                                                  className="h-full w-full"
                                                  width={48}
                                                  height={48}
                                                  src={'/assets/img/radio-button.svg'}
                                                  alt={lesson.title}
                                                />
                                              )}
                                            </div>
                                          </div>
                                          <div className={counter > 1 ? 'pointer-events-none' : ''}>
                                            <Link
                                              href={`/courses/${course.id}/lessons/${lesson.file}`}
                                            >
                                              <a
                                                id="access-lesson"
                                                className="text-black-100 dark:text-white-100"
                                              >
                                                <p className="m-0 p-0">{lesson.title}</p>
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  })
                                  .sort((a, b) => a - b)}
                              </ul>
                            </div>
                          )
                        })}
                  </div>
                </div>
                <div className="mb-3 flex pt-6">
                  <ShareLinkCard course={course.id} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const course = await getCourse(params.id)
  const currentDate = new Date().toISOString()
  return {
    props: {
      course,
      currentDate,
    },
  }
}

export default withProtected(Course)
