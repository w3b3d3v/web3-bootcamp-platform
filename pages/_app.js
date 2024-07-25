import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AuthProvider } from '../context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import 'regenerator-runtime/runtime'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import '../i18n'
import React, { useEffect } from 'react'
import { mixpanel } from '../lib/utils/mixpanel'
import Footer from '../components/Footer/index'
import '../lib/globals.js'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import NavbarComponent from '../components/Navbar/index'
import { useTranslation } from 'react-i18next'
import { SSRProvider } from '@react-aria/ssr'
import BoardBackground from '../components/Background/Board.jsx'

export const event = (event_name, props) => {
  mixpanel.track(event_name, props)
}

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [80001, 4, 137, 1, 250, 43114]

  const router = useRouter()

  const { i18n, t } = useTranslation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = new URLSearchParams(window.location.search).get('lang')
      if (lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [router.query.lang]) // Depend on router.query.lang to react to changes

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
  const cookieText =
    'Ao clicar em aceitar, você consente com o uso dos cookies que você proveu em nosso website, para fornecer uma melhor experiência de usuário.'

  const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {
        background: 'white',
      },
    },
  })
  const darkTheme = createTheme({
    type: 'dark',
  })
  return (
    <SSRProvider>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <AuthProvider>
            <ThirdwebProvider
              supportedChainIds={supportedChainIds}
              desiredChainId={ChainId.Mainnet}
              connectors={connectors}
            >
              <SessionProvider session={pageProps.session}>
                <Head>
                  <title>{t('createFirstProject')}</title>
                  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                  <link rel="icon" href="/assets/img/w3d-logo-symbol-ac.svg" />
                </Head>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    background: 'red',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                  }}
                >
                  <BoardBackground />
                </div>
                <div
                  style={{
                    zIndex: 100,
                    position: 'relative',
                  }}
                >
                  <NavbarComponent />
                  <Component {...pageProps} />
                  <Footer />
                  <ToastContainer />
                </div>
              </SessionProvider>
            </ThirdwebProvider>
          </AuthProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  )
}

export default MyApp