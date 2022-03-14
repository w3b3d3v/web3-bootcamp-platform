import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllCourses } from '../../lib/courses'

import useAuth from '../../hooks/useAuth'

import { withProtected } from '../../hooks/route'
import Card from '../../components/Card'

function Courses({ allCourses }) {
  const { user } = useAuth()

  return (
    <Layout>
      <Head>
        <title>Lista de Cursos: </title>
      </Head>
      <div className="lg container mt-24 flex flex-col justify-center px-6 pb-12 sm:mt-20 sm:px-6 md:mt-20 md:flex md:px-6 lg:mt-6 lg:px-32">
        <h4 className="mb-6 text-2xl font-bold leading-tight text-black-300 dark:text-white-100">
          Cursos
        </h4>
        <ul className="grid grid-flow-row grid-cols-1 gap-8 overflow-hidden sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
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

export default withProtected(Courses)
