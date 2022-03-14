import Link from 'next/link'
import { Fragment } from 'react'
import Layout from '../../../components/layout'
import { getCourse } from '../../../lib/course'

export const getStaticProps = async () => {
  return {
    props: {
      lessons: await getCourse('Solidity_And_Smart_Contracts'),
    },
  }
}

const LessonsList = ({ lessons }) => {
  return (
    <>
      {lessons.map((lesson) => (
        <Fragment key={lesson.id}>
          <li className="bg-white border border-b-0 border-gray-200 first:rounded-t-md last:rounded-b-md last:border-b hover:bg-pink-50">
            <Link href={`/course/${lesson.id}`}>
              <a className={`block p-2 ${lesson.id ? 'pl-8 text-sm' : ''}`}>
                {lesson.id && <span>↳</span>}
                {lesson.section && (
                  <span className="mr-2 inline-block w-8 text-right text-sm tabular-nums">
                    {lesson.section}.
                  </span>
                )}
                <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
              </a>
            </Link>
          </li>
        </Fragment>
      ))}
    </>
  )
}

const LessonGroup = ({ title, lessons }) => {
  return (
    <>
      {title && <h2 className="mt-8 mb-2 text-xl font-bold">{title}</h2>}
      <ul className="rounded-md shadow-lg">
        <LessonsList lessons={lessons} />
      </ul>{' '}
    </>
  )
}

const LessonsPage = ({ lessons }) => {
  return (
    <Layout>
      <div className="prose my-8">
        <h1>Course outline</h1>
      </div>
      {lessons ? (
        <>
          <LessonGroup lessons={lessons.filter((l) => l.type === 'foreword')} />
          <LessonGroup
            title="Lessons"
            lessons={lessons.filter(
              (l) => l.type === 'lesson' || l.type === 'sublesson'
            )}
          />
          <LessonGroup
            title="Appendices"
            lessons={lessons.filter((l) => l.type === 'appendix')}
          />
        </>
      ) : (
        <p>An error has occurred.</p>
      )}
    </Layout>
  )
}

export default LessonsPage
