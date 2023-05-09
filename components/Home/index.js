import React from 'react'
import { Text, Button } from '@nextui-org/react'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <div className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52 z-0">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
          <div className='max-w-lg m-auto' >
            <Text h1 auto className="text-center font-bold mb-4">
              Crie uma coleção de NFTs em{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
                Solana{' '}
              </span>
            </Text>
          </div>
          <div className='flex justify-center mb-7 text-justify'>
            <Cover />
          </div>
          <div className="max-w-2xl">
            <Text>
            Além de criar uma coleção de NFTs, você terá nesse projeto, um website para mintá-los.
Esse projeto é super acessível, tanto por ser em português e gratuito, quanto por ensinar passo a passo como funciona as NFTs na Solana. Desta forma, você pode usar uma Blockchain de alta perfomance, muito ágil e assim se destacar com um mega diferencial na web3.
            </Text>
            <br/>
            <Text>
             Com um projeto completo e funcional, você ao concluir vai compreender todo o processo de criação de uma coleção de NFTs e também desenvolver a parte de front end para apresentar seus NFTs, permitindo que quem conecte suas carteiras possam mintá-los. Os únicos pré-requisitos necessários para esse Build, são conhecimentos básicos de Terminal, JavaScript e Next.JS.
            </Text>
          </div>
        </div>
        <br />
        <div className="lg:self-start m-auto mb-8 z-0">
          <a href="/courses/Solana_NFTs">
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'} >Quero me inscrever!</Text>
            </Button>
          </a>
        </div>
      </div>
      
    </div>
  )
}
