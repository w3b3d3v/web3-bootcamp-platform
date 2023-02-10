// 404.js
import Link from 'next/link'
import { Button } from '../components/Button'
import React from 'react'

export default function NotFound() {
  const ref = React.createRef();
  return (
    <>
      <div className="mx-auto max-w-7xl flex flex-col justify-center px-6 ">
        <div className="w-full">
          <h1 className="text-3xl font-extrabold text-white-100 lg:text-4xl">
            Oops!
          </h1>
          <p className="mb-4 py-4 text-base text-white-100">
            A página que você procura não existe ou não foi encontrada!
          </p>
          <Link href="/">
            <Button ref={ref} >Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
