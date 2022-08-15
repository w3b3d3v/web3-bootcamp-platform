import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="container mx-auto my-24 flex flex-col justify-between py-2 px-2 sm:my-6 sm:px-6 md:my-6 md:flex-row md:px-6 lg:my-24 lg:px-16 xl:px-32 xl:py-0">
      <div className="flex flex-col items-center justify-center text-start md:w-1/2">
        <div>
          <div className="text-5xl font-bold">
          Crie sua própria  
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
            coleção de NFT{' '}
            </span>
            na Flow
          </div>
          <p className="mt-8">
          Um projeto para desenvolvedores curiosos que desejam aprender mais sobre a união entre criptomoedas e jogos fazendo o seu próprio jogo web3. Você irá mintar seus próprios NFTs, fazer personagens jogáveis com os NFTs que você mintou e permitir que usuários ganhem suas próprias criptomoedas conforme eles jogam o seu jogo!
          </p>
        </div>
        <br />
        <div className="flex w-full justify-start">
          <a href="/courses/NFT_Game">
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
