import Head from 'next/head'

import Layout from '../../components/layout'
import { withProtected } from '../../hooks/route'
import GeneralInfoCard from '../../components/Card/GeneralInfo'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'

function Profile() {

  return (
    <Layout>
      <Head>
        <title>Perfil - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className="flex flex-col gap-6 pb-6 lg:flex-row">
          <div className="item flex-grow">
            <GeneralInfoCard />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="item flex-grow">
            <DiscordCard />
          </div>
          <div className="item flex-grow">
            <WalletCard />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default withProtected(Profile)
