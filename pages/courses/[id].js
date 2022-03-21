import Layout from '../../components/layout'
import { getCourse } from '../../lib/course'
import ReactMarkdown from 'react-markdown'
import { getAllCourses } from '../../lib/courses'

import { withProtected } from '../../hooks/route'
import Tabs from '../../components/Tabs'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import Button from '../../components/Button'

import NotFound from '../404'

function Course({ course }) {
  if (!course.active) return <NotFound />
  return (
    <Layout>
      <div className="lg container mt-24 flex flex-col justify-center px-6 pb-12 sm:mt-20 sm:px-6 md:mt-20 md:flex md:px-6 lg:mt-6 lg:px-32">
        {/* Page title starts */}
        <div className="relative z-10 pt-8 pb-16">
          <div className="container mx-auto flex flex-col items-start justify-between lg:flex-row lg:items-center">
            <div className="flex flex-col items-start lg:flex-row lg:items-center">
              <div className="my-6 ml-0 lg:my-0">
                <h1 className="mb-2 text-2xl font-bold">{course?.title}</h1>

                <p className="flex items-center text-xs text-gray-500 dark:text-gray-300">
                  {course?.description.substring(0, 100) + '...'}
                </p>
              </div>
            </div>
            <div>
              <Button>Iniciar projeto</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="item flex-grow">
            <DiscordCard />
          </div>
          <div className="item flex-grow">
            <WalletCard />
          </div>
        </div>
        <div className="container my-8">
          <Tabs course={course} />

          {course?.sections &&
            Object.keys(course?.sections).map((section) => {
              return (
                <div key={section}>
                  <span className="text-2xl font-bold">
                    {section.replaceAll('Section_', 'Sessão ')}
                  </span>
                  <ul className="flex flex-col mb-8">
                    {course?.sections[section].map((lesson) => {
                      return (
                        <li key={lesson} className="items-center">
                          <a href={`lessons/${lesson}`}>
                            <p className="m-0 p-0">
                              {lesson
                                .replaceAll('_', ' ')
                                .replaceAll('Lesson ', '')
                                .replaceAll('.md', '')}
                            </p>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const course = await getCourse(params.id)
  return {
    props: {
      course,
    },
  }
}

export async function getStaticPaths() {
  const paths = (await getAllCourses()).map((c) => `/courses/${c.id}`)
  return {
    paths,
    fallback: false,
  }
}

export default Course
