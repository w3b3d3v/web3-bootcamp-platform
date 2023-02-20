import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { Button } from '../Button'
import ThemeSwitch from '../ThemeSwitch'
import { Modal, Button as NUButton, useModal, Text, Input } from '@nextui-org/react'
import constants from '../../lib/constants'
import { UserCircleIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'

import { useSession, signOut } from 'next-auth/react'
import { getUserFromFirestore, updateUserInFirestore } from '../../lib/user'
import { checkReferral, saveReferralCookie } from '../../lib/store_referral'

export default function Navbar() {
  const { setVisible, bindings } = useModal()
  const { data: session, status } = useSession()
  const [firestoreUser, setFirestoreUser] = useState()
  const ref = React.createRef()
  const navbarLinks = []

  const [show, setShow] = useState(null)
  const [profile, setProfile] = useState(false)

  const { user, logout } = useAuth()

  const getUser = async () => {
    if (user?.uid)
      return await getUserFromFirestore(user).then((u) => {
        checkReferral(u, updateUserInFirestore)
        setFirestoreUser(u)
      })
  }
  useEffect(() => {
    saveReferralCookie().then(getUser)
  }, [user])

  return (
    <>
      <div className="mx-auto h-full max-w-7xl px-6 ">
        <nav className="hidden bg-gray-50 dark:bg-black-300 xl:block">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <div className="flex items-center justify-center text-black-300 transition ease-in hover:text-primary-300 hover:no-underline dark:text-white-100 dark:hover:text-primary-300">
                  <Image width={42} height={42} src="/assets/img/w3d-logo-symbol-ac.svg" />

                  <p className="hidden cursor-pointer pl-3 text-xl font-bold leading-normal sm:block">
                    WEB3DEV
                  </p>
                </div>
              </Link>
            </div>

            {process.env.NEXT_PUBLIC_ENVIRONMENT && (
              <div className="w-1/3 bg-gradient-to-r from-green-400 to-violet-500 text-center font-semibold tracking-widest">
                {process.env.NEXT_PUBLIC_ENVIRONMENT}
              </div>
            )}

            <div className="flex">
              <div className="hidden items-center gap-x-6 text-sm font-bold xl:flex">
                {navbarLinks.map((link) => (
                  <a
                    key={link.name}
                    id={'desktop-' + link.name}
                    href={link?.href}
                    target="_blank"
                    className="text-black-300 transition ease-out hover:scale-105 hover:no-underline focus:outline-none dark:text-white-100 "
                  >
                    {link?.name}
                  </a>
                ))}
                {user?.uid && (
                  <div>
                    <NUButton auto shadow color="" onPress={() => setVisible(true)}>
                      Indique e ganhe
                    </NUButton>
                    <Modal
                      scroll
                      width="600px"
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                      {...bindings}
                    >
                      <Modal.Header>
                        <Text id="modal-title" size={18}>
                          Compartilhe esse link com seus amigos e concorra a prêmios da WEB3DEV
                        </Text>
                      </Modal.Header>
                      <Modal.Body>
                        <Text id="modal-description">
                          <Input width="100%" value={constants.referral_link + user?.uid}></Input>
                        </Text>
                      </Modal.Body>
                      <Modal.Footer>
                        <NUButton auto flat onPress={() => setVisible(false)}>
                          Fechar
                        </NUButton>
                      </Modal.Footer>
                    </Modal>
                  </div>
                )}
                <Link href="/courses">
                  <span className=" cursor-pointer font-bold text-black-300 transition duration-150 ease-in-out hover:scale-105 hover:no-underline focus:bg-gray-100 focus:outline-none dark:text-white-100">
                    Builds
                  </span>
                </Link>

                {/* <ThemeSwitch /> */}

                <div className="hidden items-center xl:flex">
                  {user ? (
                    <div className="relative">
                      <div
                        className="relative flex items-center"
                        onClick={() => setProfile(!profile)}
                      >
                        {profile && (
                          <ul className="absolute right-0 top-0 z-50 mt-16 w-40 list-none rounded bg-white-100 p-2 shadow dark:bg-black-200">
                            <Link href="/profile">
                              <li className="ml-2 mb-3 cursor-pointer text-black-300 hover:text-primary-300 hover:underline focus:text-primary-300 focus:outline-none dark:text-white-100">
                                Meu perfil
                              </li>
                            </Link>

                            <button
                              id="profile-logout"
                              className="cursor-pointer border-transparent bg-transparent font-bold text-white-100 hover:underline"
                              onClick={() => {
                                signOut({ redirect: false })
                                logout()
                              }}
                            >
                              <li className="cursor-pointer text-sm text-black-300 hover:text-primary-300 focus:text-primary-300 focus:outline-none dark:text-white-100">
                                Sair
                              </li>
                            </button>
                          </ul>
                        )}

                        <div className="cursor-pointer">
                          <img
                            id="open-menu"
                            className="h-10 w-10 rounded-full object-cover"
                            src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                            alt="profile-pic"
                          />
                        </div>

                        <div className="ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-down cursor-pointer "
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Link href="/auth">
                        <Button id="login" ref={ref}>
                          Acessar Plataforma
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav>
          <div className="flex items-center justify-between bg-gray-50 py-4 dark:bg-black-300 xl:hidden">
            <Link href="/">
              <div className="flex items-center">
                <>
                  <Image width={42} height={42} src="/assets/img/w3d-logo-symbol-ac.svg" />
                  <p className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 ">
                    WEB3DEV
                  </p>
                </>
              </div>
            </Link>
            <div className="flex items-center gap-x-3">
              <ThemeSwitch />

              {user ? (
                <Link href="/profile">
                  <div onClick={() => setProfile(!profile)}>
                    <div className="flex cursor-pointer rounded-full">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                        alt="profile-pic"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div>
                  <Link href="/auth">
                    <UserCircleIcon className="-mb-1 h-5 w-5" />
                  </Link>
                </div>
              )}

              <div
                id="mobile-open-menu"
                className="relative h-8 w-9"
                onClick={() => setShow(!show)}
              >
                <div
                  className={
                    show
                      ? 'before:absolute before:top-[45%] before:left-[15%] before:h-[3px] before:w-2/3 before:rotate-[-225deg] before:rounded-lg before:bg-red-500 before:content-[""] after:absolute after:top-[45%] after:left-[15%] after:h-[3px] after:w-2/3 after:rotate-[225deg] after:rounded-lg after:bg-red-500 after:content-[""]'
                      : 'before:absolute before:top-[60%] before:left-[15%] before:h-[3px] before:w-2/3 before:rounded-lg before:bg-primary-100 before:content-[""] after:absolute after:top-[30%] after:left-[15%] after:h-[3px] after:w-2/3 after:rounded-lg after:bg-primary-100 after:content-[""]'
                  }
                ></div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <nav>
        <div
          className={
            show
              ? 'absolute right-0 z-40 h-full w-full translate-x-0  transform  transition duration-300 ease-in-out xl:hidden'
              : 'absolute right-0 z-40 h-full w-full -translate-x-full  transform transition duration-300 ease-in-out xl:hidden'
          }
        >
          <div className="h-full w-full" onClick={() => setShow(!show)} />

          <div className="overflow fixed top-0 left-0 z-40 h-[20000px] w-full bg-gray-50 text-black-300 dark:bg-black-300 xl:hidden">
            <div className="flex flex-col items-center justify-center gap-y-4 font-bold text-black-300 dark:text-white-100">
              <ul className="flex flex-col items-center justify-center gap-5 p-0">
                {navbarLinks.map((link) => (
                  <a
                    id={'mobile-menu-side-bar ' + link.name}
                    key={link.name}
                    href={link?.href}
                    target="_blank"
                  >
                    <li className="list-none text-black-300 dark:text-white-100">{link?.name}</li>
                  </a>
                ))}

                <Link href="/courses">
                  <li className="list-none">Builds</li>
                </Link>

                {user ? (
                  <div className="flex items-center justify-center gap-x-4 px-6 ">
                    <div>
                      <Link href="/profile">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                          alt="Foto de perfil"
                        />
                      </Link>
                    </div>

                    <p className="text-base text-gray-800 dark:text-white-100">
                      {user?.name || session?.user?.name}
                    </p>

                    <div>
                      <button onClick={logout}>
                        <LogoutIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth">
                    <li className="list-none text-base font-bold text-black-300 dark:text-white-100">
                      Login
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
