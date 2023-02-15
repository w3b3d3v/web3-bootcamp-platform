import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import 'regenerator-runtime/runtime'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'react-cookienotice/dist/index.css'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router"
import React, { useEffect } from "react"

import { mixpanel } from '../lib/utils/mixpanel'

import Navbar from '../components/Navbar/index'
import Footer from '../components/Footer/index'

export const event = (event_name, props) => {
  mixpanel.track(event_name, props)
}


const CookieNotice = dynamic(() => import('react-cookienotice'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [80001, 4, 137, 1, 250, 43114]

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      event('Page view', { url })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  const connectors = {
    injected: {},
  }
  const cookieText = 'Ao clicar em aceitar, você consente com o uso dos cookies que você proveu em nosso website, para fornecer uma melhor experiência de usuário.'
  return (
      <AuthProvider>
        <ThirdwebProvider
          supportedChainIds={supportedChainIds}
          desiredChainId={ChainId.Mainnet}
          connectors={connectors}
        >
          <SessionProvider session={pageProps.session}>
            <Head>
              <title>Home - Web3Dev</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link rel="icon" href="/assets/img/w3d-logo-symbol-ac.svg" />
            </Head>
            <Navbar />
            <CookieNotice
            cookieName='web3dev-user-cookie' 
            descriptionLabel={cookieText}
            titleLabel='Consentimento de cookies'
            acceptButtonLabel='Aceitar'
            declineButtonLabel='Rejeitar'
            />
            <Component {...pageProps} />
            <Footer />
            <ToastContainer />
          </SessionProvider>
        </ThirdwebProvider>
      </AuthProvider>
  )
}

export default MyApp
