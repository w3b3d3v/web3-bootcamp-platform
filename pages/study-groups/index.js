import Head from 'next/head'
import { useState } from 'react'
import { getAllStudyGroups } from '../../lib/study-groups'
import { Container } from '@nextui-org/react'
import { StudyGroupCard } from '../../components/Card/StudyGroup'
import Image from 'next/image'
 
function StudyGroups({ AllStudyGroups }) {
  const pageInfo = {
    title: 'List of All Study Groups',
    description:
      'Crie sua própria loja virtual na Web3 com Solana Pay Nesse desafio você irá construir uma loja para vender suas utilidades ou artes na blockchain, sem precisar usar Rust. A Solana é uma das redes blockchains mais completas do ecossistema e possui toda infraestrutura para você construir uma loja nesta rede e receber pagamentos em criptomoedas. Se você estava esperando uma oportunidade para empreender na web3, a hora é agora! Esse build vai conduzir você passo a passo na criação desta loja sem precisar conhecer Rust, usando apenas JavaScript, Next.js e conhecimentos básicos de programação.',
  }

  return (
    <>
      <Head>
        <meta property="og:title" content="Listagem" />
        <title>Lista de Builds - WEB3DEV</title>
      </Head>

      <div className="container-lessons mx-auto mt-0 max-w-7xl px-6 lg:mt-10">
        <div className="mb-8 flex flex-col justify-between lg:flex-row">
          <div className="max-w-3xl self-center lg:max-w-lg">
            <h1 className="text-2xl font-bold">{pageInfo?.title}</h1>
            <p className="mb-6  text-sm">{pageInfo?.description /*.substring(0, 100) + '...'*/}</p>
          </div>
          <div className="mx-auto h-full lg:mx-0">
            <Image
              src={"/study_groups_resized.png"}
              width="300px"
              height="300px"
              style={{borderRadius:'10px'}}
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
