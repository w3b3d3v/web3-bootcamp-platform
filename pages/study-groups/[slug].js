import { getStudyGroup } from '../../lib/course'
import { withProtected } from '../../hooks/route'
import { auth } from '../../firebase/initFirebase'
import { getUserFromFirestore, registerUserInStudyGroupInFirestore } from '../../lib/user'
import React, { useState, useEffect } from 'react'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import ShareLinkCard from '../../components/Card/ShareLink'
import NotFound from '../404'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/dateFormat'

function StudyGroup({ studyGroup }) {
  if (!studyGroup.active) return <NotFound />

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRegisteredInGroup, setUserRegisteredInGroup] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        setLoading(true)
        const userSession = await getUserFromFirestore(auth.currentUser)
        setUser(userSession)
        const isRegistered = !!userSession?.study_groups?.find(
          (userStudyGroup) => userStudyGroup.study_group_id == studyGroup.id
        )
        setUserRegisteredInGroup(isRegistered)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    fetchUser()
  }, [auth.currentUser])

  const registerUserToStudyGroup = async () => {
    setLoading(true)
    await registerUserInStudyGroupInFirestore(studyGroup.id, auth.currentUser.uid)
    setUserRegisteredInGroup(true)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={studyGroup.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://build.w3d.community/" />
        <meta property="og:description" content={studyGroup.description} />
        <meta property="og:image" content={studyGroup?.resized_img_url || studyGroup.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`${studyGroup.title} `} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        {/*Twitter Start*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://build.w3d.community/" />
        <meta property="twitter:title" content={studyGroup.title} />
        <meta property="twitter:description" content={studyGroup.description} />
        <meta property="twitter:image" content={studyGroup.image_url} />
        {/*Twitter End*/}

        <title>Study Group {studyGroup.title} - WEB3DEV</title>
      </Head>

      <div className="container-lessons mx-auto mt-0 max-w-7xl px-6 lg:mt-10">
        <div className="mb-8 flex flex-col justify-between lg:flex-row">
          <div className="max-w-3xl self-center lg:max-w-lg">
            <h1 className="text-2xl font-bold">{studyGroup?.title}</h1>

            <p className="mb-6  text-sm">
              {studyGroup?.description /*.substring(0, 100) + '...'*/}
            </p>
          </div>
          <div className="mx-auto h-full lg:mx-0">
            <Image
              src={studyGroup?.image_url}
              width="300px"
              height="300px"
              style={{ borderRadius: '10px' }}
            ></Image>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {!userRegisteredInGroup ? (
              <button
                id={`signup-study-group`}
                onClick={registerUserToStudyGroup}
                className="item flex w-full cursor-pointer justify-center rounded-lg bg-gradient-to-r from-green-400 to-violet-500 p-6"
              >
                Inscreva-se agora &#x1F31F;
              </button>
            ) : (
              <>
                <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
                  <div className="flex w-3/4 flex-col items-center justify-center">
                    <p className="mb-3 text-2xl">Evento ao vivo &#x1F31F;</p>
                    <p className="text-sm lg:text-base">
                      No lançamento de cada projeto, ocorrerá uma LIVE MASSA! Adicione no seu
                      calendário para não esquecer. Nos veremos lá!
                    </p>
                    <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center text-lg font-bold text-white-100 md:flex-col lg:justify-between lg:text-3xl">
                      <button
                        className="flex max-w-xs items-center rounded-lg border-black-400 bg-black-300 p-2"
                        type="button"
                      >
                        <img src="/assets/img/google-logo.svg" className="h-9 w-9" />
                        <a
                          href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${studyGroup?.scheduled_at}/}&text=Build Web3dev ${studyGroup?.title}`}
                          target="_blank"
                        >
                          <p className="text-sm font-bold text-white-100">
                            Adicionar ao calendário Google
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
                  <ShareLinkCard studyGroup={studyGroup.id} />
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
  const studyGroup = await getStudyGroup(params.slug)
  const currentDate = new Date().toISOString()
  return {
    props: {
      studyGroup,
      currentDate,
    },
  }
}

export default withProtected(StudyGroup)