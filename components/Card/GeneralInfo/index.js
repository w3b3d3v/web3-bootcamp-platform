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
import ProfileProgress from './ProfileProgress'
import PersonalData from './PersonalData'
import SocialData from './SocialData'
import ProfessionalData from './ProfessionalData'
import ProfileFooter from './ProfileFooter'

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
    }
    await updateUserInFirestore(userData, user.uid)
      .then(async () => {
        if (file) await updateUserProfilePic()
        toast.success('Dados atualizados com sucesso!')
        //window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Erro ao atualizar dados')
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
    } = watch()

    const personalData = name?.length > 0 && email?.length > 0 && bio?.length > 0

    const socialData =
      twitter?.length > 0 &&
      linkedin?.length > 0 &&
      github?.length > 0 &&
      personalWebsite?.length > 0

    const professionalData = devExp && blockchainExp && technologies?.length > 0

    personalData ? setFilledPersonalData(true) : setFilledPersonalData(false)
    socialData ? setFilledSocialData(true) : setFilledSocialData(false)
    professionalData ? setFilledProfessionalData(true) : setFilledProfessionalData(false)
  }
  useEffect(() => renderFormSteps, [watch()])

  return (
    <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
      <div className="flex">
        <ProfileProgress
          filledPersonalData={filledPersonalData}
          filledSocialData={filledSocialData}
          filledProfessionalData={filledProfessionalData}
        />
        <div className="-ml-0.5 w-0.5 bg-primary-300"></div>
        <div className="px-6 py-5">
          <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
            👩‍🎤 Informações Gerais
          </p>
          <div className="mt-7 flex flex-col lg:flex-row">
            <form
              onSubmit={handleSubmit(async (data) => await updateUserProfileData(data))}
              className="max-w-4xl"
            >
              <div className="mx-12 mb-6 flex flex-row flex-wrap gap-x-6 gap-y-3 lg:mb-0 lg:basis-1/3">
                {showPersonalData && (
                  <PersonalData
                    Controller={Controller}
                    control={control}
                    errors={errors}
                    user={user}
                    file={file}
                    setFile={setFile}
                    loading={loading}
                  />
                )}
                {showSocialData && (
                  <SocialData
                    Controller={Controller}
                    control={control}
                    errors={errors}
                    user={user}
                  />
                )}
                {showProfessionalData && (
                  <ProfessionalData
                    Controller={Controller}
                    control={control}
                    errors={errors}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                  />
                )}
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
        </div>
      </div>
    </div>
  )
}
