import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Button from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
      </Head>
      <main>Hey </main>
    </Layout>
  )
}
