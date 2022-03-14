import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../context/AuthContext'
import { SessionProvider } from 'next-auth/react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <SessionProvider session={pageProps.session}>
          <Head>
            <title>Web3Dev Bootcamp Plataform</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
