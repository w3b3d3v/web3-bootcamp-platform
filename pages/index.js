import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()
  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <h1 className="title">
          <Link href="/courses">
            <a>Lista de Cursos</a>
          </Link>

          {user?.email}
        </h1>
      </main>

      <footer>
        <a
          href="https://www.web3dev.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito com ❤️ &nbsp;por{' '}
          <img src="/favicon.svg" alt="web3dev" className="logo" />
        </a>
      </footer>
    </Layout>
  )
}
