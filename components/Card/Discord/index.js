import React, { useEffect } from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '../../Button'
import { auth } from '../../../firebase/initFirebase';
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user';

export default function DiscordCard() {
  const { data: session } = useSession()
  useEffect(async() => {
    if (auth.currentUser){
      const user = await getUserFromFirestore(auth.currentUser)
      if (user && !user.discord) {
        await updateUserDiscordIdinFirestore(session.discord, auth.currentUser.uid)
      }
    }
    }, [auth.currentUser])
  return (
    <>
      {!session && (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ❌ Conecte seu Discord
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Tenha acesso aos canais supersecretos para em nosso grupo.
                Quando você tiver acesso, não deixe de dizer olá!
              </p>
              <div className="pt-4">
                <Button onClick={() => signIn('discord')}>Conectar Discord</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {session && (
        <>
          <div className="max-w-sm rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
            <div className="flex">
              <div className="px-6 py-5">
                <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                  ✅ Discord Conectado
                </p>
                <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Tenha acesso aos canais supersecretos para em nosso grupo.
                  Quando você tiver acesso, não deixe de dizer olá!
                </p>
                <div className="pt-4">
                  <Button onClick={() => signOut({redirect: false})}>Desconectar Discord</Button>
                </div>
              </div>
            </div>
          </div>
          {/*Discord logado como {session.user.name}{' '}
          <Button onClick={() => signOut()}>Sair</Button>*/}
        </>
      )}
    </>
  )
}
