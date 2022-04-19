import ReactMarkdown from 'react-markdown';
import Layout from '../../../../components/layout'
import { withProtected } from '../../../../hooks/route'
import { getCourse } from '../../../../lib/course';
import { getAllCourses } from '../../../../lib/courses';

function Lessons({ course }) {
  console.log(course) // course is still undefined since theres no server side props yet
  return (
    <Layout>
      <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
        {course &&
          course?.lessons.map((l) => {
            return (
              <div key={l?.section + l?.lesson}>
                <h2>{l?.section}</h2>
                <h3>{l?.lesson.title}</h3>
                <ReactMarkdown>{l?.markdown}</ReactMarkdown>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}
//export async function getStaticProps({ params }) {
//  console.log(params)
//  const course = await getCourse(params.id)
//  return {
//    props: {
//      course,
//    },
//  }
//}

//export async function getStaticPaths() {
//  const lessons = (await getAllCourses()).map((c) => c.active && c.sections ? (Object.values(c.sections).flat().map(lesson => /*Object.assign({}, {lesson:*/`/courses/${c.id}/lessons/${lesson.file}`/*})*/)  ): `/courses/${c.id}/lessons/Lesson_1_Welcome.md`).flat()
//  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`)
//  return {
//    paths: [
//      {params: {...paths}},
//      {params: {lesson: {...lessons}}},
//    ],
//    fallback: false,
//  }
//}


export default Lessons
