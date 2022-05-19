import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase'
import {
  getUserFromFirestore,
  updateUserDiscordIdinFirestore,
} from '../../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { toast } from 'react-toastify'

export default function ShareLinkCard({ course }) {
  const ref = React.createRef()
  const [user, setUser] = useState()
  const [referralLink, setReferralLink] = useState()
  const [shortenedUrl, setShortenedUrl] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUser(userSession)
        setReferralLink(
          `${window.location.href}/?utm_source=bootcamp&utm_medium=social&utm_campaign=${user.uid}`
        )
      }
    })
  }, [auth.currentUser])

  useEffect(() => {
    if (user && document && referralLink) {
      fetch(
        `https://api.shrtco.de/v2/shorten?${new URLSearchParams({
          url: referralLink,
        }).toString()}`
      )
        .then((response) => response.json())
        .then((response) => {
          setShortenedUrl(response.result.short_link)
        })
        .catch((err) => console.error(err))
    }
  }, [referralLink])

  const shareReferralLink = () => {
    navigator.clipboard.writeText(shortenedUrl)
    toast.success('Link copiado')
    return shortenedUrl
  }

  return (
    <>
      <div className="min-w-full rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
        <div className="flex min-w-full">
          <div className="flex min-w-full flex-col items-start justify-between px-6 py-5 lg:flex-row lg:items-center">
            <div className="flex-col">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
              &#x1F493; Aprenda com seus amigos!
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Divulgue seu link personalizado para seus amigos, assim eles
                entrarão na mesma turma que você.
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <Image
                src="/assets/img/twitter-logo.svg"
                width="40"
                height="40"
              />
              <a
                className="twitter-share-button text-black-100 dark:text-white-100"
                id={`share-twitter`}
                href={`https://twitter.com/intent/tweet?text=Novo curso 100%25 gratuito da Web3Dev sobre Smart Contracts, ainda vou ganhar um NFT no final, eu já me inscrevi, e você? ${shortenedUrl}`}
                target="_blank"
                data-size="large"
              >
                Compartilhar
              </a>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <Image
                src="/assets/img/LinkedIn_logo.svg"
                width="40"
                height="40"
              />
              <a
                id={`share-linkedin`}
                className="share-linkedin text-black-100 dark:text-white-100"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shortenedUrl}`}
                target="_blank"
                rel="noopener"
              >
                Compartilhar
              </a>
            </div>
            <div className="mt-4">
              <Button
                ref={ref}
                id={`copy-link`}
                onClick={() => shareReferralLink()}
              >
                Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
