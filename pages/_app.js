import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

import 'regenerator-runtime/runtime'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [80001, 4, 137, 1, 250, 43114, ]

  const connectors = {
    injected: {},
  }

  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ThirdwebWeb3Provider
          supportedChainIds={supportedChainIds}
          connectors={connectors}
        >
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
        </ThirdwebWeb3Provider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
