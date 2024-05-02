import { getCourse } from '../../lib/course'
import { withProtected } from '../../hooks/route'
import { auth } from '../../firebase/initFirebase'
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../lib/user'
import { CalendarIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react'
import Tabs from '../../components/Tabs'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import ShareLinkCard from '../../components/Card/ShareLink'
import NotFound from '../404'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Loading from '../../components/Loading'
import {dateFormat} from '../../lib/dateFormat'

function Group({ group }) {
  if (!group.active) return <NotFound />

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const [userRegisteredInGroup, setUserRegisteredInGroup] = useState(false);

  const addUserToStudyGroup = async () => {
    // await registerUserInCohortInFirestore(cohort.id, auth.currentUser.uid)
    setUserRegisteredInGroup(true)
  }

  const checkUserRegistration = () => {
    return userRegisteredInGroup
  }

  useEffect(async () => {
    if (auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser)
      setUser(userSession)
    }
  }, [auth.currentUser])

  return (
    <>
      <Head>
        <meta property="og:title" content={group.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://build.w3d.community/" />
        <meta property="og:description" content={group.description} />
        <meta property="og:image" content={group?.resized_img_url || group.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`${group.title} `} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        {/*Twitter Start*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://build.w3d.community/" />
        <meta property="twitter:title" content={group.title} />
        <meta property="twitter:description" content={group.description} />
        <meta property="twitter:image" content={group.image_url} />
        {/*Twitter End*/}

        <title>Group {group.title} - WEB3DEV</title>
      </Head>

      <div className="container-lessons mx-auto mt-0 max-w-7xl px-6 lg:mt-10">
        <div className="mb-8 flex flex-col justify-between lg:flex-row">
          <div className="max-w-3xl self-center lg:max-w-lg">
            <h1 className="text-2xl font-bold">{group?.title}</h1>

            <p className="mb-6  text-sm">{group?.description /*.substring(0, 100) + '...'*/}</p>
          </div>
          <div className="mx-auto h-full lg:mx-0">
            <Image
              src={group?.image_url}
              width="300px"
              height="300px"
              style={{borderRadius:'10px'}}
            ></Image>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {!checkUserRegistration() ? (
              <>
                <button
                  id={`signup-cohort`}
                  onClick={() => addUserToStudyGroup()}
                  className="item flex w-full cursor-pointer justify-center rounded-lg bg-gradient-to-r from-green-400 to-violet-500 p-6"
                >
                  Inscreva-se agora &#x1F31F;
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6 ">
                  <div className="flex w-3/4 flex-col items-center justify-center">
                    <p className="mb-3 text-2xl">Evento ao vivo &#x1F31F;</p>
                    <p className="text-sm lg:text-base">
                      No lançamento de cada projeto, ocorrerá uma LIVE MASSA! Adicione no seu calendário para não esquecer. Nos veremos lá!
                    </p>
                    <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center text-lg font-bold text-white-100 md:flex-col lg:justify-between lg:text-3xl">
                      <button
                        className="flex max-w-xs items-center rounded-lg border-black-400 bg-black-300 p-2"
                        type="button"
                      >
                        <img src="/assets/img/google-logo.svg" className="h-9 w-9" />
                        <a
                          href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${group?.scheduled_at}/}&text=Bootcamp Web3dev ${group?.title}`}
                          target="_blank"
                        >
                          <p className="text-sm font-bold text-white-100">
                            Adicionar ao calendário Google{' '}
                          </p>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-11 lg:flex-row">
                  <div className="flex-1">
                    <DiscordCard />
                  </div>
                  <div className="flex-1">
                    <WalletCard />
                  </div>
                </div>
                <div className="flex pt-6">
                  <ShareLinkCard group={group.id} />
                </div>
                <br />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const group = await getCourse("group", params.slug)
  const currentDate = new Date().toISOString()
  return {
    props: {
      group,
      currentDate,
    },
  }
}

export default withProtected(Group)
