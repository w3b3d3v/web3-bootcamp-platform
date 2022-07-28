import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
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
            DAOs estão dominando o mundo! Construa uma você mesmo para se divertir. Talvez seja uma
            DAO meme, para você e seus amigos. Talvez seja um DAO que visa corrigir a mudança
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
      <Cover />
    </main>
  )
}
