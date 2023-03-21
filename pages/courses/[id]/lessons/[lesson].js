import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Button } from '@nextui-org/react'
import Modal from '../../../../components/Modal'
import { withProtected } from '../../../../hooks/route'
import { getCourse } from '../../../../lib/course'
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

function Lessons({ course, lesson, currentDate }) {
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
  let testUrl

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

  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(user?.uid))
  }, [user, open])

  useEffect(() => {
    lessonsSubmitted.map((item) => {
      if (
        item?.lesson === lesson &&
        item?.user == user?.uid &&
        item?.cohort_id == cohort?.id
      ) {
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
    if (lessonSent && !nextLesson) return toast.success('Você terminou, parabéns!')
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
    <>
      <Head>
        <meta property="og:title" content={`Lesson - ${lesson}`} />
        <meta property="og:image" content={course?.resized_img_url || course.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`${course.title} `} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <title>Lição - {lesson} -Web3Dev</title>
      </Head>
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <Tabs course={course} isLessonPage lessonsSubmitted={lessonsSubmitted} cohort={cohort} />
        <div className="container my-4 flex justify-between">
          <Button
            id="previous-lesson"
            customClass="bg-slate-300"
            onClick={previousLesson}
            color={''}
          >
            Lição anterior
          </Button>
          <Button
            id="back-to-course"
            customClass=""
            onClick={() => router.push(`/courses/${course.id}`)}
            color=''
          >
            Voltar ao curso
          </Button>
          <Button id="next-lesson" customClass="bg-violet-600" onClick={nextLesson} color={'success'}>
            Próxima lição
          </Button>
        </div>
      </div>
      <div className="container mx-auto my-8 w-2/3 rounded-lg  px-6 py-2 shadow-xl sm:px-2 md:px-4 lg:px-14 xl:py-0">
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
                  <div className="flex justify-center mt-8">
                    {lessonSent ? (
                      <div className="flex flex-col text-center">
                        <Button ref={ref} customClass="my-8 opacity-60 dark:opacity-50" disabled>
                          Lição enviada
                        </Button>
                        <div className="mb-3 min-w-min rounded-lg border-2 border-solid border-gray-600 px-4 py-3 text-sm font-medium">
                          {url?.length ? (
                            <img className="max-w-md" src={url} alt="submission" height={250} />
                          ) : (
                            validateUserSubmission(userSubmission)
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button
                        css={{ zIndex:'0', position:'relative' }}
                        ref={ref}
                        id="submit-lesson"
                        customClass="w-2/3 my-8 mx-auto"
                        onClick={() => setOpen(true)}
                        icon={<MdAdsClick size={"17px"} />}
                        color='success'
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
          <Button customClass="bg-slate-300" onClick={previousLesson} color='' >
            Lição anterior
          </Button>
          <Button
          css={{ zIndex:'0', position:'relative' }} 
          color=''
          onClick={() => router.push(`/courses/${course.id}`)}>Voltar ao curso</Button>
          <Button 
          onClick={nextLesson} 
          color='secondary'>
            Próxima lição
          </Button>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const course = await getCourse(params.id)
  const currentDate = new Date().toISOString()
  const lesson = params.lesson
  return {
    props: {
      course,
      lesson,
      currentDate,
    },
  }
}

export default withProtected(Lessons)
