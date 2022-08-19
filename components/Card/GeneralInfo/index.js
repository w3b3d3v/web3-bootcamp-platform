import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import useAuth from '../../../hooks/useAuth'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Textarea } from '../../Textarea'
import { auth, storage } from '../../../firebase/initFirebase'
import {
  getUserFromFirestore,
  updateUserInFirestore,
  updateUserProfilePicInFirestore,
} from '../../../lib/user'
import { toast } from 'react-toastify'
import {
  GithubAuthProvider,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Loading from '../../Loading'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { langOptions } from '../../../lib/utils/constants'
import { profileSchema } from '../../../lib/yup'

export default function GeneralInfoCard() {
  const [user, setUser] = useState()
  const [file, setFile] = useState()
  const authO = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
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
        })
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
  const findSocialLinks = (name) => user?.socialLinks.find((link) => link.name === name)

  const updateUserData = async (data) => {
    const userData = {
      name: data?.name ?? user?.name,
      email: data?.email ?? user?.email,
      bio: data?.bio ?? user?.bio,
      github: data?.github ?? findSocialLinks('github')?.url,
      twitter: data?.twitter ?? findSocialLinks('twitter')?.url,
      personalWebsite: data?.personalWebsite ?? findSocialLinks('personalWebsite')?.url,
      linkedIn: data?.linkedin ?? findSocialLinks('linkedin')?.url,
      devExp: data?.devExp ?? null,
      blockchainExp: data?.blockchainExp ?? null,
      technologies: data?.technologies?.map((obj) => obj.label) ?? user?.technologies,
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
  const connectGithub = async (e) => {
    e.preventDefault()
    const provider = new GithubAuthProvider()
    await linkWithCredential
    await linkWithPopup(auth.currentUser, provider)
      .then((result) => {
        const github_id = result.user.providerData.find(
          (item) => item.providerId == result.providerId
        ).uid
        fetch(`https://api.github.com/user/${github_id}`)
          .then((res) => res.json())
          .then(async (data) => {
            await updateUserData(data.html_url)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'rgb(59, 59, 59)' }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#8960F3' : 'rgb(59, 59, 59)',
        color: 'white',
      }
    },
    input: (styles) => ({ ...styles, color: 'white' }),
  }

  return (
    <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
      <div className="flex">
        <div className="px-6 py-5">
          <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
            👩‍🎤 Informações Gerais
          </p>
          <div className="mt-7 flex flex-col lg:flex-row">
            <form onSubmit={handleSubmit(updateUserData)}>
              <div className='className="mb-6 mx-12 flex flex-row flex-wrap gap-x-6 gap-y-3 lg:mb-0 lg:basis-1/3'>
                <div className="grow sm:basis-5/12">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} label="Nome" defaultValue={user?.name} id="name" />
                    )}
                  />
                  <small className="text-red-500">{errors.name?.message}</small>
                </div>
                <div className="grow sm:basis-5/12">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} label="Email" defaultValue={user?.email} id="email" />
                    )}
                  />
                  <small className="text-red-500">{errors.email?.message}</small>
                </div>
                <div className="grow sm:basis-5/12">
                  <div className="flex flex-col">
                    <Controller
                      name="twitter"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Twitter"
                          defaultValue={findSocialLinks('twitter')?.url}
                          id="twitter"
                          placeholder="https://twitter.com/username"
                        />
                      )}
                    />
                    <small className="text-red-500">{errors.twitter?.message}</small>
                  </div>
                </div>
                <div className="grow sm:basis-5/12">
                  <Controller
                    name="linkedin"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Linkedin"
                        defaultValue={findSocialLinks('linkedin')?.url}
                        id="linkedin"
                        placeholder="https://linkedin.com/username"
                      />
                    )}
                  />
                  <small className="text-red-500">{errors.linkedin?.message}</small>
                </div>
                <div className="grow sm:basis-5/12">
                  {user?.socialLinks.find((item) => item.name == 'github').url ? (
                    <>
                      <Controller
                        name="github"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Github"
                            defaultValue={findSocialLinks('github')?.url}
                            id="github"
                            placeholder="https://github.com/username"
                          />
                        )}
                      />
                      <small className="text-red-500">{errors.github?.message}</small>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <label
                        htmlFor="githubConnect"
                        className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
                      >
                        Github
                      </label>
                      <button
                        id="githubConnect"
                        className="text-white inline-flex cursor-pointer rounded-md border border-transparent bg-green-600 p-2
                        text-base font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                        focus:ring-offset-2 sm:w-auto sm:text-sm"
                        onClick={connectGithub}
                      >
                        Conectar Github
                      </button>
                    </div>
                  )}
                </div>
                <div className="grow sm:basis-5/12 ">
                  <Controller
                    name="personalWebsite"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Site Pessoal"
                        defaultValue={findSocialLinks('personalWebsite')?.url}
                        id="personalWebsite"
                        placeholder="https://meuwebsite.com"
                      />
                    )}
                  />
                  <small className="text-red-500">{errors.personalWebsite?.message}</small>
                </div>
                <div className="flex w-full flex-col gap-x-8 lg:flex-row">
                  <div className="grow sm:basis-2/12 ">
                    <Controller
                      name="devExp"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Qual ano você começou a trabalhar com desenvolvimento?"
                          defaultValue={user?.devExp}
                          id="devExp"
                          placeholder="Insira o ano de início da sua experiência profissional com desenvolvimento"
                        />
                      )}
                    />
                    <small className="text-red-500">{errors.devExp?.message}</small>
                  </div>
                  <div className="grow sm:basis-2/12 ">
                    <Controller
                      name="blockchainExp"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Qual ano você começou a trabalhar com blockchains?"
                          defaultValue={user?.blockchainExp}
                          id="blockchainExp"
                          placeholder="Insira o ano de início da sua experiência profissional com blockchain"
                        />
                      )}
                    />
                    <small className="text-red-500">{errors.blockchainExp?.message}</small>
                  </div>
                  <div className="grow sm:basis-5/12">
                    <div className="flex flex-col">
                      <label
                        htmlFor="technologies"
                        className="mb-1 text-sm font-medium leading-none text-black-200 dark:text-gray-100 lg:mb-9 xl:mb-6 2xl:mb-3"
                      >
                        Tecnologias com que trabalha
                      </label>
                      <Controller
                        id="technologies"
                        name="technologies"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            instanceId="technologies"
                            isMulti
                            className="mb-3 w-full resize-y rounded-lg border-2 border-solid p-2 
                            font-sans text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-black-100"
                            options={langOptions.map((option) => ({
                              label: option,
                              value: option,
                            }))}
                            styles={colourStyles}
                          />
                        )}
                      />
                      <small className="text-red-500">{errors.linguagens?.message}</small>
                    </div>
                  </div>
                </div>
                <div className="grow basis-full">
                  <Controller
                    id="biography"
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Escreva um resumo sobre você"
                        defaultValue={user?.bio}
                        id="biography"
                        placeholder="Meu nome é ...."
                      />
                    )}
                  />
                  <small className="text-red-500">{errors.bio?.message}</small>
                </div>
              </div>
              <div className="flex flex-col items-center lg:basis-1/3">
                <div className="flex flex-col items-center">
                  <p>Alterar foto de perfil:</p>
                  {file && (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="profile-pic-preview"
                      width="200px"
                      height="200px"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <input
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                    id="lessonPrint"
                    name="lessonPrint"
                    className="mt-2"
                  />
                  {loading && (
                    <div className="mt-2.5 ml-2.5">
                      <Loading />
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:py-4">
                <Button type="submit" id="update-profile">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
