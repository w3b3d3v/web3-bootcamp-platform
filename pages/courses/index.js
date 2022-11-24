import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllCourses } from '../../lib/courses'
import Card from '../../components/Card'

function Courses({ allCourses }) {
  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Lista de Bootcamps" />
        <title>Lista de Bootcamps - Bootcamp Web3Dev</title>
      </Head>
      <div className="max-w-7xl mx-auto py-2 px-6">
        <h4 className="mb-6 text-2xl font-bold text-black-300 dark:text-white-100">
          Cursos
        </h4>
        <ul className="grid grid-flow-row grid-cols-1 gap-8 overflow-hidden p-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
          {allCourses.map((c) => {
            return (
              <Card
                key={c?.id}
                active={c?.active}
                id={c?.id}
                img={c?.image_url}
                title={c?.title}
                desc={c?.description}
                difficulty={c?.difficulty}
                duration={c?.duration}
                tags={c.tags}
              />
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allCourses = await getAllCourses()
  return {
    props: {
      allCourses,
    },
  }
}

export default Courses
