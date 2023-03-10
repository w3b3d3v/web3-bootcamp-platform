import Head from 'next/head'
import { useState } from 'react'
import { getAllCourses } from '../../lib/courses'
import { Container } from '@nextui-org/react'
import { CourseCard } from '../../components/Card/Course'
 
function Courses({ allCourses }) {

  const [showMore, setShowMore] = useState(false)

  return (
    <>
      <Head>
        <meta property="og:title" content="Listagem" />
        <title>Web3Dev</title>
      </Head>

      <Container
        css={{
          mt: 30,
          mb: 30,
        }}
      >
        <Container
          css={{
            display: 'flex',
            gap: '$10',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {allCourses.map((c) => {
            return (
              <>
                <CourseCard course={c} />
              </>
            )
          })}
        </Container>
      </Container>
    </>
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
