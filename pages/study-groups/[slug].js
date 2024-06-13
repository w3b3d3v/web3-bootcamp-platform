import { getStudyGroup, getFieldContent } from '../../lib/course'
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
import { useTranslation } from 'react-i18next'
import RenderField from '../../components/RenderField'

function StudyGroup({ studyGroup }) {
  if (!studyGroup.active) return <NotFound />

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRegisteredInGroup, setUserRegisteredInGroup] = useState(false)
  const { t, i18n } = useTranslation()

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
        <meta property="og:title" content={getFieldContent(studyGroup, 'title', i18n)} />
        <meta
          property="og:description"
          content={getFieldContent(studyGroup, 'description', i18n)}
        />{' '}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://build.w3d.community/" />
        <meta property="og:image" content={studyGroup?.resized_img_url || studyGroup.image_url} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getFieldContent(studyGroup, 'title', i18n)} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        {/*Twitter Start*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://build.w3d.community/" />
        <meta property="twitter:title" content={getFieldContent(studyGroup, 'title', i18n)} />
        <meta
          property="twitter:description"
          content={getFieldContent(studyGroup, 'description', i18n)}
        />
        <meta property="twitter:image" content={studyGroup.image_url} />
        {/*Twitter End*/}
        <title>Study Group {getFieldContent(studyGroup, 'title', i18n)} - WEB3DEV</title>
      </Head>

      <div className="container-lessons mx-auto mt-0 max-w-7xl px-6 lg:mt-10">
        <div className="mb-8 flex flex-col justify-between lg:flex-row">
          <div className="max-w-3xl self-center lg:max-w-lg">
            <h1 className="text-2xl font-bold">
              <RenderField object={studyGroup} field="title" /> <br />
            </h1>

            <p className="mb-6  text-sm">
              <RenderField object={studyGroup} field="description" isHtml={true} /> <br />
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
                {t('signUpNow')} &#x1F31F;
              </button>
            ) : (
              <>
                <div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-cyan-900 to-teal-500 p-2 lg:items-center lg:p-6">
                  <div className="flex w-3/4 flex-col items-center justify-center">
                    <p className="text-sm lg:text-base">{t('studyGroup.addToCalendar')} </p>
                    <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center text-lg font-bold text-white-100 md:flex-col lg:justify-between lg:text-3xl">
                      <button
                        className="flex max-w-xs items-center rounded-lg border-black-400 bg-black-300 p-2"
                        type="button"
                      >
                        <img src="/assets/img/google-logo.svg" className="h-9 w-9" />
                        <a
                          href={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${
                            studyGroup?.scheduled_at
                          }&text=Build Web3dev ${getFieldContent(
                            studyGroup,
                            'title',
                            i18n
                          )}&details=${getFieldContent(
                            studyGroup,
                            'description',
                            i18n
                          )}&sf=true&output=xml&recur=RRULE:FREQ%3DWEEKLY&location=${encodeURIComponent(
                            'https://discord.gg/web3dev'
                          )}`}
                          target="_blank"
                        >
                          <p className="text-sm font-bold text-white-100">
                            {t('addToGoogleCalendar')}
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
                  {/* <ShareLinkCard studyGroup={studyGroup.id} /> */}
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
