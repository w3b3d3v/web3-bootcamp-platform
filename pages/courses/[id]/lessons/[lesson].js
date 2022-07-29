import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Button } from '../../../../components/Button'
import Layout from '../../../../components/layout'
import Modal from '../../../../components/Modal'
import { withProtected } from '../../../../hooks/route'
import { getCourse } from '../../../../lib/course'
import { getAllCourses } from '../../../../lib/courses'
import React, { useState, useEffect } from 'react'
import { getLessonsSubmissions } from '../../../../lib/lessons'
import Tabs from '../../../../components/Tabs'
import useAuth from '../../../../hooks/useAuth'
import { getAllCohorts } from '../../../../lib/cohorts'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import TwitterModal from '../../../../components/TwitterModal.js'

function Lessons({ course, lesson }) {
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
  const ref = React.createRef()
  const auth = useAuth()
  const router = useRouter()
  let testUrl
  useEffect(async () => {
    setCohorts(await getAllCohorts())
    getSubmissionData()
  }, [])

  useEffect(async () => {
    if (cohorts) {
      const currentCohort = cohorts.find((c) => c.courseId === course.id)
      setCohort(currentCohort)
    }
  }, [cohorts])

  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(auth.user?.uid))
  }, [auth.user, open])

  useEffect(() => {
    lessonsSubmitted.map((item) => {
      if (item.lesson === lesson && item.user == auth.user?.uid) {
        setUserSubmission(item.content.value)
        validateUserSubmission(item.content.value)
        setLessonSent(true)
      }
    })
  }, [lessonsSubmitted])

  useEffect(() => {
    setSortedLessons(course.lessons.sort((a, b) => (a.section > b.section ? 1 : -1)))
  }, [sortedLessons])
  const nextLesson = () => {
    const currentLessonIndex = sortedLessons.map((item) => item.lesson === lesson).indexOf(true)
    const nextLesson = sortedLessons[currentLessonIndex + 1]
    if (lessonSent && !nextLesson) return toast.success('Você terminou o bootcamp, parabéns!')
    if (lessonSent)
      return (window.location.href = `/courses/${course.id}/lessons/${nextLesson?.lesson}`)
    return toast.error('Você ainda não enviou o exercício desta lição')
  }
  const previousLesson = () => {
    const currentLessonIndex = sortedLessons.map((item) => item.lesson === lesson).indexOf(true)
    const previousLesson = sortedLessons[currentLessonIndex - 1]
    if (previousLesson)
      return (window.location.href = `/courses/${course.id}/lessons/${previousLesson?.lesson}`)
    return toast.error('Você já está na primeira lição.')
  }
  const validateUserSubmission = (submission) => {
    try {
      testUrl = new URL(submission)
    } catch (_) {
      return submission
    }
    if (testUrl?.hostname.includes('firebasestorage')) return setUrl(testUrl.href)
    if (testUrl) return submission
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
    return markdown.replace(
      /\[Loom]\(+[a-z]+:\/\/[a-z]+[.][a-z]+[.][a-z]+\/[a-z]+\/(\w+)\)/,
      '<a href="https://www.loom.com/share/$1" target="_blank"><img className="w-2/3"  src="https://cdn.loom.com/sessions/thumbnails/$1-with-play.gif" /></a>'
    )
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
  return (
    <Layout>
      <Head>
        <title>Lição - Bootcamp Web3Dev</title>
      </Head>
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <Tabs course={course} isLessonPage lessonsSubmitted={lessonsSubmitted} cohort={cohort} />
        <div className="container my-4 flex justify-between">
          <Button
            id="previous-lesson"
            customClass="bg-slate-300 dark:text-black-100"
            onClick={previousLesson}
          >
            Lição anterior
          </Button>
          <Button
            id="back-to-course"
            customClass=""
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            Voltar ao curso
          </Button>
          <Button id="next-lesson" customClass="bg-violet-600 text-white-200" onClick={nextLesson}>
            Próxima lição
          </Button>
        </div>
      </div>
      <div className="container mx-auto my-8 w-2/3 rounded-lg bg-white-100 px-6 py-2 shadow-xl dark:bg-black-200 sm:px-2 md:px-4 lg:px-14 xl:py-0">
        {course &&
          course?.lessons.map((l) => {
            return (
              l.lesson.includes(lesson) && (
                <div key={l?.section + l?.lesson}>
                  <h3>{l?.lesson.title}</h3>
                  <ReactMarkdown
                    className="react-markdown pt-4"
                    rehypePlugins={[rehypeRaw, rehypePrism, remarkGfm]}
                    children={fixMarkdown(l?.markdown)}
                  />
                  <div className="flex justify-center">
                    {lessonSent ? (
                      <div className="flex flex-col text-center">
                        <Button ref={ref} customClass="my-8 opacity-60 dark:opacity-50" disabled>
                          Lição enviada
                        </Button>
                        <div className="mb-3 min-w-min rounded-lg border-2 border-solid border-gray-600 px-4 py-3 text-sm font-medium text-black-100 dark:text-white-100">
                          {url?.length ? (
                            <img className="max-w-md" src={url} alt="submission" height={250} />
                          ) : (
                            validateUserSubmission(userSubmission)
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button
                        ref={ref}
                        id="submit-lesson"
                        customClass="w-2/3 my-8 mx-auto"
                        onClick={() => setOpen(true)}
                      >
                        {submissionTitle}
                      </Button>
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
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className="container my-4 flex justify-between">
          <Button customClass="bg-slate-300 dark:text-black-100" onClick={previousLesson}>
            Lição anterior
          </Button>
          <Button onClick={() => router.push(`/courses/${course.id}`)}>Voltar ao curso</Button>
          <Button customClass="bg-violet-600 text-white-200" onClick={nextLesson}>
            Próxima lição
          </Button>
        </div>
      </div>
    </Layout>
  )
}
export async function getStaticProps({ params }) {
  const course = await getCourse(params.id)
  const lesson = params.lesson
  return {
    props: {
      course,
      lesson,
    },
  }
}

export async function getStaticPaths() {
  const lessons = (await getAllCourses())
    .filter((courses) => courses.active && courses.sections)
    .map((course) =>
      Object.values(course.sections)
        .flat()
        .map((lesson) => `/courses/${course.id}/lessons/${lesson.file}`)
    )
    .flat()
  return {
    paths: [...lessons],
    fallback: false,
  }
}

export default withProtected(Lessons)
