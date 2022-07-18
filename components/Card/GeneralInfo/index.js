import React, { useEffect, useState } from 'react'

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

export default function GeneralInfoCard() {
  const [user, setUser] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [bio, setBio] = useState()
  const [linkedIn, setLinkedIn] = useState()
  const [github, setGithub] = useState()
  const [twitter, setTwitter] = useState()
  const [personalWebsite, setPersonalWebsite] = useState()
  const [file, setFile] = useState()
  const authO = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUser(userSession)
        userSession?.socialLinks.forEach((link) => {
          switch (link.name) {
            case 'linkedin':
              setLinkedIn(link.url)
              break
            case 'github':
              setGithub(link.url)
              break
            case 'twitter':
              setTwitter(link.url)
              break
            case 'personalWebsite':
              setPersonalWebsite(link.url)
              break
            default:
              break
          }
        })
      }
    })
  }, [])

  const updateUserProfilePic = async (e) => {
    e.preventDefault()
    setLoading(true)
    const storageRef = ref(storage, `users/${user.uid}/profilePic`)
    await uploadBytes(storageRef, file)
    await getDownloadURL(storageRef).then((url) => {
      updateUserProfilePicInFirestore(user.uid, url)
      toast.success('Profile picture updated successfully')
      authO.user.photoUrl = url
      setLoading(false)
      window.location.reload()
    })
  }
  const updateUserData = async (github) => {
    const userData = {
      name: name || user.name,
      email: email || user.email,
      bio: bio || user.bio,
      github: github || user.github,
      twitter: twitter || user.twitter,
      personalWebsite: personalWebsite || user.personalWebsite,
      linkedIn: linkedIn || user.linkedIn,
    }
    await updateUserInFirestore(userData, user.uid)
      .then(() => {
        toast.success('Dados atualizados com sucesso!')
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

  return (
    <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
      <div className="flex">
        <div className="px-6 py-5">
          <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
            👩‍🎤 Informações Gerais
          </p>
          <div className="mt-7 flex flex-col lg:flex-row">
            <div className="mb-6 flex flex-row flex-wrap gap-x-6 gap-y-3 lg:mb-0 lg:basis-2/3">
              <div className="grow sm:basis-5/12">
                <Input
                  label="Nome"
                  id="name"
                  placeholder="Seu nome"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={user?.name}
                />
              </div>
              <div className="grow sm:basis-5/12">
                <Input
                  label="Email"
                  id="email"
                  placeholder="nome@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={user?.email}
                />
              </div>
              <div className="grow sm:basis-5/12">
                <Input
                  label="Twitter"
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  onChange={(e) => setTwitter(e.target.value)}
                  defaultValue={twitter}
                />
              </div>
              <div className="grow sm:basis-5/12">
                <Input
                  label="Linkedin"
                  id="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  onChange={(e) => setLinkedIn(e.target.value)}
                  defaultValue={linkedIn}
                />
              </div>
              <div className="grow sm:basis-5/12">
                {user?.socialLinks.find((item) => item.name == 'github').url ? (
                  <Input
                    label="Github"
                    id="github"
                    placeholder="https://github.com/username"
                    onChange={(e) => setGithub(e.target.value)}
                    defaultValue={github}
                  />
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
                <Input
                  label="Site Pessoal"
                  id="site"
                  placeholder="https://meuwebsite.com"
                  onChange={(e) => setPersonalWebsite(e.target.value)}
                  defaultValue={personalWebsite}
                />
              </div>
              <div className="grow basis-full">
                <Textarea
                  label="Biografia"
                  id="biografia"
                  placeholder="Escreva um resumo sobre você..."
                  onChange={(e) => setBio(e.target.value)}
                  defaultValue={user?.bio}
                />
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
                <button
                  className="text-white my-2 inline-flex cursor-pointer rounded-md border border-transparent
                  bg-green-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 
                    focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  onClick={(e) => updateUserProfilePic(e)}
                >
                  Enviar
                </button>
                {loading && (
                  <div className="mt-2.5 ml-2.5">
                    <Loading />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:py-4">
            <Button id="update-profile" onClick={() => updateUserData()}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
