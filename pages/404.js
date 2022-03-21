// 404.js
import Link from 'next/link'
import Button from '../components/Button'
import Layout from '../components/layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="lg container mt-24 flex flex-col justify-center px-6 pb-12 sm:mt-20 sm:px-6 md:mt-20 md:flex md:px-6 lg:mt-6 lg:px-32">
        <div className="w-full">
          <h1 className="py-4 text-3xl font-extrabold text-white-100 lg:text-4xl">
            Oops!
          </h1>
          <p className="mb-4 py-4 text-base text-white-100">
            A página que você procura não existe ou não foi encontrada!
          </p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
