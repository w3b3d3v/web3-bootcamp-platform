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
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
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

          <div className="relative z-10 my-8 w-full rounded-lg bg-white-100 p-8 shadow-xl dark:bg-black-200">
            {course?.sections &&
              Object.keys(course?.sections).sort().map((section) => {
                return (
                  <div key={section}>
                    <span className="mb-4 font-bold">
                      {section?.replace('Section_', 'Sessão ')}
                    </span>
                    <ul className="mt-2 mb-8 flex flex-col">
                      {course?.sections[section].map((lesson) => {
                        return (
                          <li
                            key={lesson}
                            className="mb-2 items-center rounded bg-white-200 px-2 py-2 dark:bg-black-300"
                          >
                            <div className="flex items-center">
                              <div className="relative mr-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                <input
                                  disabled
                                  type="radio"
                                  name="radio"
                                  className="checkbox absolute h-full w-full appearance-none rounded-full border border-gray-400 checked:border-none focus:outline-none"
                                />
                                <div className="check-icon z-1 hidden h-full w-full rounded-full border-4 border-indigo-700" />
                              </div>
                              {/* <a href={`lessons/${lesson}`}> */}
                              <p className="m-0 p-0">
                                {lesson
                                  ?.replace('_', ' ')
                                  ?.replace('Lesson ', '')
                                  ?.replace('_', ' - ')
                                  ?.replaceAll('_', ' ')
                                  ?.replace('.md', '')}
                              </p>
                              {/* </a> */}
                            </div>
                          </li>
                        )
                      }).sort((a,b) => a-b)}
                    </ul>
                  </div>
                )
              })}
          </div>
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
