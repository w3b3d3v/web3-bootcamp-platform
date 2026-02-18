import { useState } from 'react'
import { getAllStudyGroups } from '../../lib/study-groups'
import { Container } from '@nextui-org/react'
import { StudyGroupCard } from '../../components/Card/StudyGroup'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import SEOHead from '../../components/SEO'
import { buildBreadcrumbSchema } from '../../components/SEO/schemas'

const SITE_URL = 'https://build.w3d.community'

function StudyGroups({ AllStudyGroups }) {
  const { t } = useTranslation()
  return (
    <>
      <SEOHead
        title="Study Groups - Web3 Bootcamp"
        description="Join WEB3DEV study groups to learn Web3 development collaboratively. Find weekly sessions on blockchain, smart contracts, NFTs, and DeFi. Free and open to all."
        canonical="/study-groups"
        keywords={['web3 study groups', 'blockchain learning', 'web3 community', 'smart contracts', 'NFT', 'DeFi']}
        ogImage={`${SITE_URL}/og/og-study-groups.png`}
        ogImageAlt="WEB3DEV Study Groups - Learn Web3 Together"
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Study Groups', url: `${SITE_URL}/study-groups` },
        ])}
      />

      <div className="container-lessons mx-auto mt-0 max-w-7xl px-6 lg:mt-10">
        <div className="mb-8 flex flex-col justify-between lg:flex-row">
          <div className="max-w-3xl self-center lg:max-w-lg">
            <h1 className="text-2xl font-bold">{t('studyGroup.title')}</h1>
            <p className="mb-6  text-sm">{t('studyGroup.description1')}</p>
            <p className="mb-6  text-sm">{t('studyGroup.description2')}</p>
          </div>
          <div className="mx-auto h-full lg:mx-0">
            <Image
              src={'/study_groups_resized.png'}
              width="300px"
              height="300px"
              style={{ borderRadius: '10px' }}
            ></Image>
          </div>
        </div>
      </div>

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
          {AllStudyGroups.map((g) => {
            return (
              <>
                <StudyGroupCard studyGroup={g} />
              </>
            )
          })}
        </Container>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const AllStudyGroups = await getAllStudyGroups()
  return {
    props: {
      AllStudyGroups,
    },
  }
}

export default StudyGroups
