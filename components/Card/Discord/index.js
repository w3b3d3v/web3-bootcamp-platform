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
            <div>
                <p className="text-base font-medium text-black-200 dark:text-gray-100">
                  ❌ Atenção ! Você ainda não liberou o acesso a sua turma no discord
                </p>
            </div> 
              
              <p className="mt-5 leading-5 text-gray-500 dark:text-gray-400">
                <p className='text-base text-amber-400 text-bold font-semibold mb-4'>Siga o passo a passo:</p>
                <ol className='text-base dark:text-white-100 '>
                  <li>Conecte-se ao discord da web3dev, clicando <a href="https://discord.com/invite/UXDUzG2hhE" className='uppercase'>aqui</a>.</li>
                  <li>Clique em conectar discord no botão abaixo.</li>
                </ol>
                <p>Você ira desbloquear uma categoria exclusiva dentro do discord da web3dev onde podera interagir, tirar suas dúvidas, e postar seu progresso, não deixe se de conectar.</p>
              </p>
                
                <Button ref={ref} id="connect-discord" onClick={() => signIn('discord')}>
                  Conectar discord
                </Button>
               
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
                  Não deixe de interagir com seus colegas de bootcamp, postar seu progresso,e tirar suas dúvidas.
                </p>
                <p className='dark:text-white-100 text-black-400 text-sm'>Não se esqueca que cada bootcamp que você está inscrito tem uma categoria exclusiva para você interagir.</p>
               
                <Button onClick={() => signIn('discord')}>Reconectar</Button>
        
              
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
