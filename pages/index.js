import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

import { getDiscordUserSession } from '../lib/user'

export default function Home(session) {
  console.log('session', session)
  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
      </Head>
      <main>Hey</main>
    </Layout>
  )
}
