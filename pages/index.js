import Head from 'next/head'
import React from 'react'
import HomeCards from '../components/Home/Cards'
import Main from '../components/Home'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home - Bootcamp Web3Dev</title>
      </Head>
      <Main />
      <HomeCards />
    </Layout>
  )
}
