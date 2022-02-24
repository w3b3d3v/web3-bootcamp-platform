import Layout from '../../components/layout'
import { getCourse } from '../../lib/course'
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { getAllCourses } from '../../lib/courses'

export default function Course({ course }) {
  return <Layout>
    <h2 className="text-2xl font-bold">
      <Link href="/courses">
        <a>Voltar para lista de cursos</a>
      </Link>
    </h2>


    <h1>{course.title}</h1>

    <ul>
      {course.lessons && course.lessons
        .map((l) => {
          return (
            <div key={l.section + l.lesson}>
              <h2>{l.section}</h2>
              <h3>{l.lesson}</h3>
              <ReactMarkdown>{l.markdown}</ReactMarkdown>
            </div>
          );
        })}
    </ul>
  </Layout>
}

export async function getStaticProps({ params }) {
  const course = await getCourse(params.id)
  return {
    props: {
      course
    }
  }
}

export async function getStaticPaths() {
  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`)
  return {
    paths,
    fallback: false
  }
}
