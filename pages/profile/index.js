import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { withProtected } from '../../hooks/route'
import useAuth from '../../hooks/useAuth'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import { Button } from '../../components/Button'
import {
  getUserFromFirestore,
  updateUserInFirestore,
  updateUserProfilePicInFirestore,
} from '../../lib/user'
import { auth, storage } from '../../firebase/initFirebase'
import { toast } from 'react-toastify'
import {
  GithubAuthProvider,
  linkWithCredential,
  linkWithPopup,
  linkWithRedirect,
  onAuthStateChanged,
  unlink,
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Loading from '../../components/Loading'

function Profile() {
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
    <Layout>
      <Head>
        <title>Perfil - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className=" mb-3 mt-6 rounded-lg bg-white-100 p-3 shadow-xl shadow-md shadow-green-400 dark:bg-black-200">
          <form id="update-profile-form" className="flex flex-col lg:flex-row">
            <div>
              <div className="p-2">
                <div>
                  Nome:
                  <div>
                    <input
                      name="name"
                      className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={user?.name}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div>
                  Email:
                  <div>
                    <input
                      name="email"
                      className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={user?.email}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div>
                  LinkedIn:
                  <div>
                    <input
                      name="linkedIn"
                      className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                      onChange={(e) => setLinkedIn(e.target.value)}
                      defaultValue={linkedIn}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div>
                  GitHub:
                  {user?.socialLinks.find((item) => item.name == 'github').url ? (
                    <div>
                      <input
                        name="github"
                        className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                        onChange={(e) => setGithub(e.target.value)}
                        defaultValue={github}
                      />
                    </div>
                  ) : (
                    <div>
                      <button
                        className="text-white inline-flex cursor-pointer cursor-pointer rounded-md border border-transparent bg-green-600 p-2 text-base font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                        onClick={connectGithub}
                      >
                        Conectar github
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div>
                  Twitter:
                  <div>
                    <input
                      name="twitter"
                      className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                      onChange={(e) => setTwitter(e.target.value)}
                      defaultValue={twitter}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div>
                  Site pessoal:
                  <div>
                    <input
                      name="personal-website"
                      className="mt-1 rounded-lg border-2 p-1 text-black-100 dark:bg-black-200 dark:text-white-100"
                      onChange={(e) => setPersonalWebsite(e.target.value)}
                      defaultValue={personalWebsite}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div>
                  Biografia:
                  <div>
                    <textarea
                      name="bio"
                      className="mt-1 rounded-lg border-2 p-2 text-black-100 dark:bg-black-200 dark:text-white-100"
                      rows="4"
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Escreva um resumo sobre você..."
                      defaultValue={user?.bio}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div>
                  Alterar foto de perfil:
                  <div className="">
                    <input
                      type="file"
                      onChange={(event) => setFile(event.target.files[0])}
                      id="lessonPrint"
                      name="lessonPrint"
                    />
                    <br />
                    <div className="flex flex-row">
                      <button
                        className="text-white my-2 inline-flex cursor-pointer rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
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
              </div>
            </div>
          </form>
          <div className="flex items-start px-2 lg:items-end">
            <div className="flex items-center justify-center">
              <Button id="update-profile" onClick={updateUserData}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="item flex-grow">
            <DiscordCard />
          </div>
          <div className="item flex-grow">
            <WalletCard />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default withProtected(Profile)
