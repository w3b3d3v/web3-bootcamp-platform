import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../context/AuthContext'
import { SessionProvider } from 'next-auth/react'
//import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import 'regenerator-runtime/runtime'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'react-cookienotice/dist/index.css'
import dynamic from 'next/dynamic'

const CookieNotice = dynamic(() => import('react-cookienotice'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [80001, 4, 137, 1, 250, 43114]

  const connectors = {
    injected: {},
  }
  const cookieText = 'Ao clicar em aceitar, você consente com o uso dos cookies que você proveu em nosso website, para fornecer uma melhor experiência de usuário.'
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ThirdwebProvider
          supportedChainIds={supportedChainIds}
          desiredChainId={ChainId.Mainnet}
          connectors={connectors}
        >
          <SessionProvider session={pageProps.session}>
            <Head>
              <title>Home - Bootcamp Web3Dev</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link rel="icon" href="/assets/img/w3d-logo-symbol-ac.svg" />
            </Head>
            <CookieNotice
            cookieName='web3dev-user-cookie' 
            descriptionLabel={cookieText}
            titleLabel='Consentimento de cookies'
            acceptButtonLabel='Aceitar'
            declineButtonLabel='Rejeitar'
            />
            <Component {...pageProps} />
            <ToastContainer />
          </SessionProvider>
        </ThirdwebProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
