import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../../../components/Button';
import Layout from '../../../../components/layout';
import Modal from '../../../../components/Modal';
import { withProtected } from '../../../../hooks/route';
import { getCourse } from '../../../../lib/course';
import { getAllCourses } from '../../../../lib/courses';
import React, { useState, useEffect } from 'react';
import { getLessonsSubmissions } from '../../../../lib/lessons';
import Tabs from '../../../../components/Tabs';
import useAuth from '../../../../hooks/useAuth';
import { getAllCohorts } from '../../../../lib/cohorts';
import { Router, useRouter } from 'next/router';
import { toast } from 'react-toastify';
import rehypeRaw from 'rehype-raw';
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
function Lessons({ course, lesson }) {

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userSubmission, setUserSubmission] = useState();
  const [sortedLessons, setSortedLessons] = useState([]);
  const [url, setUrl] = useState();
  const [cohorts, setCohorts] = useState();
  const [cohort, setCohort] = useState();
  const [submissionType, setSubmissionType] = useState();
  const [submissionTitle, setSubmissionTitle] = useState();
  const [submissionText, setSubmissionText] = useState();
  const [lessonsSubmitted, setLessonsSubmitted] = useState([]);

  const ref = React.createRef();
  const auth = useAuth();
  const router = useRouter();
  let testUrl;
  useEffect(async () => {
    setCohorts(await getAllCohorts());
  }, []);

  useEffect(async () => {
    if(cohorts) {
      const currentCohort = cohorts.find(c => c.courseId === course.id);
      setCohort(currentCohort);
    }
  }, [cohorts]);

  useEffect(async () => {
    setLessonsSubmitted(await getLessonsSubmissions(auth.user?.uid));
  }, [auth.user, open]);
  
  useEffect(()=>{
    lessonsSubmitted.map(item => {
      if(item.lesson === lesson && item.user == auth.user?.uid) {
        setUserSubmission(item.content.value);
        validateUserSubmission(item.content.value);
        setDisable(true);
      }
    });
  }, [lessonsSubmitted]);

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
    const userLessons = lessonsSubmitted.filter(item => item.user == auth.user?.uid);
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
  useEffect(() => {
    setSortedLessons(course.lessons.sort((a, b) => (a.section > b.section) ? 1 : -1));
  }, [sortedLessons]);
  const nextLesson = () => {
    const currentLessonIndex = sortedLessons.map((item) => item.lesson === lesson).indexOf(true);
    const nextLesson = sortedLessons[currentLessonIndex + 1];
    if(disable) return window.location.href = `/courses/${course.id}/lessons/${nextLesson?.lesson}`;
    return toast.error('Você ainda não enviou o exercício desta lição');
  };
  const previousLesson = () => {
    const currentLessonIndex = sortedLessons.map((item) => item.lesson === lesson).indexOf(true);
    const previousLesson = sortedLessons[currentLessonIndex - 1];
    if(previousLesson) return window.location.href = `/courses/${course.id}/lessons/${previousLesson?.lesson}`;
    return toast.error('Você já está na primeira lição.');
  };
  const validateUserSubmission = (submission) => {
    try {
      testUrl = new URL(submission);
    } catch(_) {
      return submission;
    }
    if(testUrl?.hostname.includes('firebasestorage')) return setUrl(testUrl.href);
    if(testUrl) return submission;
  };
  const getSection = () => {
    const section = Object.entries(course.sections)
      .map(section => section[1]
        .map(item => { if(item.file.includes(lesson)) return section[0]; }))
      .flat()
      .find(Boolean);
    return section;
  };
  useEffect(() => {
    getSubmissionData();
  },[]);

  const fixMarkdown = (markdown) => {
    return markdown.replace(/\[Loom]\(+[a-z]+:\/\/[a-z]+[.][a-z]+[.][a-z]+\/[a-z]+\/(\w+)\)/, '<a href="https://www.loom.com/share/$1" target="_blank"><img className="w-2/3"  src="https://cdn.loom.com/sessions/thumbnails/$1-with-play.gif" /></a>')
    
  }
  const getSubmissionData = () => {
    const submissionData = course.sections[getSection()].filter(item => item.file === lesson)[0];
    setSubmissionType(submissionData.submission_type);
    setSubmissionTitle(submissionData.submission_title);
    setSubmissionText(submissionData.submission_text);
  }

  return (
    <Layout>
      <Head>
        <title>Lição - Bootcamp Web3Dev</title>
      </Head>
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <Tabs course={course} isLessonPage lessonsSubmitted={checkLessons()} />
        <div className='container flex justify-between my-4'>
          <Button customClass='bg-slate-300 dark:text-black-100' onClick={previousLesson}>Lição anterior</Button>
          <Button customClass='' onClick={() => router.push(`/courses/${course.id}`)}>Voltar ao curso</Button>
          <Button customClass='bg-violet-600 text-white-200' onClick={nextLesson}>Próxima lição</Button>
        </div>
      </div>
      <div className="container rounded-lg bg-white-100 shadow-xl dark:bg-black-200 w-2/3 mx-auto px-6 my-8 py-2 sm:px-2 md:px-4 lg:px-14 xl:py-0">
        {course &&
          course?.lessons.map((l) => {
            return (
              l.lesson.includes(lesson) &&
              <div key={l?.section + l?.lesson}>
                <h3>{l?.lesson.title}</h3>
                <ReactMarkdown className='react-markdown pt-4' rehypePlugins={[rehypeRaw, rehypePrism, remarkGfm]}
                  children={fixMarkdown(l?.markdown)}
                />
                <div className='flex justify-center'>
                  {disable ?
                    <div className='flex flex-col text-center'>
                      <Button ref={ref} customClass='my-8 opacity-60 dark:opacity-50' disabled >Lição enviada</Button>
                      <div className='text-black-100 dark:text-white-100 border-solid border-2 border-gray-600 font-medium min-w-min rounded-lg px-4 py-3 mb-3 text-sm'>
                        {url?.length ? <img src={url} alt='submission' height={250} /> : validateUserSubmission(userSubmission)}
                      </div>
                    </div>
                    :
                    <Button ref={ref} customClass='w-2/3 my-8 mx-auto' onClick={() => setOpen(true)}>{submissionTitle}</Button>
                  }
                  {open &&
                    <Modal
                      openExternal={open}
                      onClose={() => setOpen(false)}
                      lesson={lesson}
                      course={course}
                      submissionType={submissionType}
                      submissionText={submissionText}
                      submissionTitle={submissionTitle}
                    />
                  }
                </div>
              </div>
            );
          })}
      </div>
      <div className='container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0'>

        <div className='container flex justify-between my-4'>
          <Button customClass='bg-slate-300 dark:text-black-100' onClick={previousLesson}>Lição anterior</Button>
          <Button onClick={() => router.push(`/courses/${course.id}`)}>Voltar ao curso</Button>
          <Button customClass='bg-violet-600 text-white-200' onClick={nextLesson}>Próxima lição</Button>
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ params }) {
  const course = await getCourse(params.id);
  const lesson = params.lesson;
  return {
    props: {
      course,
      lesson,
    },
  };
}

export async function getStaticPaths() {
  const lessons = (await getAllCourses()).filter((c) => c.active && c.sections).map(c => (Object.values(c.sections).flat().map(lesson => `/courses/${c.id}/lessons/${lesson.file}`))).flat();
  return {
    paths: [
      ...lessons,
    ],
    fallback: false,
  };
}

export default Lessons;
