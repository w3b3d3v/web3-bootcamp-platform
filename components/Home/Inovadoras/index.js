import React from 'react'
import { Button } from '../../Button'
import Cover from '../Inovadoras/Cover'

function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto flex flex-col justify-between px-8 mt-4 lg:mt-16 md:flex-row mb-14">
      <div className="flex flex-col items-center justify-center text-start md:w-1/2">
        <div>
          <div className="text-2xl lg:text-5xl font-bold">
            Construa um web dApp e seu primeiro
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              Smart Contract{' '}
            </span>
            em uma semana
          </div>
          <p className="mt-8 text-base">
            Um projeto de nove dias onde você irá aprender Solidity, escrever e implementar
            smart-contracts na blockchain Ethereum e desenvolver um Web3 App para interagir com seu
            contrato. Perfeito para mulheres inovadoras, entusiastas em blockchain e
            desenvolvedoras.
          </p>
        </div>
        <br />
        <div className="lg:self-start">
          <a href="/courses/Solidity_And_Smart_Contracts">
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

export default Main
