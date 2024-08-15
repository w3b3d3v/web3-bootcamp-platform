import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { auth, storage } from '../../../firebase/initFirebase'
import {
  findSocialLinks,
  getUserFromFirestore,
  updateUserInFirestore,
  updateUserProfilePicInFirestore,
} from '../../../lib/user'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '../../../lib/yup'
import PersonalData from './PersonalData'
import SocialData from './SocialData'
import ProfessionalData from './ProfessionalData'
import ProfileFooter from './ProfileFooter'
import { Container } from '@nextui-org/react'
import WalletCard from '../../Card/Wallet'
import DiscordCard from '../../Card/Discord'
import { useTranslation } from 'react-i18next'

export default function GeneralInfoCard() {
  const [user, setUser] = useState()
  const [file, setFile] = useState()
  const authO = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPersonalData, setShowPersonalData] = useState(true)
  const [showSocialData, setShowSocialData] = useState(false)
  const [showProfessionalData, setShowProfessionalData] = useState(false)
  const [filledPersonalData, setFilledPersonalData] = useState(false)
  const [filledSocialData, setFilledSocialData] = useState(false)
  const [filledProfessionalData, setFilledProfessionalData] = useState(false)
  const [country, setCountry] = useState(new Set(['Brazil']))
  const [zip, setZip] = useState()
  const { t } = useTranslation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'all',
    resolver: yupResolver(profileSchema),
  })

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUser(userSession)
        reset({
          name: userSession?.name,
          email: userSession?.email,
          bio: userSession?.bio,
          devExp: userSession?.devExp || null,
          blockchainExp: userSession?.blockchainExp || null,
          linkedin: findSocialLinks('linkedin', userSession)?.url,
          twitter: findSocialLinks('twitter', userSession)?.url,
          github: findSocialLinks('github', userSession)?.url,
          personalWebsite: findSocialLinks('personalWebsite', userSession)?.url,
        })
        setValue('builder', userSession?.builder)
        setValue(
          'technologies',
          userSession?.technologies?.map((obj) => {
            return { label: obj, value: obj }
          })
        )
      }
    })
  }, [])

  const updateUserProfilePic = async () => {
    setLoading(true)
    const storageRef = ref(storage, `users/${user.uid}/profilePic`)
    await uploadBytes(storageRef, file)
    await getDownloadURL(storageRef).then((url) => {
      updateUserProfilePicInFirestore(user.uid, url)
      authO.user.photoUrl = url
      setLoading(false)
    })
  }

  const updateUserProfileData = async (data) => {
    const userData = {
      name: data?.name ?? user?.name,
      email: data?.email ?? user?.email,
      bio: data?.bio ?? user?.bio,
      github: data?.github ?? findSocialLinks('github', user)?.url,
      twitter: data?.twitter ?? findSocialLinks('twitter', user)?.url,
      personalWebsite: data?.personalWebsite ?? findSocialLinks('personalWebsite', user)?.url,
      linkedIn: data?.linkedin ?? findSocialLinks('linkedin', user)?.url,
      devExp: data?.devExp ?? null,
      blockchainExp: data?.blockchainExp ?? null,
      technologies: data?.technologies?.map((obj) => obj.label) ?? user?.technologies,
      builder: data?.builder ?? user?.builder,
      country: country.values().next().value ?? user?.country,
      zip: zip ?? user?.zip,
    }
    console.log('userData: ', userData)
    await updateUserInFirestore(userData, user?.uid)
      .then(async () => {
        if (file) await updateUserProfilePic()
        toast.success(t('messages.data_updated_success'))
        //window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        toast.error(t('messages.error_updating_data'))
      })
  }

  const renderFormSteps = () => {
    const {
      name,
      email,
      bio,
      twitter,
      linkedin,
      github,
      personalWebsite,
      devExp,
      blockchainExp,
      technologies,
      builder,
      country,
      zip,
    } = watch()

    const personalData =
      name?.length > 0 &&
      email?.length > 0 &&
      bio?.length > 0 &&
      country?.length > 0 &&
      zip?.length >= 0

    const socialData =
      twitter?.length > 0 &&
      linkedin?.length > 0 &&
      github?.length > 0 &&
      personalWebsite?.length > 0

    const professionalData = devExp && blockchainExp && technologies?.length > 0 && builder?.length

    personalData ? setFilledPersonalData(true) : setFilledPersonalData(false)
    socialData ? setFilledSocialData(true) : setFilledSocialData(false)
    professionalData ? setFilledProfessionalData(true) : setFilledProfessionalData(false)
  }
  useEffect(() => renderFormSteps, [watch()])

  return (
    <Container data-testid="general-info-card">
      {/* <ProfileProgress
            filledPersonalData={filledPersonalData}
            filledSocialData={filledSocialData}
            filledProfessionalData={filledProfessionalData}
          /> */}
      <div className=" mt-14 ">
        <h1 className="text-center">👩‍🎤 {t('profile.generalInfo')}</h1>
        <form onSubmit={handleSubmit(async (data) => await updateUserProfileData(data))}>
          <div className="flex flex-col gap-10 ">
            <PersonalData
              Controller={Controller}
              control={control}
              errors={errors}
              user={user}
              file={file}
              country={country}
              setCountry={setCountry}
              setFile={setFile}
              zip={zip}
              setZip={setZip}
              loading={loading}
            />
            <div className="m-auto flex max-w-5xl flex-col content-end gap-11 lg:flex-row ">
              <div className="flex-1">
                <DiscordCard />
              </div>
              <div className="flex-1">
                <WalletCard />
              </div>
            </div>
            <SocialData Controller={Controller} control={control} errors={errors} user={user} />
            <h1 className="text-center" id="professionalData">
              Skills🛠
            </h1>
            <ProfessionalData
              Controller={Controller}
              control={control}
              errors={errors}
              register={register}
              getValues={getValues}
              setValue={setValue}
            />
          </div>
          <ProfileFooter
            showPersonalData={showPersonalData}
            showProfessionalData={showProfessionalData}
            setShowPersonalData={setShowPersonalData}
            setShowProfessionalData={setShowProfessionalData}
            setShowSocialData={setShowSocialData}
            showSocialData={showSocialData}
          />
        </form>
      </div>
    </Container>
  )
}
