import Head from 'next/head'
import React from 'react'
import HomeCards from '../components/Home/Cards'
import Main from '../components/Home'
import { getHomeCourse, defaultCourse } from '../lib/course'
import { useTranslation } from 'react-i18next'

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
      <Head>
        <title>{t('createFirstProject')}</title>
        <meta property="og:title" content={t('createFirstProject')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://build.w3d.community/" />
        <meta property="og:description" content={t('home.description')} />
        <meta property="og:image" itemProp="image" content={course.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="WEB3DEV Logo" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://build.w3d.community/" />
        <meta property="twitter:title" content="WEB3DEV" />
        <meta property="twitter:description" content={t('home.description')} />
        <meta property="twitter:image" content={course.image_url} />

        {/* Twitter */}
      </Head>
      <Main course={course} />
      <HomeCards cards={cards} />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      course: await getHomeCourse(),
    },
    revalidate: 3600,
  }
}
