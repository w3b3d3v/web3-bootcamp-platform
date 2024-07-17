import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Button, Text } from '@nextui-org/react'
import Modal from '../../../../components/Modal'
import { withProtected } from '../../../../hooks/route'
import { getCourse, getPage } from '../../../../lib/course'
import React, { useState, useEffect } from 'react'
import { getLessonsSubmissions } from '../../../../lib/lessons'
import Tabs from '../../../../components/Tabs'
import { getAllCohorts, getCurrentCohort } from '../../../../lib/cohorts'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import TwitterModal from '../../../../components/TwitterModal.js'
import { getUserFromFirestore } from '../../../../lib/user'
import { auth } from '../../../../firebase/initFirebase'
import { MdAdsClick } from 'react-icons/md'
import { Container } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

function Lessons({ course, section, lesson, content, currentDate }) {
  const [open, setOpen] = useState(false)
  const [lessonSent, setLessonSent] = useState(false)
  const [userSubmission, setUserSubmission] = useState()
  const [sortedLessons, setSortedLessons] = useState([])
  const [url, setUrl] = useState()
  const [cohorts, setCohorts] = useState()
  const [cohort, setCohort] = useState()
  const [submissionType, setSubmissionType] = useState()
  const [submissionTitle, setSubmissionTitle] = useState()
  const [submissionText, setSubmissionText] = useState()
  const [lessonsSubmitted, setLessonsSubmitted] = useState([])
  const [twitterShare, setTwitterShare] = useState(null)
  const [twitterModal, setTwitterModal] = useState(false)
  const [user, setUser] = useState()
  const ref = React.createRef()
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage

  useEffect(async () => {
    if (auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser)
      setUser(userSession)
    }
  }, [auth.currentUser])

  useEffect(async () => {
    setCohorts(await getAllCohorts())
    getSubmissionData()
  }, [])

  useEffect(async () => {
    if (cohorts) {
      setCohort(getCurrentCohort(user, cohorts, course, currentDate))
    }
  }, [cohorts, user])

  useEffect(() => {
    const fetchLessonsSubmitted = async () => {
      let lessonsSubmitted_ = await getLessonsSubmissions(user?.uid, cohort?.id)
      setLessonsSubmitted(lessonsSubmitted_)
    }
    fetchLessonsSubmitted()
  }, [user, cohort, open])

  useEffect(() => {
    lessonsSubmitted.forEach((item) => {
      console.log('lesson', lesson)
      if (item?.lesson === lesson) {
        setUserSubmission(item.content.value)
        setLessonSent(true)
      }
    })
  }, [lessonsSubmitted, lesson])

  useEffect(() => {
    setSortedLessons(course.lessons.sort((a, b) => (a.section > b.section ? 1 : -1)))
  }, [sortedLessons])

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = i18n.resolvedLanguage
      const { pathname, query } = router
      if (query.lang !== newLanguage) {
        query.lang = newLanguage
        router.replace({ pathname, query }, undefined, { lang: newLanguage })
      }
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n, router])

  const nextLesson = () => {
    const currentLessonIndex = sortedLessons.findIndex((item) => item.lesson === lesson)
    const nextLesson = sortedLessons[currentLessonIndex + 1]

    if (lessonSent && !nextLesson) {
      return toast.success(t('messages.lesson_completed_congrats'))
    }
    if (lessonSent) {
      const nextLessonUrl = `/courses/${course.id}/${nextLesson.section}/${nextLesson.lesson}?lang=${language}`
      return router.push(nextLessonUrl)
    }
    return toast.error(t('messages.exercise_not_submitted'))
  }

  const previousLesson = () => {
    const currentLessonIndex = sortedLessons.findIndex((item) => item.lesson === lesson)
    const previousLesson = sortedLessons[currentLessonIndex - 1]

    if (previousLesson) {
      const previousLessonUrl = `/courses/${course.id}/${previousLesson.section}/${previousLesson.lesson}?lang=${language}`
      return router.push(previousLessonUrl)
    }
    return toast.error(t('messages.already_on_first_lesson'))
  }

  const getSection = () => {
    return Object.entries(course.sections)
      .map((section) =>
        section[1].map((item) => {
          if (item.file.includes(lesson)) return section[0]
        })
      )
      .flat()
      .find(Boolean)
  }

  const fixMarkdown = (markdown) => {
    let result = markdown.replace(
      /\[Loom]\(+[a-z]+:\/\/[a-z]+[.][a-z]+[.][a-z]+\/[a-z]+\/(\w+)\)/,
      '<a href="https://www.loom.com/share/$1" target="_blank"><img className="w-2/3"  src="https://cdn.loom.com/sessions/thumbnails/$1-with-play.gif" /></a>'
    )
    result = result.replace(
      /\[Youtube]\(https:\/\/www\.youtube\.com\/watch\?v=([^)]*)\)/,
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" title="Lição" frameBorder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen>'
    )
    return result
  }
  const getSubmissionData = () => {
    const submissionData = course.sections[getSection()].filter((item) => item.file === lesson)[0]
    setSubmissionType(submissionData.submission_type)
    setSubmissionTitle(submissionData.submission_title)
    setSubmissionText(submissionData.submission_text)
    setTwitterShare(submissionData.twitter)
  }
  const closeModal = () => {
    setOpen(false)
    if (twitterShare) setTwitterModal(true)
  }

  const isValidURL = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const renderSubmissionContent = (submission) => {
    if (isValidURL(submission)) {
      return <img className="max-w-md" src={submission} alt="submission" height={250} />
    } else {
      return (
        <ReactMarkdown
          className="react-markdown pt-4"
          rehypePlugins={[rehypeRaw, rehypePrism, remarkGfm]}
          children={submission}
        />
      )
    }
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={`Lesson - ${lesson}`} />
        <meta property="og:image" content={course?.resized_img_url || course.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`${course.title} `} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <title>Lição - {lesson} - WEB3DEV</title>
      </Head>
      <Container>
        <div className="mx-auto px-6 py-2">
          <Tabs course={course} lessonsSubmitted={lessonsSubmitted} cohort={cohort} />
          <div className="m-auto flex w-60 flex-col items-center justify-center gap-4 md:flex-row">
            <Button
              id="previous-lesson"
              customClass="bg-slate-300"
              onClick={previousLesson}
              color={''}
            >
              {t('lesson.previousLesson')}
            </Button>
            <Button
              id="back-to-course"
              customClass=""
              onClick={() => router.push(`/courses/${course.id}`)}
              color=""
            >
              {t('lesson.backToCourse')}
            </Button>
            <Button
              id="next-lesson"
              customClass="bg-violet-600"
              onClick={nextLesson}
              color={'success'}
            >
              {t('lesson.nextLesson')}
            </Button>
          </div>
          <div></div>
        </div>
        <div className="mx-auto mb-6 rounded-lg px-6 py-2 shadow-xl">
          {course &&
            course?.lessons.map((l) => {
              return (
                l.lesson.includes(lesson) && (
                  <div key={l?.section + l?.lesson}>
                    <h3>{l?.lesson.title}</h3>
                    <ReactMarkdown
                      className="react-markdown pt-4"
                      rehypePlugins={[rehypeRaw, rehypePrism, remarkGfm]}
                      children={fixMarkdown(content)}
                    />
                    <div className="mt-8 flex justify-center">
                      {lessonSent ? (
                        <div className="flex flex-col text-center">
                          <Button ref={ref} customClass="my-8 opacity-60 dark:opacity-50" disabled>
                            {t('lesson.lessonSent')}
                          </Button>
                          <div className="mb-3 min-w-min rounded-lg border-2 border-solid border-gray-600 px-4 py-3 text-sm font-medium">
                            {renderSubmissionContent(userSubmission)}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-5">
                          <Button
                            css={{ zIndex: '0' }}
                            rounded
                            ref={ref}
                            id="submit-lesson"
                            customClass="w-2/3 my-8 mx-auto"
                            onClick={() => setOpen(true)}
                            color="success"
                          >
                            {submissionTitle}
                          </Button>
                          <div className="flex flex-col items-center gap-4">
                            <MdAdsClick size={'17px'} />
                            <Text size={'$sm'}> {t('lesson.clickToSendReport')}</Text>
                          </div>
                        </div>
                      )}
                      {open && (
                        <Modal
                          openExternal={open}
                          onClose={() => closeModal()}
                          lesson={lesson}
                          course={course}
                          submissionType={submissionType}
                          submissionText={submissionText}
                          submissionTitle={submissionTitle}
                          twitterShare={twitterShare}
                        />
                      )}
                      {twitterModal && (
                        <TwitterModal
                          openExternal={twitterModal}
                          onClose={() => setTwitterModal(false)}
                          twitterShare={twitterShare}
                          url={url}
                        />
                      )}
                    </div>
                  </div>
                )
              )
            })}
        </div>
        <div className="m-auto flex w-60 flex-col items-center justify-center gap-4 md:flex-row">
          <Button
            css={{ zIndex: '0' }}
            customClass="bg-slate-300"
            onClick={previousLesson}
            color=""
          >
            {t('lesson.previousLesson')}
          </Button>
          <Button
            css={{ zIndex: '0', position: 'relative' }}
            color=""
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            {t('lesson.backToCourse')}
          </Button>
          <Button css={{ zIndex: '0' }} onClick={nextLesson} color="secondary">
            {t('lesson.nextLesson')}{' '}
          </Button>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps({ params, query }) {
  const { lang } = query
  const course = await getCourse(params.id, lang)
  const content = await getPage(params.id, params.section, params.lesson, lang)
  const currentDate = new Date().toISOString()
  const lesson = params.lesson
  const section = params.section
  return {
    props: {
      course,
      section,
      lesson,
      content,
      currentDate,
    },
  }
}

export default withProtected(Lessons)
