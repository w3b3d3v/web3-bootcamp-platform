import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
      </Head>
      <main></main>
    </Layout>
  )
}
