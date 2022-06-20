import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const ref = React.createRef()
  return (
    <Layout>
      <Head>
        <title>Home - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto my-24 flex flex-col justify-between py-2 px-2 sm:my-6 sm:px-6 md:my-6 md:flex-row md:px-6 lg:my-24 lg:px-16 xl:px-32 xl:py-0">
        <div className="text-start flex flex-col items-center justify-center md:w-1/2">
          <div>
            <div className="text-5xl font-bold">
              Aprenda a criar sua própria
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
                Coleção NFT{' '}
              </span>
            </div>
            <p className="mt-8">
              Se você é um desenvolvedor curioso sobre NFTs, esse bootcamp é perfeito para você.
              Gere programaticamente sua própria coleção de NFT, escreva e implemente um contrato
              inteligente em Solidity e construa seu próprio React dApp para permitir que amigos
              conectem suas carteiras e interajam com seus NFTs.
            </p>
          </div>
          <br />
          <div className="flex w-full justify-start">
            <a href="/courses/NFT_Collection">
              <Button id="wish-to-sign-in" ref={ref}>
                Quero me inscrever!
              </Button>
            </a>
          </div>
          <br />
        </div>
        <div className=" md:ml-28">
          <Image
            width={400}
            height={400}
            src="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2FC%C3%B3pia%20de%203DEGENS0789.png?alt=media&token=f2648146-f722-4f08-9d50-03458ca8ab8b"
            className="rounded-3xl"
          />
        </div>
      </main>
      <footer>
        <div className="container mx-auto flex flex-col items-center justify-between px-6 py-2 text-center text-sm sm:px-6 md:px-6 lg:flex-row lg:items-stretch lg:px-32 xl:py-0">
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Bootcamp 100% gratuito, sempre!
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-green-400 to-violet-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Crie sua própria coleção NFT em 1 semana
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Aprendizado baseado em projetos
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-fuchsia-400 to-pink-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Ganhe um NFT para cada projeto finalizado
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Trabalhe como dev em projetos web3
            </div>
          </div>
        </div>
        <br />
      </footer>
    </Layout>
  )
}
