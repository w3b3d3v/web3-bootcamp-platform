import { withProtected } from '../../hooks/route'
import GeneralInfoCard from '../../components/Card/GeneralInfo'
import SEOHead from '../../components/SEO'

function Profile() {
  return (
    <>
      <SEOHead
        title="My Profile"
        description="Track your progress in WEB3DEV bootcamp. View completed courses, earned NFT certificates, and join the Web3 developer community."
        canonical="/profile"
        noindex={true}
        ogImage="https://build.w3d.community/og/og-profile.png"
        ogImageAlt="My Profile - WEB3DEV Bootcamp"
      />
      <GeneralInfoCard />
    </>
  )
}

export default withProtected(Profile)
