import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto flex flex-col justify-between px-8 mt-0 lg:mt-16 md:flex-row mb-14">
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

          <p className="mt-6">Crie uma coleção de NFTs e um website para mintá-los.</p>

          <p>
            ​A Solana é uma das maiores blockchains do mundo e seu ecossistema de NFTs não fica pra
            trás. Com um programa completo e dinâmico, você vai aprender como criar uma coleção de
            NFTs e um website para seus amigos conectarem suas carteiras e mintá-los.
          </p>

          <p>
            Os únicos pré-requisitos necessários para esse Bootcamp, são conhecimentos básicos de
            Terminal, JavaScript e Next.JS
          </p>
        </div>
        <br />
        <div className="lg:self-start">
          <a href="/courses/Solana_NFTs">
            <Button id="wish-to-sign-in" ref={ref}>
              Quero me inscrever!
            </Button>
          </a>
        </div>
        <br />
      </div>
      <div className='lg:m-0 mx-auto'>
      <Cover />
      </div>
    </main>
  )
}
