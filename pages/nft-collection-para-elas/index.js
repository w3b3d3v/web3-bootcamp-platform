import Head from 'next/head'
import React from 'react'
import HomeCards from '../../components/Home/Cards'
import Main from '../../components/Home/Inovadoras-nft-collection'
import Layout from '../../components/layout'

export default function Home() {
  const cards = [
    'Bootcamp 100% gratuito, sempre!',
    'Crie sua própria coleção NFT!',
    'Aprendizado baseado em projetos',
    'Ganhe um NFT para cada projeto finalizado',
    'Trabalhe como dev em projetos web3',
  ]

  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Home Turma Inovadoras - Bootcamp Web3dev" />
        <meta
          property="og:description"
          content="Aprenda um projeto real de web3 app em 10 dias. Programe e gere sua própria coleção de NFT, escreva e implemente um contrato inteligente em Solidity. Essa é uma oportunidade somente para mulheres entusiastas em tecnologia e, ao concluir o projeto você terá um NFT de certificação exclusivo da Turma Inovadoras."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2Fsolidity_female_bt_cover.png?alt=media&token=d6ffd6e5-06ce-48a6-872c-3410d40fb18e"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Nft collection para elas" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <title>Home Turma Inovadoras - Bootcamp Web3dev</title>
      </Head>
      <Main />
      <HomeCards cards={cards} />
    </Layout>
  )
}
