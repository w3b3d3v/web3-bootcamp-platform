import React from 'react'
import { Button } from '../../Button'
import Cover from '../Inovadoras/Cover'

function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
          <h1 className='text-4xl font-bold text-center sm:text-start m-0'>
            Construa um web dApp e seu primeiro
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              Smart Contract{' '}
            </span>
            em uma semana
          </h1>
          <p className="mt-8 text-base">
            Um projeto de nove dias onde você irá aprender Solidity, escrever e implementar
            smart-contracts na blockchain Ethereum e desenvolver um Web3 App para interagir com seu
            contrato. Perfeito para mulheres inovadoras, entusiastas em blockchain e
            desenvolvedoras.
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
      <Cover />
    </main>
  )
}

export default Main
