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
        <div className="flex flex-col items-center justify-center text-start md:w-1/2">
          <div>
            <div className="text-5xl font-bold">
              Construa sua própria
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
                DAO com JavaScript{' '}
              </span>
              em uma semana
            </div>
            <p className="mt-8">
              DAOs estão dominando o mundo! Construa uma você mesmo para se divertir. Talvez seja
              uma DAO meme, para você e seus amigos. Talvez seja um DAO que visa corrigir a mudança
              climática. Você decide. Analisaremos coisas como cunhar uma NFT de associação,
              criar/lançar um token, tesouros públicos e governança usando um token!
            </p>
          </div>
          <br />
          <div className="flex w-full justify-start">
            <a href="/courses/JS_DAO">
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
            src="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2FJS_DAO.png?alt=media&token=5ffb03a3-e144-4ad6-a760-e1fb2328f953"
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
              Construa sua própria DAO com JavaScript em uma semana
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
