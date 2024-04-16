import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function discord() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('https://discord.com/channels/898706705779687435/923218912613634049')
    }
  }, [router, session])

  return (
    <div class="text-center">
      <h1>Já tenho tudo do usuário. Vou redirecionar para o discord</h1>
      {session && (
        <div>
          <p>Discord: {session.discord.username}!</p>
          <p>Email: {session.discord.email}!</p>
        </div>
      )}
    </div>
  )
}

discord.getInitialProps = () => {
  return {
    hideNavbar: true,
    hideFooter: true,
  }
}

export default discord
