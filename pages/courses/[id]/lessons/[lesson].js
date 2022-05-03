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
function Lessons({ course, lesson, lessonsSubmitted }) {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userSubmission, setUserSubmission] = useState();
  const [sortedLessons, setSortedLessons] = useState([]);
  const auth = useAuth();
  const ref = React.createRef();

  const [cohorts, setCohorts] = useState();
  const [cohort, setCohort] = useState();
  const router = useRouter();
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
    lessonsSubmitted = await getLessonsSubmissions();
    lessonsSubmitted.map(item => {
      if(item.lesson === lesson) {
        setUserSubmission(item.content.value);
        setDisable(true);
      }
    });
  }, [lessonsSubmitted, auth.currentUser, open]);

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
  });
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
  return (
    <Layout>
      <Head>
        <title>Lição - Bootcamp Web3Dev</title>
      </Head>
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <Tabs course={course} isLessonPage lessonsSubmitted={checkLessons()} />
        <div className='container flex justify-between my-4'>
          <Button onClick={previousLesson}>Lição anterior</Button>
          <Button onClick={() => router.push(`/courses/${course.id}`)}>Voltar ao curso</Button>
          <Button onClick={nextLesson}>Próxima lição</Button>
        </div>
      </div>
      <div className="container rounded-lg bg-white-100 shadow-xl dark:bg-black-200 w-2/3 mx-auto px-6 my-8 py-2 sm:px-2 md:px-4 lg:px-14 xl:py-0">
        {course &&
          course?.lessons.map((l) => {
            return (
              l.lesson.includes(lesson) &&
              <div key={l?.section + l?.lesson}>
                <h3>{l?.lesson.title}</h3>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={l?.markdown.replace(/\[Loom]\(+[a-z]+:\/\/[a-z]+[.][a-z]+[.][a-z]+\/[a-z]+\/(\w+)\)/, "<iframe src='https://www.loom.com/embed/$1' width='100%' height='500' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>")} />
                <div className='flex justify-center'>
                  {disable ?
                    <div className='flex flex-col w-6/12 text-center'>
                      <Button ref={ref} customClass='my-8 opacity-60 dark:opacity-50' disabled >Lição enviada</Button>
                      <div className='text-white-200 border-solid border-2 border-gray-600 font-medium rounded-lg px-4 py-3 mb-3 text-sm'>{userSubmission}</div>
                    </div>
                    :
                    <Button ref={ref} customClass='w-2/3 my-8 mx-auto' onClick={() => setOpen(true)} >Enviar lição</Button>
                  }
                  {open &&
                    <Modal
                      openExternal={open}
                      onClose={() => setOpen(false)}
                      lesson={lesson}
                      course={course}
                    />
                  }
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}
export async function getStaticProps({ params }) {
  const course = await getCourse(params.id);
  const lesson = params.lesson;
  const lessonsSubmitted = await getLessonsSubmissions();
  return {
    props: {
      course,
      lesson,
      lessonsSubmitted
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
