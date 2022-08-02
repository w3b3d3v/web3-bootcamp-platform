import React from 'react'
import { Button } from '../../Button'
import Cover from '../Inovadoras/Cover'

function Main() {
  const ref = React.createRef()
  return (
    <main className="container mx-auto my-24 flex flex-col justify-between py-2 px-2 sm:my-6 sm:px-6 md:my-6 md:flex-row md:px-6 lg:my-24 lg:px-16 xl:px-32 xl:py-0">
      <div className="flex flex-col items-center justify-center text-start md:w-1/2">
        <div>
          <div className="text-5xl font-bold">
            Construa um web dApp e seu primeiro
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              Smart Contract{' '}
            </span>
            em uma semana
          </div>
          <p className="mt-8">
            Uma turma exclusiva para mulheres, um projeto de nove dias onde você irá aprender
            Solidity, escrever e implementar smart-contracts na blockchain e desenvolver um Web3 App
            para interagir com seu contrato. Perfeito para entusiastas em blockchain e
            desenvolvedores de Web3.
          </p>
        </div>
        <br />
        <div className="flex w-full justify-start">
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
