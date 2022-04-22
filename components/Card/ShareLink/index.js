import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase';
import { getUserFromFirestore, updateUserDiscordIdinFirestore } from '../../../lib/user';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function ShareLinkCard({course}) {
  const ref = React.createRef();
  const [user, setUser] = useState();
  const [referralLink, setReferralLink] = useState();
  const [shortenedUrl, setShortenedUrl] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userSession = await getUserFromFirestore(user);
        setUser(userSession);
        setReferralLink(`https://web3-bootcamp-platform.vercel.app/courses/${course}/utm_medium=socialutm_content=${user.uid}&utm_source=bootcamp`)
      }
    })
  },[auth.currentUser]);

  useEffect(() => {
    if(user && document && referralLink) {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apikey: 'cd12d4c590a24e03bac92607a7e9cdf0'
        },
        body: JSON.stringify({
          destination: referralLink
        })
      };
      fetch('https://api.rebrandly.com/v1/links', options)
        .then(response => response.json())
        .then(response => {
          setShortenedUrl(response.shortUrl)
        })
        .catch(err => console.error(err));
    }
  }, [referralLink])
  const shareReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado');
    return referralLink;
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
           
            <div className="mt-4 flex flex-col items-center">
              <Image src='/assets/img/twitter-logo.png' width='20' height='20' />
              <a className="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=Novo curso 100% gratuito da Web3Dev sobre Smart Contracts, ainda vou ganhar um NFT no final, eu já me inscrevi,e você? ${shortenedUrl}`}
                target="_blank"
                data-size="large">
                Compartilhar no Twitter</a>
            </div>
            <div className="mt-4">
              <Button ref={ref} onClick={() => shareReferralLink()}>Copiar Link</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
