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
      <div className="h-full max-w-7xl mx-auto px-6 ">
        <nav className="hidden bg-gray-50 dark:bg-black-300 xl:block">
          <div className="flex items-center justify-between">
            <div>
                <Link
                  href="/"
                >
                  <div className="flex items-center justify-center text-black-300 dark:text-white-100 hover:text-primary-300 hover:no-underline dark:hover:text-primary-300 transition ease-in">
                    
                    <Image
                      width={42}
                      height={42}
                      src="/assets/img/w3d-logo-symbol-ac.svg"
                    />

                    <p className="hidden pl-3 text-xl font-bold leading-normal sm:block cursor-pointer">
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
              <div className="xl:flex hidden gap-x-6 items-center text-sm font-bold">

                {navbarLinks.map((link) => (
                  <a
                    key={link.name}
                    id={'desktop-' + link.name}
                    href={link?.href}
                    target='_blank'
                    className="text-black-300 dark:text-white-100 transition ease-out hover:scale-105 hover:no-underline focus:outline-none "
                  >
                    {link?.name}
                  </a>
                ))}

                <Link href="/courses">
                  <span
                    className=" text-black-300 dark:text-white-100 transition duration-150 ease-in-out hover:no-underline focus:bg-gray-100 focus:outline-none hover:scale-105 font-bold cursor-pointer"
                  >
                    Builds
                  </span>
                </Link>
                
                <ThemeSwitch />

                <div className="hidden items-center xl:flex">
                  
                  {user ? (
                    <div className="relative">
                      <div
                        className="relative flex items-center"
                        onClick={() => setProfile(!profile)}
                      >      

                      {profile && (
                          <ul className="absolute w-40 right-0 top-0 z-50 mt-16 p-2 rounded bg-white-100 dark:bg-black-200 shadow list-none">
                            <Link href="/profile">
                                <li className="cursor-pointer ml-2 mb-3 text-black-300 dark:text-white-100 hover:text-primary-300 focus:text-primary-300 focus:outline-none hover:underline">
                                  Meu perfil
                                </li>
                            </Link>

                            <button
                              id="profile-logout"
                              className="border-transparent bg-transparent cursor-pointer text-white-100 font-bold hover:underline"
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
                            src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                            alt="profile-pic"
                          />
                        </div>
                        
                        <div className='ml-2'>
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
          <div className="flex items-center justify-between bg-gray-50 dark:bg-black-300 py-4 xl:hidden">
            <Link href="/">
              <div className="flex items-center">
              
                <>
                  <Image
                    width={42}
                    height={42}
                    src="/assets/img/w3d-logo-symbol-ac.svg"
                  />
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
                  <div
                    onClick={() => setProfile(!profile)}
                  >
                    <div className="flex cursor-pointer rounded-full" >
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                        alt="profile-pic"
                      />
                    </div>
                  </div>
              </Link>
              ) : (

                <div>
                  <Link
                   href="/auth"
                   >
                    <UserCircleIcon className="h-5 w-5 -mb-1" />
                  </Link>
                </div>
              )}

              <div
                id="mobile-open-menu"
                className="relative w-9 h-8"
                onClick={() => setShow(!show)}
              >
                <div className={ 

                  show 
                  ? 'after:absolute after:w-2/3 after:h-[3px] after:bg-red-500 after:top-[45%] after:left-[15%] after:rounded-lg after:content-[""] after:rotate-[225deg] before:absolute before:w-2/3 before:h-[3px] before:bg-red-500 before:top-[45%] before:left-[15%] before:rounded-lg before:content-[""] before:rotate-[-225deg]' 

                  : 'after:absolute after:w-2/3 after:h-[3px] after:bg-primary-100 after:top-[30%] after:left-[15%] after:rounded-lg after:content-[""] before:absolute before:w-2/3 before:h-[3px] before:bg-primary-100 before:top-[60%] before:left-[15%] before:rounded-lg before:content-[""]'
                  
                  }>

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
        
      <nav>
        <div
          className={
            show
              ? 'absolute z-40 h-full w-full right-0 translate-x-0  transform  xl:hidden transition duration-300 ease-in-out'
              : 'absolute z-40 h-full w-full right-0 -translate-x-full  transform xl:hidden transition duration-300 ease-in-out'
            }
            >
          <div
            className="h-full w-full"
            onClick={() => setShow(!show)}
            />

            <div className="fixed w-full h-[20000px] overflow top-0 left-0 z-40 bg-gray-50 text-black-300 dark:bg-black-300 xl:hidden">
              <div className="flex flex-col gap-y-4 items-center justify-center font-bold text-black-300 dark:text-white-100">
                <ul className='flex flex-col items-center justify-center gap-5 p-0'>
                  {navbarLinks.map((link) => (
                    <a
                      id={'mobile-menu-side-bar ' + link.name}
                      key={link.name}
                      href={link?.href}
                      target='_blank'
                    >
                      <li className="list-none text-black-300 dark:text-white-100">
                        {link?.name}
                      </li>
                    </a>
                    ))}

                    <Link href="/courses">
                      <li className="list-none">
                        Builds
                      </li>
                    </Link>

                  {user 

                  ? (
                    <div className="flex items-center justify-center px-6 gap-x-4 ">
                      <div>
                        <Link
                          href="/profile"
                        >
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={ firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                            alt="Foto de perfil"
                          />
                        </Link>
                      </div>

                      <p className="text-base text-gray-800 dark:text-white-100">
                        {user?.name || session?.user?.name}
                      </p>

                      <div>
                        <button
                        onClick={logout}
                        >
                          <LogoutIcon className="h-6 w-6" />
                        </button>
                      </div>

                    </div>
                    )
                  :  
                    (
                    <Link href="/auth">
                      <li className="text-base text-black-300 dark:text-white-100 font-bold list-none">
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
