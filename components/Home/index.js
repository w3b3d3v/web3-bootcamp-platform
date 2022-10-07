import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="container mx-auto md:mt-24 my-24 flex flex-col justify-between py-2 px-2 sm:my-6 sm:px-6 md:my-6 md:flex-row md:px-6 lg:my-24 lg:px-16 xl:px-32 xl:py-0">
      <div className="flex flex-col items-center justify-center text-start md:w-1/2">
        <div>
          <div className="text-5xl font-bold">
            Crie seu primeiro
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              dApp Solana{' '}
            </span>
            com Rust
          </div>
          <p className="mt-8">
            Este é um projeto de muito aprendizado e diversão, de uma semana para desenvolvedores
            curiosos que querem hackear Solana. Você aprenderá um pouco de Rust, escreverá e
            implementará um programa Solana e conectará tudo a um aplicativo React web3 com o qual
            qualquer pessoa com uma carteira Solana poderá interagir!
          </p>
        </div>
        <br />
        <div className="flex w-full justify-start">
          <a href="/courses/Solana_And_Web3">
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
