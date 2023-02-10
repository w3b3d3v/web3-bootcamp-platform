import Head from 'next/head'
import { getAllCourses } from '../../lib/courses'
import Card from '../../components/Card'

function Courses({ allCourses }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Listagem" />
        <title>Web3Dev</title>
      </Head>
      <div className="max-w-7xl mx-auto py-2 px-6">
        <section className="grid grid-flow-row md:grid-cols-3 gap-8 overflow-hidden p-2 grid-cols-1">
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
        </section>
      </div>
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
