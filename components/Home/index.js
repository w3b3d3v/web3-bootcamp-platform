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
              Construa um App em{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
                Solana{' '}
              </span>
               com React e Rust
            </Text>
          </div>
          <div className='flex justify-center mb-7 text-justify'>
            <Cover />
          </div>
          <div className="max-w-2xl">
            <Text>
              Este é um projeto prático e intensivo de <strong>10 dias</strong> que oferece uma oportunidade única para desenvolvedores aprofundarem seus conhecimentos em <strong>Solana, Rust e React</strong>. Você aprenderá a criar um aplicativo na blockchain Solana usando Rust para desenvolver contratos inteligentes e React para construir a interface de usuário. Ao concluir o Build, você terá todas as habilidades necessárias para criar um aplicativo em Solana permitindo que usuários com uma carteira Solana interajam facilmente com sua plataforma.
            </Text>
            <Text>
              Você também terá a chance de se conectar com outros desenvolvedores em nossa comunidade exclusiva e aprimorar ainda mais suas habilidades em tecnologias emergentes. Junte-se a nós agora e comece a construir o futuro da web3!
            </Text>
          </div>
        </div>
        <br />
        <div className="lg:self-start m-auto mb-8 z-0">
          <a href="/courses/Solana_And_Web3">
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'} >Quero me inscrever!</Text>
            </Button>
          </a>
        </div>
      </div>
      
    </div>
  )
}
