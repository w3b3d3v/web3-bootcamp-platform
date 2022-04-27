import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../../../components/Button';
import Layout from '../../../../components/layout';
import Modal from '../../../../components/Modal';
import { withProtected } from '../../../../hooks/route';
import { getCourse } from '../../../../lib/course';
import { getAllCourses } from '../../../../lib/courses';
import { useState } from 'react';

function Lessons({ course, lesson }) {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Lição - Bootcamp Web3Dev</title>
      </Head>
      <div className="container rounded-lg bg-white-100 shadow-xl dark:bg-black-200 w-2/3 mx-auto px-6 my-8 py-2 sm:px-2 md:px-4 lg:px-14 xl:py-0">
        {course &&
          course?.lessons.map((l) => {
            return (
              l.lesson.includes(lesson) &&
              <div key={l?.section + l?.lesson}>
                <h2 className='py-4'>{l?.section?.replace('Section_', 'Sessão ')}</h2>
                <h3>{l?.lesson.title}</h3>
                <br />
                <ReactMarkdown children={l?.markdown}/>
                <div className='flex justify-center'>
                  <Button customClass='w-2/3 my-8 mx-auto' onClick={() => setOpen(true)}>Enviar lição</Button>
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
  return {
    props: {
      course,
      lesson
    },
  };
}

export async function getStaticPaths() {
  const lessons = (await getAllCourses()).map((c) => c.active && c.sections ? (Object.values(c.sections).flat().map(lesson => `/courses/${c.id}/lessons/${lesson.file}`)) : `/courses/${c.id}/lessons/Lesson_1_Welcome.md`).flat();
  return {
    paths: [
      ...lessons,
    ],
    fallback: false,
  };
}

export default Lessons;
