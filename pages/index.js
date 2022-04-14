import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { useEffect } from 'react'
import Button from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
      </Head>
      <main className="container flex flex-col md:flex-row mx-auto py-2 px-6 sm:px-6 md:px-6 lg:px-32 my-6 sm:my-6 md:my-6 lg:my-32 xl:py-0 justify-between">
        <div className='flex justify-center md:w-1/3 items-center flex-col text-start'>
          <div>
            <div className='text-5xl font-bold'>
              Construa um <span className='lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400'>Web3 App</span> com
              <span className='lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500'> Solidity </span>
            </div>
            <p className='mt-8'>
              Um projeto de uma semana onde você irá aprender Solidity, escrever e implementar smart-contracts na blockchain e desenvolver um Web3 App para interagir com seu contrato. Perfeito para entusiastas em blockchain e desenvolvedores de Web3. 
            {/*A 2-week project where you'll learn some Solidity, write + deploy a smart contract to the blockchain, and build a Web3 client app to interact with your contract. Perfect for hackers curious about crypto.
              Se você é um desenvolvedor interessado em Web3, este é o seu lugar. Aqui você encontra cursos e aulas de Web3, ganha NFTs e possibilidades infinitas!
            */}</p>
          </div>
          <br />
          <div className='flex justify-start w-full'>
            <a href="/auth">
              <Button style="primary">Quero me inscrever!</Button>
            </a>
          </div>
          <br />
        </div>
        <div
          className=' md:ml-28'
        >
          <Image
            width={600}
            height={350}
            src="/assets/img/smart-contract-01.jpg"
            className='rounded-3xl'
          />
        </div>
      </main>
      
    </Layout>
  )
}
