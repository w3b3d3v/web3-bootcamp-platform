import { getCourse } from '../../lib/course'
import { getAllCourses } from '../../lib/courses'
import { withProtected } from '../../hooks/route'
import { Button } from '../../components/Button'
import { auth } from '../../firebase/initFirebase'
import { onAuthStateChanged } from 'firebase/auth'
import {
  getUserFromFirestore,
  registerUserInCohortInFirestore,
} from '../../lib/user'
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
import Link from 'next/link'
import ICalendarLink from 'react-icalendar-link'
import countdown from '../../lib/utils/countdown'
import Head from 'next/head'
import { getAllCohorts } from '../../lib/cohorts'
import { getLessonsSubmissions } from '../../lib/lessons'
import Image from 'next/image'

function Course({ course, currentDate }) {
  if (!course.active) return <NotFound />

  const [user, setUser] = useState()
  const [registerOnCohort, setRegisterOnCohort] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [cohorts, setCohorts] = useState()
  const [cohort, setCohort] = useState()
  const [lessonsSubmitted, setLessonsSubmitted] = useState()
  let counter = 0

  useEffect(async () => {
    setCohorts(await getAllCohorts())
  }, [])
  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(user?.uid))
  }, [user])
  useEffect(async () => {
    if (cohorts) {
      const sortCohortsByDate = cohorts.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate)
      })
      const currentCohort = sortCohortsByDate.find((cohort) => {
        return (
          cohort.courseId == course.id &&
          ((cohort.startDate <= new Date(currentDate) &&
            cohort.endDate >= new Date(currentDate)) ||
            cohort.startDate >= new Date(currentDate))
        )
      })
      setCohort(currentCohort)
    }
  }, [cohorts])

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

  const registerUserInCohort = async () => {
    await registerUserInCohortInFirestore(cohort.id, auth.currentUser.uid)
    setRegisterOnCohort(true)
  }
  const userIsRegisteredInCohort = () => {
    return !!user?.cohorts.find(
      (userCohort) =>
        userCohort.course_id == course.id && userCohort.cohort_id == cohort?.id
    )
  }
  const userSubmissions = (allLessons) => {
    const userSubmitted = lessonsSubmitted.map((lesson) => {
      if (lesson.lesson == allLessons.file && lesson.user == user.uid)
        return true
      return false
    })
    if (userSubmitted.every((item) => item === false)) counter++
    return userSubmitted.some((item) => item === true)
  }
  const daysLeftToStart = () => {
    if (typeof timeLeft == 'string') return timeLeft?.split('d')[0]
  }
  const undefinedCohortStartDate = () => {
    return daysLeftToStart() > 180
  }
  const under30dCohortStartDate = () => {
    return !undefinedCohortStartDate()
  }
  const userIsRegisteredAndCohortIsFuture = () => {
    return userIsRegisteredInCohort() && undefinedCohortStartDate()
  }
  const userIsNotRegisteredAndCohortIsOpen = () => {
    return (
      !user?.cohorts ||
      user?.cohorts?.length == 0 ||
      (!userIsRegisteredInCohort() && cohort?.endDate >= new Date(currentDate))
    )
  }
  const userIsNotRegisteredAndCohortIsClosed = () => {
    return (
      (!user?.cohorts ||
        user?.cohorts?.length == 0 ||
        !userIsRegisteredInCohort()) &&
      cohort?.endDate <= new Date(currentDate)
    )
  }
  const userIsRegisteredAndCohortWillOpenSoon = () => {
    return (
      userIsRegisteredInCohort() &&
      cohort?.startDate >= new Date(currentDate) &&
      under30dCohortStartDate()
    )
  }
  const userIsRegisteredAndCohortIsOpen = () => {
    return (
      !userHasAlreadyParticipatedInACohort() &&
      userIsRegisteredInCohort() &&
      cohort?.startDate <= new Date(currentDate) &&
      timeLeft == null &&
      user?.cohorts?.map((cohort) => cohort.course_id).includes(course.id)
    )
  }
  const userHasAlreadyParticipatedInACohort = () => {
    const endedCohorts = []
    cohorts?.map((cohort) => {
      if (
        cohort.courseId === course.id &&
        cohort.endDate <= new Date(currentDate)
      ) {
        endedCohorts.push(cohort)
      }
    })
    const userEndedCohorts = user?.cohorts
      .map((cohort) => {
        if (cohort.course_id == course.id) {
          return endedCohorts.find(
            (endedCohorts) => cohort.cohort_id == endedCohorts.id
          )
        }
      })
      .filter(Boolean)
    return userEndedCohorts?.length > 0
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

                <p className="flex w-2/3 items-center text-xs text-gray-500 dark:text-gray-300">
                  {course?.description /*.substring(0, 100) + '...'*/}
                </p>
              </div>
            </div>
          </div>
        </div>
        {userIsNotRegisteredAndCohortIsClosed() && (
          <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
            <div className="flex w-3/4 flex-col items-center justify-center">
              <p className="text-center text-2xl">
                As inscrições para este bootcamp estão encerradas, aguarde a
                próxima turma abrir para se inscrever!
              </p>
            </div>
          </div>
        )}
        {userIsRegisteredAndCohortIsFuture() && (
          <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
            <div className="flex flex-col items-center justify-center">
              <Link href={'https://discord.web3dev.com.br/'}>
                <a id="discord-logo-link" target="_blank">
                  <Image
                    src={'/assets/img/discord_icon.svg'}
                    width={128}
                    height={128}
                  />
                </a>
              </Link>
              <p className="mt-0 mb-0 text-center text-2xl text-white-100">
                Inscrição feita! <br />A data de lançamento será anunciada no
                nosso{' '}
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
        {userIsNotRegisteredAndCohortIsOpen() &&
          !userHasAlreadyParticipatedInACohort() && (
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
            <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
              <div className="flex w-3/4 flex-col items-center justify-center">
                <p className="mb-3 text-2xl">Evento ao vivo &#x1F31F;</p>
                <p className="text-sm lg:text-base">
                  No lançamento de cada projeto, ocorrerá uma LIVE MASSA!
                  Adicione no seu calendário para não esquecer. Nos veremos lá!
                </p>
                <div className="mt-3 flex w-full flex-row flex-wrap items-start items-center justify-center text-lg font-bold text-white-100 lg:justify-between lg:text-3xl">
                  {timeLeft && '⏰' + timeLeft}
                  <button
                    className="mt-3 flex flex-row items-center rounded-lg bg-indigo-500 p-2 text-sm lg:flex-row lg:p-3 lg:text-base"
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
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
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
        )}
        {(userIsRegisteredAndCohortIsOpen() ||
          userHasAlreadyParticipatedInACohort()) && (
          <>
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="item flex-grow">
                <DiscordCard />
              </div>
              <div className="item flex-grow">
                <WalletCard />
              </div>
            </div>
            <div className="container my-8">
              <Tabs
                course={course}
                lessonsSubmitted={lessonsSubmitted}
                cohort={cohort}
              />

              <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
                {course?.sections &&
                  Object.keys(course?.sections)
                    .sort()
                    .map((section) => {
                      return (
                        <div key={section}>
                          <span id={section} className="mb-4 font-bold">
                            {section?.replace('Section_', 'Sessão ')}
                          </span>
                          <ul className="mt-2 mb-8 flex list-none flex-col	">
                            {course?.sections[section]
                              .map((lesson) => {
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
                                          className="checkbox absolute mt-1 h-full w-full appearance-none rounded-full border border-gray-400 "
                                        />
                                        <div className="check-icon z-1 mb-1 h-full w-full rounded-full">
                                          {userSubmissions(lesson) ? (
                                            <Image
                                              className="h-full w-full "
                                              width={48}
                                              height={48}
                                              src={
                                                '/assets/img/checked-radio-button.svg'
                                              }
                                              alt={lesson.title}
                                            />
                                          ) : (
                                            <Image
                                              className="h-full w-full"
                                              width={48}
                                              height={48}
                                              src={
                                                '/assets/img/radio-button.svg'
                                              }
                                              alt={lesson.title}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        className={
                                          counter > 1
                                            ? 'pointer-events-none'
                                            : ''
                                        }
                                      >
                                        <Link
                                          href={`/courses/${course.id}/lessons/${lesson.file}`}
                                        >
                                          <a
                                            id="access-lesson"
                                            className="text-black-100 dark:text-white-100"
                                          >
                                            <p className="m-0 p-0">
                                              {lesson.title}
                                            </p>
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
      </div>
    </Layout>
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

//export async function getStaticPaths() {
//  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`);
//  return {
//    paths,
//    fallback: false,
//  };
//}

export default withProtected(Course)
