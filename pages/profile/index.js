import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import useAuth from '../../hooks/useAuth'

export default function Profile() {
  const { user } = useAuth()

  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        tamo no perfil parça
        <h1 className="title mt-10">{user?.email}</h1>
      </main>
    </Layout>
  )
}
