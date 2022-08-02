import Head from 'next/head'
import React from 'react'
import HomeCards from '../../components/Home/Cards'
import Main from '../../components/Home/Inovadoras'
import Layout from '../../components/layout'

export default function Home() {
  const cards = {
    cardOne: 'Bootcamp 100% gratuito, sempre!',
    cardTwo: 'Crie seu primeiro smart-contract na blockchain!',
    cardThree: 'Aprendizado baseado em projetos',
    cardFour: 'Ganhe um NFT para cada projeto finalizado',
    cardFive: 'Trabalhe como dev em projetos web3',
  }

  return (
    <Layout>
      <Head>
        <title>Home INOVADORAS - Bootcamp Web3Dev</title>
      </Head>
      <Main />
      <HomeCards cards={cards} />
    </Layout>
  )
}
