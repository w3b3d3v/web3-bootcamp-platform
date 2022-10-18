import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase'
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'

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
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              
                <p className="text-base font-medium text-black-200 dark:text-gray-100">
                  ❌ Você ainda não liberou a categoria exclusiva do bootcamp no <span className='text-blue-400 font-semibold'>discord</span>
                </p>
                
              
              <p className="pt-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
                <p className='dark:text-white-100 text-black-400'><strong><span className='text-orange-600 '>Aviso: </span>Você precisa estar conectado em nosso discord antes clicar em Liberar Salas, caso não esteja conectado  clique <a href='https://discord.com/invite/UXDUzG2hhE' alt='Link para conectar discord' className=''>  aqui</a>.</strong></p>
                Quando você tiver acesso,não deixe de interagir!
              </p>
              <div className="pt-4 flex gap-2 items-center">
                <Button ref={ref} id="connect-discord" onClick={() => signIn('discord')}>
                  Liberar Salas
                </Button>
                <Image src="/assets/img/discord_icon.svg" width="43" height="43"/>
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
                  ✅ {user?.discord?.username || session?.discord.username} Conectado
                </p>
                <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Explore as oportunidades na nossa comunidade,obrigado por ser um de nossos membros ❤️. 
                </p>
                <p className='dark:text-white-100 text-black-400 text-sm'>Não se esqueca que cada bootcamp que você está inscrito tem uma categoria para você interagir.</p>
              <div className="pt-4 flex gap-2 items-center">
                <Button onClick={() => signIn('discord')}>Reconectar</Button>
                <Image src="/assets/img/discord_icon.svg" width="43" height="43"/>
              </div>
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
