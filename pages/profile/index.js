import Head from 'next/head'
import { withProtected } from '../../hooks/route'
import GeneralInfoCard from '../../components/Card/GeneralInfo'
import { useTranslation } from 'react-i18next'

function Profile() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('myProfile')} - WEB3DEV</title>
      </Head>
      <GeneralInfoCard />
    </>
  )
}

export default withProtected(Profile)
