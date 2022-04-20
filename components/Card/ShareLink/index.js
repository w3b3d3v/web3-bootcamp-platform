import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase';
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user';
import { onAuthStateChanged } from 'firebase/auth';

export default function ShareLinkCard() {
  const ref = React.createRef();
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userSession = await getUserFromFirestore(user);
        setUser(userSession);
      }
    })
  },[auth.currentUser]);
  const shareReferralLink = () => {
    const referralLink = window.location.href+'?referralId'+user.uid;
    navigator.clipboard.writeText(referralLink);
  }
  
  return (
    <>
      <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200 min-w-full">
        <div className="flex min-w-full">
          <div className="px-6 py-5 flex-col items-start lg:flex-row min-w-full lg:items-center flex justify-between">
            <div className='flex-col'>
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                💜 Aprenda com seus amigos!
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Divulgue seu link personalizado para seus amigos, assim eles entrarão na mesma turma que você.
              </p>
            </div>
            <div className="mt-4">
              <Button ref={ref} onClick={() => shareReferralLink()}>Copiar Link</Button>
            </div>
            <div className="mt-4">
              <a className="twitter-share-button"
                href="https://twitter.com/intent/tweet?text=Hello%20world"
                data-size="large">
                Tweet</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
