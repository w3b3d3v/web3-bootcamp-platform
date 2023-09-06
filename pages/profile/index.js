import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import GeneralInfoCard from '../../components/Card/GeneralInfo'

function Profile() {
  return (
    <>
      <Head>
        <title>Seu Perfil - WEB3DEV</title>
      </Head>
      <GeneralInfoCard />
    </>
  )
}

export default withProtected(Profile)
