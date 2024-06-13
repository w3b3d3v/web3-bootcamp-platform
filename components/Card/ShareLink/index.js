import React, { useEffect, useState } from 'react'
import { Button } from '../../Button'
import { auth } from '../../../firebase/initFirebase'
import { getUserFromFirestore } from '../../../lib/user'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useTranslation } from "react-i18next"

export default function ShareLinkCard() {
  const ref = React.createRef()
  const [user, setUser] = useState()
  const [referralLink, setReferralLink] = useState()
  const [shortenedUrl, setShortenedUrl] = useState()
  const { t } = useTranslation()

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
    toast.success(t('linkCopiedToast'))
    return shortenedUrl
  }

  return (
    <>
      <div className="min-w-full rounded-lg">
        <div className="flex min-w-full">
          <div className="flex min-w-full flex-col items-center justify-between px-6 py-5 lg:flex-row lg:items-center">
            <div className="flex-col">
              <p className="text-base font-medium leading-none">
               {t('learnWithFriends')}
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {t('shareReferralMessage')}
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <Image src="/assets/img/twitter-logo.svg" width="40" height="40" />
              <a
                className="twitter-share-button"
                id={`share-twitter`}
                href={`https://twitter.com/intent/tweet?text=Novo curso 100%25 gratuito da WEB3DEV sobre Smart Contracts, ainda vou ganhar um NFT no final, eu já me inscrevi, e você? ${shortenedUrl}`}
                target="_blank"
                data-size="large"
              >
                {t('shareButton')}
              </a>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <Image src="/assets/img/LinkedIn_logo.svg" width="40" height="40" />
              <a
                id={`share-linkedin`}
                className="share-linkedin text-black-100 dark:text-white-100"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shortenedUrl}`}
                target="_blank"
                rel="noopener"
              >
                {t('shareButton')}
              </a>
            </div>
            <div className="mt-4">
              <Button ref={ref} id={`copy-link`} onClick={shareReferralLink}>
                {t('copyLinkButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
