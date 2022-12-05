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
      <main className="max-w-7xl mx-auto px-6 py-2 md:px-6 ">
        <div className="flex flex-col gap-6 pb-6 lg:flex-row">
          <div className="item flex-grow xl:max-w-7xl">
            <GeneralInfoCard />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-11 content-end">
          <div className="flex-1">
            <DiscordCard />
          </div>
          <div className="flex-1">
            <WalletCard />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default withProtected(Profile)
