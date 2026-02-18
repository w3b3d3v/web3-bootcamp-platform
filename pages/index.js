import React from 'react'
import HomeCards from '../components/Home/Cards'
import Main from '../components/Home'
import { getHomeCourse, defaultCourse } from '../lib/course'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/SEO'
import { buildOrganizationSchema } from '../components/SEO/schemas'

export default function Home({ course }) {
  const { t } = useTranslation()

  const cards = [
    t('home.cards.0'),
    t('home.cards.1'),
    t('home.cards.2'),
    t('home.cards.3'),
    t('home.cards.4'),
  ]

  return (
    <>
      <SEOHead
        title="Web3 Bootcamp - Learn Blockchain Development | WEB3DEV"
        description="Join WEB3DEV bootcamp to learn blockchain, smart contracts, and Web3 technologies. Free courses in Portuguese with NFT certificates. Start your Web3 journey today!"
        canonical="/"
        keywords={['web3', 'blockchain', 'bootcamp', 'smart contracts', 'NFT', 'Solidity', 'DeFi', 'curso blockchain', 'web3 gratis', 'ethereum']}
        ogImage={course.image_url || 'https://build.w3d.community/og/og-home.png'}
        ogImageAlt="WEB3DEV Bootcamp - Free Web3 and Blockchain Courses"
        jsonLd={buildOrganizationSchema()}
      />
      <Main course={course} />
      <HomeCards cards={cards} />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      course: await getHomeCourse(),
    },
  }
}
