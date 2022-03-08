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
      <div className="lg container flex justify-center px-6 pt-6 sm:px-6 md:flex md:px-6 lg:px-32">
        <ul className="grid grid-flow-row grid-cols-3 gap-4 overflow-hidden">
          {allCourses.map((c) => {
            console.log('c', c)
            return (
              <>
                <Card
                  key={c?.id}
                  id={c?.id}
                  img={c?.image_url}
                  title={c?.title}
                  desc={c?.description}
                />
              </>
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
