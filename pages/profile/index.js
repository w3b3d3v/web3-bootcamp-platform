import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { withProtected } from '../../hooks/route'
import useAuth from '../../hooks/useAuth'

function Profile() {
  const { user } = useAuth()

  return (
    <Layout>
      <Head>
        <title>Perfil - Bootcamp Web3Dev</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        tamo no perfil parça
        <h1 className="title mt-10">{user?.email}</h1>
      </main>
    </Layout>
  )
}

export default withProtected(Profile)
