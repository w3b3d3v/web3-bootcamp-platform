import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { withProtected } from '../../hooks/route'
import useAuth from '../../hooks/useAuth'
import DiscordCard from '../../components/Card/Discord'
import WalletCard from '../../components/Card/Wallet'
import { Button } from '../../components/Button'
import { getUserFromFirestore, updateUserInFirestore } from '../../lib/user'
import { auth } from '../../firebase/initFirebase'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'

function Profile() {
  const [user, setUser] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [bio, setBio] = useState()
  const [linkedIn, setLinkedIn] = useState()
  const [github, setGithub] = useState()
  const [twitter, setTwitter] = useState()
  const [personalWebsite, setPersonalWebsite] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSession = await getUserFromFirestore(user)
        setUser(userSession)
        userSession.socialLinks.forEach((link) => {
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

  const updateUserData = async () => {
    const userData = {
      name: user.name,
      email: user.email,
      bio: user.bio,
      github,
      twitter,
      personalWebsite,
      linkedIn,
    }
    await updateUserInFirestore(userData, user.uid).then(() => {
      toast.success('Dados atualizados com sucesso!')
    })
  }

  return (
    <Layout>
      <Head>
        <title>Perfil - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className=" mb-3 mt-6 rounded-lg bg-white-100 p-3 shadow-xl shadow-md shadow-green-400 dark:bg-black-200">
          <form className="flex flex-col lg:flex-row">
            <div>
              <div className="p-2">
                <div>
                  Nome:
                  <div>
                    <input
                      name="name"
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
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
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
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
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
                      onChange={(e) => setLinkedIn(e.target.value)}
                      defaultValue={linkedIn}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div>
                  GitHub:
                  <div>
                    <input
                      name="linkedIn"
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
                      onChange={(e) => setGithub(e.target.value)}
                      defaultValue={github}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div>
                  Twitter:
                  <div>
                    <input
                      name="linkedIn"
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
                      onChange={(e) => setLinkedIn(e.target.value)}
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
                      name="linkedIn"
                      className="mt-1 rounded-lg border-2 p-1 text-white-100 dark:bg-black-200"
                      onChange={(e) => setLinkedIn(e.target.value)}
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
                      className="mt-1 rounded-lg border-2 p-2 text-white-100 dark:bg-black-200"
                      rows="4"
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Escreva um resumo sobre você..."
                      defaultValue={user?.bio}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex items-start px-2 lg:items-end">
            <div className="flex items-center justify-center">
              <Button onClick={updateUserData}>Salvar</Button>
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
