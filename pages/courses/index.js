import { useState } from 'react'
import { getAllCourses } from '../../lib/courses'
import { Container } from '@nextui-org/react'
import { CourseCard } from '../../components/Card/Course'
import { useTranslation } from 'react-i18next'
import SearchBar from '../../components/SearchBar'
import { useFilterState } from '../../hooks/useFilterState'
import SEOHead from '../../components/SEO'
import { buildBreadcrumbSchema } from '../../components/SEO/schemas'

const SITE_URL = 'https://build.w3d.community'

function Courses({ allCourses }) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const { filteredData } = useFilterState(allCourses, searchQuery)

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Courses', url: `${SITE_URL}/courses` },
  ])

  return (
    <>
      <SEOHead
        title="All Courses - Web3 Bootcamp"
        description="Browse all Web3DEV bootcamp courses. Learn smart contracts, NFTs, DeFi, and blockchain development with hands-on projects and NFT certificates."
        canonical="/courses"
        keywords={['web3 courses', 'blockchain courses', 'smart contract training', 'NFT development', 'DeFi courses', 'ethereum courses']}
        ogImage={`${SITE_URL}/og/og-courses.png`}
        ogImageAlt="WEB3DEV Bootcamp - All Courses"
        jsonLd={breadcrumbSchema}
      />

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
            placeholder={t('searchBuild')}
          />
          {filteredData.map((c) => {
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
