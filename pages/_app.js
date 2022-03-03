import '../styles/globals.css'
import Head from 'next/head'

import { AuthProvider } from '../context/AuthContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Web3Dev Bootcamp Plataform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  )
}

export default MyApp
