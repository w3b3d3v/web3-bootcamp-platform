import Head from 'next/head'
import { useState } from 'react'
import { getAllCourses } from '../../lib/courses'
import { Container } from '@nextui-org/react'
import { CourseCard } from '../../components/Card/Course'
import { useTranslation } from 'react-i18next'
import SearchBar from '../../components/SearchBar'
import { useFilterState } from '../../components/Filter/utils'

function Courses({ allCourses }) {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { filteredCourses } = useFilterState(allCourses, searchQuery, 'course')

  return (
    <>
      <Head>
        <meta property="og:title" content="Listagem" />
        <title>{t('pageTitle')} - WEB3DEV</title>
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by title"
          />
          {filteredCourses.map((c) => {
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
