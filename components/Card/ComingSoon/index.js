import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase';
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user';
import { onAuthStateChanged } from 'firebase/auth';

export default function ComingSoonCard() {
  const { data: session } = useSession()
  const ref = React.createRef();
  
  return (
    <>
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200 min-w-full">
          <div className="flex min-w-full">
            <div className="px-6 py-5 min-w-full items-center flex justify-between">
              <div className='flex-col'>
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
              🦄 Está chegando a hora!
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Estamos finalizando os últimos preparativos o evento. Volte para conferir em breve!
              </p>
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}
