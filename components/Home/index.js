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
              Desenvolva um Smart Contract em 
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
                Solidity{' '}
              </span>
            </h1>
          <p>
          Aprenda desenvolver um Smart Contract usando Solidity e conheça mais sobre desenvolvimente na blockchain da <em>Ethereum</em>. Um projeto criado para pessoas que buscam ingressar no mercado da Web3.
          </p>
        </div>
        <br />
        <div className="lg:self-start mb-8">
          <a href="/courses/Solidity_And_Smart_Contracts">
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
