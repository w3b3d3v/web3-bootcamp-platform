import Head from 'next/head'
import React from 'react'
import HomeCards from '../components/Home/Cards'
import Main from '../components/Home'
import { getHomeCourse, defaultCourse } from '../lib/course'

export default function Home({ course }) {
  const cards = [
    '100% gratuito, sempre!',
    'Desenvolva em JavaScript',
    'Aprendizado baseado em projetos',
    'Ganhe um NFT para cada projeto finalizado',
    'Trabalhe como dev em projetos web3',
  ]

  return (
    <>
      <Head>
        <title>Crie seu Primeiro Projeto WEB3</title>
        <meta property="og:title" content="Crie seu Primeiro Projeto WEB3" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://build.w3d.community/" />
        <meta
          property="og:description"
          content="Está em busca de conteúdo gratuito e em português para aprender a programar na web3? Aqui você encontrará uma comunidade grande e engajada, centenas de artigos, vídeos e todo o suporte necessário para evoluir. E como extra ainda ganhará certificações em NFT para compartilhar com os amigos. Venha conhecer e se inscreva já!"
        />
        <meta property="og:image" itemProp="image" content={course.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="WEB3DEV Logo" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://build.w3d.community/" />
        <meta property="twitter:title" content="WEB3DEV" />
        <meta
          property="twitter:description"
          content="Está em busca de conteúdo gratuito e em português para aprender a programar na web3? Aqui você encontrará uma comunidade grande e engajada, centenas de artigos, vídeos e todo o suporte necessário para evoluir. E como extra ainda ganhará certificações em NFT para compartilhar com os amigos. Venha conhecer e se inscreva já!"
        />
        <meta property="twitter:image" content={course.image_url} />

        {/* Twitter */}
      </Head>
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
