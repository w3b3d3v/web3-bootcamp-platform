import Head from 'next/head'
import React from 'react'
import HomeCards from '../../components/Home/Cards'
import Main from '../../components/Home/Inovadoras'
import Layout from '../../components/layout'

export default function Home() {
  const cards = [
    'Bootcamp 100% gratuito, sempre!',
    'Crie seu primeiro smart-contract na blockchain!',
    'Aprendizado baseado em projetos',
    'Ganhe um NFT para cada projeto finalizado',
    'Trabalhe como dev em projetos web3',
  ]

  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Home INOVADORAS - Bootcamp Web3Dev" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2Fsolidity_female.png?alt=media&token=ddbb1afd-5042-43a9-ba59-266c2c40476a"
        />
        <title>Home INOVADORAS - Bootcamp Web3Dev</title>
      </Head>
      <Main />
      <HomeCards cards={cards} />
    </Layout>
  )
}
