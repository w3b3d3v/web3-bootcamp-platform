import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase'
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'

export default function DiscordCard() {
  const { data: session } = useSession()
  const [discordConnected, setDiscordConnected] = useState(false)
  const [user, setUser] = useState()
  const ref = React.createRef()
  useEffect(async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUser(userSession)
        if (session && session.discord && auth.currentUser?.uid) {
          await updateUserDiscordIdinFirestore(session.discord, auth.currentUser.uid)
          setDiscordConnected(true)
        } else if (userSession?.discord) setDiscordConnected(true)
      }
    })
  }, [session])

  //const disconnectDiscord = async () => {
  //  if (auth.currentUser) {
  //    const userSession = await getUserFromFirestore(auth.currentUser)
  //    if (userSession?.discord) {
  //      signOut({redirect: false})
  //      updateUserDiscordIdinFirestore(null, auth.currentUser.uid)
  //      setDiscordConnected(false)
  //    }
  //  }
  //}

  return (
    <>
      {!discordConnected && (
        <div className="flex flex-col rounded-lg bg-white-100 shadow-xl dark:bg-black-200 px-6 py-5 text-center gap-y-6 h-52 justify-center ">
              <p className="text-base text-black-200 dark:text-gray-100 p-0 m-0">
                ❌ Conecte seu Discord
              </p>
              <p className="text-xs lg:text-base text-gray-500 dark:text-gray-400 p-0 m-0">
                Tenha acesso aos canais supersecretos 🤫
              </p>

                <Button 
                ref={ref} 
                id="connect-discord" 
                onClick={() => signIn('discord')}
                >
                  Conectar Discord
                </Button>
        </div>
      )}
      {discordConnected && (
        <>
          <div className="flex flex-col rounded-lg bg-white-100 shadow-xl dark:bg-black-200 px-6 py-5 text-center gap-y-6 h-52 justify-center">
                <p className="text-base text-black-200 dark:text-gray-100 p-0 m-0">
                  ✅ {user?.discord?.username || session?.discord.username} Conectado
                </p>
                <p className="text-xs lg:text-base text-gray-500 dark:text-gray-400 p-0 m-0">
                  Estamos ansiosos para te conhecer ! Não deixe de interagir, postar suas duvidas, e compartilhar o seu progresso.
                </p>
                
                  <Button 
                  onClick={() => signIn('discord')}
                  >
                    Reconectar Discord
                  </Button>
                {/*<div className="pt-4">
                <a className='cursor-pointer' onClick={() => disconnectDiscord()}>Desconectar</a>
                </div>*/}
              </div>
          
        </>
      )}
    </>
  )
}
