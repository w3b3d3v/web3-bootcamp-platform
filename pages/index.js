import Head from 'next/head'
import React from 'react'
import HomeCards from '../components/Home/Cards'
import Main from '../components/Home'
import Layout from '../components/layout'

export default function Home() {
  const cards = [
    'Bootcamp 100% gratuito, sempre!',
    'Crie seu própio mini-jogo NFT de turnos',
    'Aprendizado baseado em projetos',
    'Ganhe um NFT para cada projeto finalizado',
    'Trabalhe como dev em projetos web3',
  ]

  return (
    <Layout>
      <Head>
        <title>Home - Bootcamp Web3Dev</title>
        <meta property="og:title" content="WEB3DEV Bootcamp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bootcamp.web3dev.com.br/" />
        <meta
          property="og:description"
          content="Cansou de procurar conteúdo sobre web3 confiável e em português? E se eu te disser que além de ter encontrado os melhores Bootcamps sobre o assunto, você pode se inscrever gratuitamente, ter suporte da comunidade e ainda ganhar um NFT de certificação. Aproveite esse achado, inscreva-se!"
        />
        <meta
          property="og:image"
          itemprop="image"
          content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/web3dev-logo.png?alt=media&token=6365a9fc-5d25-46be-be24-dd9bd0f324fc"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="WEB3DEV Logo" />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        {/* Twitter */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bootcamp.web3dev.com.br/" />
        <meta property="twitter:title" content="WEB3DEV Bootcamp" />
        <meta
          property="twitter:description"
          content="Cansou de procurar conteúdo sobre web3 confiável e em português? E se eu te disser que além de ter encontrado os melhores Bootcamps sobre o assunto, você pode se inscrever gratuitamente, ter suporte da comunidade e ainda ganhar um NFT de certificação. Aproveite esse achado, inscreva-se!"
        />
        <meta
          property="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/web3dev-logo.png?alt=media&token=6365a9fc-5d25-46be-be24-dd9bd0f324fc"
        />

        {/* Twitter */}
      </Head>
      <Main />
      <HomeCards cards={cards} />
    </Layout>
  )
}
