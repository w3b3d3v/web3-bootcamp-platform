import Head from 'next/head'
import React from 'react'
import HomeCards from '../../components/Home/Cards'
import Main from '../../components/Home/Inovadoras-nft-collection'

export default function Home() {
  const cards = [
    '100% gratuito, sempre!',
    'Crie sua própria coleção NFT!',
    'Aprendizado baseado em projetos',
    'Ganhe um NFT para cada projeto finalizado',
    'Trabalhe como dev em projetos web3',
  ]

  return (
    <>
      <Head>
        <meta property="og:title" content="Turma Inovadoras - WEB3DEV" />
        <meta
          property="og:description"
          content="Aprenda um projeto real de web3 app em 10 dias. Programe e gere sua própria coleção de NFT, escreva e implemente um contrato inteligente em Solidity. Essa é uma oportunidade somente para mulheres entusiastas em tecnologia e, ao concluir o projeto você terá um NFT de certificação exclusivo da Turma Inovadoras."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FNFT_COLLECTION_INOVADORAS_resized.png?alt=media&token=eee38080-39c0-4391-8d63-03daa2a8af57"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Nft collection para elas" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <title>Turma Inovadoras - WEB3DEV</title>
      </Head>
      <Main />
      <HomeCards cards={cards} />
    </>
  )
}
