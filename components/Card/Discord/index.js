import React from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '../../Button'

export default function DiscordCard() {
  const { session, loading } = useSession()

  return (
    <>
      <h1>discord</h1>
      {!session && (
        <>
          Discord desconectado
          <Button onClick={() => signIn()}>Entrar</Button>
        </>
      )}
      {session && (
        <>
          Discord logado como {session.user.name}{' '}
          <Button onClick={() => signOut()}>Sair</Button>
        </>
      )}
    </>
  )
}
