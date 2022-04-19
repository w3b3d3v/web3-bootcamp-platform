import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '../../Button'
import { auth } from '../../../firebase/initFirebase';
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user';
import { onAuthStateChanged } from 'firebase/auth';

export default function DiscordCard() {
  const { data: session } = useSession()
  const [discordConnected, setDiscordConnected] = useState(false)

  useEffect(async() => {
    onAuthStateChanged(auth, (async user => {
      if (user){
        const userSession = await getUserFromFirestore(user)
        if (session?.discord && !userSession.discord && auth.currentUser?.uid) {
          await updateUserDiscordIdinFirestore(session.discord, auth.currentUser.uid)
          setDiscordConnected(true)
        }else if (userSession.discord) setDiscordConnected(true) 
      }else {
        console.log('user not logged')
      }
    }))
    }, [session])

    const disconnectDiscord = async () => {
      if (auth.currentUser) {
        const userSession = await getUserFromFirestore(auth.currentUser)
        if (userSession.discord) {
          signOut({redirect: false})
          updateUserDiscordIdinFirestore(null, auth.currentUser.uid)
          setDiscordConnected(false)
        }
      }
    }

  return (
    <>
      {!discordConnected && (
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
      {discordConnected && (
        <>
          <div className=" rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
            <div className="flex">
              <div className="px-6 py-5">
                <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                  ✅ {session?.discord?.username} Conectado
                </p>
                <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Estamos ansiosos para te conhecer, venha dar uma olhada!
                </p>
                {/*<div className="pt-4">
                <a className='cursor-pointer' onClick={() => disconnectDiscord()}>Desconectar</a>
                </div>*/}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
