import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Button } from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const ref = React.createRef();
  return (
    <Layout>
      <Head>
        <title>Home - Bootcamp Web3Dev</title>
      </Head>
      <main className="container flex flex-col md:flex-row mx-auto py-2 px-2 sm:px-6 md:px-6 lg:px-16 xl:px-32 my-24 sm:my-6 md:my-6 lg:my-16 xl:py-0 justify-between">
        <div className='flex justify-center md:w-1/2 items-center flex-col text-start'>
          <div>
            <div className='text-5xl font-bold'>
              Construa um <span className='lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400'>Web3 App</span> com
              <span className='lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500'> Solidity </span>
            </div>
            <p className='mt-8'>
              Um projeto de uma semana onde você irá aprender Solidity, escrever e implementar smart-contracts na blockchain e desenvolver um Web3 App para interagir com seu contrato. Perfeito para entusiastas em blockchain e desenvolvedores de Web3. 
           </p>
          </div>
          <br />
          <div className='flex justify-start w-full'>
            <a href="/courses/Solidity_And_Smart_Contracts">
              <Button id="wish-to-sign-in" ref={ref}>Quero me inscrever!</Button>
            </a>
          </div>
          <br />
        </div>
        <div
          className=' md:ml-28'
        >
          <Image
            width={400}
            height={230}
            src="/assets/img/smart-contract-01.jpg"
            className='rounded-3xl'
          />
        </div>
      </main>
      <footer>
        <div className='flex flex-col items-center lg:items-stretch text-sm lg:flex-row text-center justify-between container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0'>
          <div className='p-1 bg-gradient-to-br m-3 w-44 h-20 lg:h-32 from-green-400 to-teal-400 rounded-lg'>
            <div className='rounded-lg w-full h-full bg-slate-50 text-black  dark:bg-zinc-900 dark:text-slate-50 flex items-center text-center shadow-xl sm:p-1 md:p-3 lg:p-4'>
             Bootcamp 100% gratuito, sempre!
            </div>
          </div>
          <div className='p-1 bg-gradient-to-br w-44 h-20 lg:h-32 m-3 from-green-400 to-violet-500 rounded-lg'>
            <div className='rounded-lg w-full h-full bg-slate-50 text-black  dark:bg-zinc-900 dark:text-slate-50 flex items-center text-center shadow-xl sm:p-1 md:p-3 lg:p-4'>
             Desenvolva um Smart Contract em apenas 1 semana
            </div>
          </div>
          <div className='p-1 bg-gradient-to-br w-44 h-20 lg:h-32 m-3 from-violet-500 to-purple-500 rounded-lg'>
            <div className='rounded-lg w-full h-full bg-slate-50 text-black  dark:bg-zinc-900 dark:text-slate-50 flex items-center text-center shadow-xl sm:p-1 md:p-3 lg:p-4'>
             Aprendizado baseado em projetos
            </div>
          </div>
          <div className='p-1 bg-gradient-to-br w-44 h-20 lg:h-32 m-3 from-fuchsia-400 to-pink-500 rounded-lg'>
            <div className='rounded-lg w-full h-full bg-slate-50 text-black  dark:bg-zinc-900 dark:text-slate-50 flex items-center text-center shadow-xl sm:p-1 md:p-3 lg:p-4'>
             Ganhe um NFT para cada projeto finalizado
            </div>
          </div>
          <div className='p-1 bg-gradient-to-br w-44 h-20 lg:h-32 m-3 from-rose-400 to-orange-500 rounded-lg'>
            <div className='rounded-lg w-full h-full bg-slate-50 text-black  dark:bg-zinc-900 dark:text-slate-50 flex items-center text-center shadow-xl sm:p-1 md:p-3 lg:p-4'>
             Trabalhe como dev em projetos web3
            </div>
          </div>
        </div>
        <br />
      </footer>
    </Layout>
  )
}
