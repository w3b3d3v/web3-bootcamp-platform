import React from 'react'
import { Button } from '../Button'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
           <h1 className="m-0 text-center text-4xl font-bold sm:text-start">
            Contrua um Dapp de{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
              Dao{' '}
            </span>
             com sistema de votações usando Javascript
          </h1>
          <p>
           Este projeto é uma maneira rápida e prática pra você aprender como criar um Dapp de uma DAO com um Front End em React.js, e o mais legal é que está 100% ensinado em português.
          </p>
          <p>Tudo isso usando apenas Javascript, fazendo deploy no final com ajuda de um passo a passo bem simples.</p>
          <p>Não fique de fora deste novo modelo descentralizado das novas organizações WEB3.</p>
          <p>
            <strong>O mais íncrivel :</strong> Seus amigos e colegas podem testar seu app após o deploy ser feito 😊
            Além de poder crescer seu portfólio em WEB3.
          </p>
        </div>
        <br />
        <div className="lg:self-start mb-8">
          <a href="/courses/JS_DAO">
            <Button id="wish-to-sign-in" ref={ref}>
              Quero me inscrever!
            </Button>
          </a>
        </div>
      </div>
      <div className='lg:m-0 mx-auto'>
      <Cover />
      </div>
    </main>
  )
}
