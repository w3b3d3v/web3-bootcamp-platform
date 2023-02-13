import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import GeneralInfoCard from '../../components/Card/GeneralInfo'

function Profile() {
  return (
    <>
      <Head>
        <title>Perfil -Web3Dev</title>
      </Head>
      <GeneralInfoCard />
    </>
  )
}

export default withProtected(Profile)
