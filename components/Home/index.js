import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
        
            <h1 className='text-4xl font-bold text-center sm:text-start m-0'>
              Crie uma loja online pela rede blockchain
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
                Solana{' '}
              </span>
            </h1>
        
          <p>
          Crie sua própria loja online na Web3 com <strong>Solana Pay</strong>,você irá construir uma loja para vender seu produto com upload direto no IPFS. 
          </p>

          <p>
          A Solana é uma das principais redes blockchains do ecossistema e possui toda infraestrutura, além de ser muito rápida para construir uma loja e receber pagamentos em criptomoedas. 
          </p>

          <p>
          Se você estava esperando uma oportunidade para empreender na web3, a hora é agora! Vamos conduzir você passo a passo na criação desta loja.
          </p>

          <p>
            Os únicos pré-requisitos necessários são conhecimentos básicos de
            Terminal, JavaScript e Next.JS
          </p>
        </div>
        <br />
        <div className="lg:self-start mb-8">
          <a href="/courses/Solana_Pay_Store">
            <Button id="wish-to-sign-in" ref={ref}>
              Quero me inscrever!
            </Button>
          </a>
        </div>
      </div>
      <div className='lg:m-0 mx-auto'>
      <Cover />
      </div>
    </main>
  )
}
