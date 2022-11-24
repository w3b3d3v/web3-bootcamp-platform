import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { Button } from '../Button'
import ThemeSwitch from '../ThemeSwitch'

import { UserCircleIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'

import { useSession, signOut } from 'next-auth/react'
import { getUserFromFirestore } from '../../lib/user'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [firestoreUser, setFirestoreUser] = useState()
  const ref = React.createRef()
  const navbarLinks = [
    {
      name: 'Fórum',
      href: 'https://www.web3dev.com.br',
    },
    {
      name: 'Entrar no Discord',
      href: 'https://discord.web3dev.com.br',
    },
  ]

  const [show, setShow] = useState(null)
  const [profile, setProfile] = useState(false)

  const { user, logout } = useAuth()

  const getUser = async () => {
    if (user?.uid)
      return await getUserFromFirestore(user).then((user) => {
        setFirestoreUser(user)
      })
  }
  useEffect(() => {
    getUser()
  }, [user])

  return (
    <>
      <div className="h-full max-w-7xl mx-auto px-6">
        {/* Code block starts */}
        <nav className="hidden bg-gray-50 dark:bg-black-300 xl:block">
          <div className="mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center xl:hidden">
                <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition duration-150 ease-in-out hover:text-gray-100 focus:outline-none">
                  <div className="visible xl:hidden">
                    <ul className="absolute left-0 right-0 mt-8 hidden rounded border-r bg-white-100 p-2 shadow md:mt-8">
                      <li className="mt-2 flex cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <div className="flex items-center">
                          <span className="ml-2 font-bold">Dashboard</span>
                        </div>
                      </li>
                      <li className="flex cursor-pointer flex-col justify-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <div className="flex items-center">
                          <span className="ml-2 font-bold">Products</span>
                        </div>
                      </li>
                      <li className="flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <span className="ml-2 font-bold">Performance</span>
                      </li>
                      <li className="flex cursor-pointer items-center border-b border-gray-300 pt-2 pb-4 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <span className="ml-2 font-bold">Deliverables</span>
                      </li>
                      <li className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <div className="focus:border-white flex w-12 cursor-pointer rounded border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                              alt="profile-pic"
                            />
                          </div>
                          <p className="ml-2 cursor-pointer text-sm">
                            {user?.displayName}
                          </p>
                          <div className="text-white relative sm:ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-down cursor-pointer"
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
                      </li>
                      <li className="cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-user"
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
                            <circle cx={12} cy={7} r={4} />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          </svg>
                          <span className="ml-2">Profile</span>
                        </div>
                      </li>
                    </ul>
                    <svg
                      aria-haspopup="true"
                      aria-label="Main Menu"
                      xmlns="http://www.w3.org/2000/svg"
                      className="show-m-menu icon icon-tabler icon-tabler-menu"
                      width={28}
                      height={28}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={4} y1={8} x2={20} y2={8} />
                      <line x1={4} y1={16} x2={20} y2={16} />
                    </svg>
                  </div>
                  <div className="close-m-menu hidden text-gray-700">
                    <svg
                      aria-label="Close"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-end sm:w-auto sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                  <a
                    id="mobile-home-logo"
                    href="/"
                    className="flex items-center justify-center text-black-300 transition ease-in hover:text-primary-300 hover:no-underline dark:text-white-100 dark:hover:text-primary-300"
                  >
                    <>
                      <Image
                        width={42}
                        height={42}
                        src="/assets/img/w3d-logo-symbol-ac.svg"
                      />
                      <h2 className="hidden pl-3 text-xl font-bold leading-normal sm:block">
                        WEB3DEV
                      </h2>
                    </>
                  </a>
                </div>
              </div>
              {process.env.NEXT_PUBLIC_ENVIRONMENT && (
                <div className="w-1/3 bg-gradient-to-r from-green-400 to-violet-500 text-center font-semibold tracking-widest">
                  {process.env.NEXT_PUBLIC_ENVIRONMENT}
                </div>
              )}
              <div className="flex">
                <div className="hidden md:mr-6 xl:mr-6 xl:flex">
                  {navbarLinks.map((link) => (
                    <a
                      key={link.name}
                      id={'desktop-' + link.name}
                      href={link?.href}
                      className="flex items-center px-5 py-6 text-sm leading-5 text-black-300 transition ease-out hover:scale-105 hover:no-underline focus:bg-gray-100 focus:outline-none dark:text-white-100 font-bold"
                    >
                      {link?.name}
                    </a>
                  ))}
                  <Link href="/courses">
                    <span
                      id={'desktop-access-courses'}
                      className="cursos flex items-center px-5 py-6 text-sm leading-5 text-black-300 transition duration-150 ease-in-out hover:no-underline focus:bg-gray-100 focus:outline-none dark:text-white-100 hover:scale-105 font-bold cursor-pointer"
                    >
                      Cursos
                    </span>
                  </Link>
                  <ThemeSwitch />
                </div>
                <div className="hidden items-center xl:flex">
                  {user ? (
                    <div className="relative">
                      <div
                        id="user-menu"
                        className="relative flex items-center"
                        onClick={() => setProfile(!profile)}
                      >
                        {profile && (
                          <ul className="absolute right-0 top-0 z-50 mt-16 w-40 rounded bg-white-100 p-2 shadow dark:bg-black-200">
                            <Link href="/profile">
                              <a
                                id="abrirl-perfil"
                                className="ml-2 flex w-full items-start"
                              >
                                <li className="cursor-pointer list-none py-2 text-sm leading-3 tracking-normal text-black-300 hover:text-primary-300 focus:text-primary-300 focus:outline-none dark:text-white-100">
                                  Meu perfil
                                </li>
                              </a>
                            </Link>

                            <button
                              id="profile-logout"
                              className="flex w-full cursor-pointer items-start border-transparent bg-transparent text-white-100 hover:underline"
                              onClick={() => {
                                signOut({ redirect: false })
                                logout()
                              }}
                            >
                              <li className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-black-300 hover:text-primary-300 focus:text-primary-300 focus:outline-none dark:text-white-100">
                                Sair
                              </li>
                            </button>
                          </ul>
                        )}
                        <div className="focus:border-white flex cursor-pointer rounded-full border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                          <img
                            id="open-menu"
                            className="h-10 w-10 rounded-full object-cover"
                            src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                            alt="profile-pic"
                          />
                        </div>
                        <div className="ml-2 text-black-300 dark:text-white-100">
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
                    <div className="relative">
                      <Link href="/auth">
                      <a id="mobile-login-nav-icon">
                        <Button id="login" ref={ref}>
                          Acessar Plataforma
                        </Button>
                      </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="z-40 flex w-full items-center justify-between bg-gray-50 py-4 dark:bg-black-300 xl:hidden">
            <div>
              <a id="mobile-home" href="/" className="flex items-center">
                <>
                  <Image
                    width={42}
                    height={42}
                    src="/assets/img/w3d-logo-symbol-ac.svg"
                  />
                  <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
                    WEB3DEV
                  </h2>
                </>
              </a>
            </div>
            <div className="flex items-center">
              <ThemeSwitch />
              {user ? (
                <div className="relative mx-4">
                  <div
                    className="relative flex items-center"
                    onClick={() => setProfile(!profile)}
                  >
                    {profile && (
                      <ul className="absolute right-0 top-0 mt-16 w-40 rounded border-r bg-white-100 p-2 shadow ">
                        <li className="cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-green-700 focus:text-green-700 focus:outline-none">
                          <div
                            id="mobile-my-profile"
                            className="flex items-center"
                          >
                            <Link href="/profile">
                              <a>
                              <span className="ml-2">Meu perfil</span>
                              </a>
                            </Link>
                          </div>
                        </li>

                        <li
                          id="mobile-logout"
                          className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-green-700 focus:text-green-700 focus:outline-none"
                        >
                          <button className="ml-2" onClick={logout}>
                            Sair
                          </button>
                        </li>
                      </ul>
                    )}
                    <div className="focus:border-white flex cursor-pointer rounded-full border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                        alt="profile-pic"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative ml-2 mr-4">
                  <a id="mobile-not-logged-user-profile-icon" href="/auth">
                    <UserCircleIcon className="h-5 w-5 text-black-300 dark:text-white-100" />
                  </a>
                </div>
              )}
              <div
                id="mobile-open-menu"
                className="text-black-300 dark:text-white-100"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon icon-tabler icon-tabler-menu-2 fill-current dark:text-primary-100"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? 'absolute z-40 h-full w-full translate-x-0  transform  xl:hidden transition duration-300 ease-in-out'
                : '   absolute z-40 h-full w-full -translate-x-full  transform xl:hidden transition duration-300 ease-in-out'
            }
          >
            <div
              className="h-full w-full"
              onClick={() => setShow(!show)}
            />
            <div className="fixed top-0 z-40 h-full w-64 flex-col justify-between overflow-y-auto bg-white-100 pb-4 text-black-300 shadow transition duration-150 ease-in-out dark:bg-black-300 xl:hidden">
              <div className="h-full px-6">
                <div className="flex h-full w-full flex-col justify-between">
                  <div>
                    <div className="mt-4 flex w-full items-center justify-between">
                      <div className="flex w-full items-center justify-between border-b border-gray-300 pb-3">
                        <div className="flex items-center">
                          <a
                            href="/"
                            className="flex items-center justify-center"
                            id="mobile-menu-side-bar"
                          >
                            <>
                              <Image
                                width={42}
                                height={42}
                                src="/assets/img/w3d-logo-symbol-ac.svg"
                              />
                              <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
                                WEB3DEV
                              </h2>
                            </>
                          </a>
                        </div>
                        <ThemeSwitch />
                        <div
                          id="cross"
                          className="text-black-300 dark:text-white-100"
                          onClick={() => setShow(!show)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m">
                      {navbarLinks.map((link) => (
                        <a
                          id={'mobile-menu-side-bar ' + link.name}
                          key={link.name}
                          href={link?.href}
                          className="cursor-pointer"
                        >
                          <li className="pt-10 text-gray-800">
                            <div className="flex items-center">
                              <p className="ml-3 text-base text-black-300 dark:text-white-100 xl:text-base">
                                {link?.name}
                              </p>
                            </div>
                          </li>
                        </a>
                      ))}
                        <Link href="/courses">
                        <span
                          id="mobile-menu-side-bar-courses"
                          className="cursor-pointer"
                        >
                          <li className="pt-10 text-gray-800">
                            <div className="flex items-center">
                              <p className="ml-3 text-base text-black-300 dark:text-white-100 xl:text-base">
                                Cursos
                              </p>
                            </div>
                          </li>
                        </span>
                        </Link>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="border-t border-gray-300">
                      {user ? (
                        <div className="flex w-full items-center justify-between pt-2">
                          <div className="flex items-center">
                            <a
                              id="mobile-menu-side-bar-user-logo"
                              href="/profile"
                            >
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                                alt="profile-pic"
                              />
                            </a>
                          </div>
                          <p className=" ml-2 text-base leading-4 text-gray-800 dark:text-white-100">
                            {user?.name || session?.user?.name}
                          </p>
                          <ul className="flex">
                            <li className="cursor-pointer pt-5 pb-3 text-gray-800">
                              <button
                                id="mobile-menu-side-bar-logout-icon"
                                onClick={logout}
                              >
                                <LogoutIcon className="h-6 w-6 text-black-300 dark:text-white-100 md:h-8 md:w-8" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="relative">
                          <ul className="flex">
                            <Link href="/auth">
                            <a className="cursor-pointer">
                              <li className="pt-2 text-gray-800">
                                <div className="flex items-center">
                                  <p className="ml-3 text-base text-black-300 dark:text-white-100 xl:text-base">
                                    Acessar plataforma
                                  </p>
                                </div>
                              </li>
                            </a>
                            </Link>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Code block ends */}
      </div>
    </>
  )
}
