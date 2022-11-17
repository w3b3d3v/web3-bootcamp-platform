import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="container mx-auto my-24 flex flex-col justify-between py-2 px-2 sm:my-6 sm:px-6 md:my-6 md:mt-24 md:flex-row md:px-6 lg:my-24 lg:px-16 xl:px-32 xl:py-0">
      <div className="flex flex-col items-center justify-center text-start md:w-1/2">
        <div>
          <div className="text-5xl font-bold">
            Crie uma coleção
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              NFT{' '}
            </span>
            em Solana
          </div>

          <p className="mt-8">Crie uma coleção de NFTs e um website para mintá-los.</p>

          <p className="mt-8">
            ​A Solana é uma das maiores blockchains do mundo e seu ecossistema de NFTs não fica pra
            trás. Com um programa completo e dinâmico, você vai aprender como criar uma coleção de
            NFTs e um website para seus amigos conectarem suas carteiras e mintá-los.
          </p>

          <p className="mt-8">
            Os únicos pré-requisitos necessários para esse Bootcamp, são conhecimentos básicos de
            Terminal, JavaScript e Next.JS
          </p>
        </div>
        <br />
        <div className="flex w-full justify-start">
          <a href="/courses/Solana_NFTs">
            <Button id="wish-to-sign-in" ref={ref}>
              Quero me inscrever!
            </Button>
          </a>
        </div>
        <br />
      </div>
      <Cover />
    </main>
  )
}
