import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Button from '../Button'
import ThemeSwitch from '../ThemeSwitch'

import { UserCircleIcon } from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'

export default function Navbar() {
  const navbarLinks = [
    {
      name: 'Fórum',
      href: 'https://web3dev.com.br',
    },
    {
      name: 'Entrar no Discord',
      href: 'https://discord.gg/PNrGSajVf8',
    },
  ]

  const [show, setShow] = useState(null)
  const [profile, setProfile] = useState(false)

  const { user, logout } = useAuth()

  return (
    <>
      <div className="h-full ">
        {/* Code block starts */}
        <nav className="hidden bg-white-100 dark:bg-black-300 xl:block">
          <div className="container mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
            <div className="flex items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center xl:hidden">
                <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition duration-150 ease-in-out hover:text-gray-100 focus:outline-none">
                  <div className="visible xl:hidden">
                    <ul className="absolute left-0 right-0 mt-8 hidden rounded border-r bg-white-100 p-2 shadow md:mt-8">
                      <li className="mt-2 flex cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-grid"
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
                            <rect x={4} y={4} width={6} height={6} rx={1} />
                            <rect x={14} y={4} width={6} height={6} rx={1} />
                            <rect x={4} y={14} width={6} height={6} rx={1} />
                            <rect x={14} y={14} width={6} height={6} rx={1} />
                          </svg>
                          <span className="ml-2 font-bold">Dashbeoard</span>
                        </div>
                      </li>
                      <li className="flex cursor-pointer flex-col justify-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-puzzle"
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
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                          </svg>
                          <span className="ml-2 font-bold">Products</span>
                        </div>
                      </li>
                      <li className="flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-compass"
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
                          <polyline points="8 16 10 10 16 8 14 14 8 16" />
                          <circle cx={12} cy={12} r={9} />
                        </svg>
                        <span className="ml-2 font-bold">Performance</span>
                      </li>
                      <li className="flex flex cursor-pointer items-center border-b border-gray-300 pt-2 pb-4 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none xl:hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-code"
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
                          <polyline points="7 8 3 12 7 16" />
                          <polyline points="17 8 21 12 17 16" />
                          <line x1={14} y1={4} x2={10} y2={20} />
                        </svg>
                        <span className="ml-2 font-bold">Deliverables</span>
                      </li>
                      <li className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <div className="focus:border-white flex w-12 cursor-pointer rounded border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png"
                              alt="logo"
                            />
                          </div>
                          <p className="ml-2 cursor-pointer text-sm">
                            Jane Doe
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
                      onclick="MenuHandler(this,true)"
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
                  <div
                    className="close-m-menu hidden text-gray-700"
                    onclick="MenuHandler(this,false)"
                  >
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
                    href="/"
                    className="flex items-center justify-center text-black-300 transition duration-150 ease-in-out hover:text-primary-300 hover:no-underline dark:text-white-100 dark:hover:text-primary-300"
                  >
                    <>
                      <Image
                        width={42}
                        height={42}
                        src="/assets/img/logo_icon.svg"
                      />
                      <h2 className="hidden pl-3 text-xl font-bold leading-normal sm:block">
                        web3dev
                      </h2>
                    </>
                  </a>
                </div>
              </div>
              <div className="flex">
                <div className="hidden md:mr-6 xl:mr-6 xl:flex">
                  {navbarLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link?.href}
                      className="flex items-center px-5 py-6 text-sm leading-5 text-black-300 transition duration-150 ease-in-out hover:bg-gray-100 hover:no-underline focus:bg-gray-100 focus:outline-none dark:text-white-100 dark:hover:bg-black-200"
                    >
                      {link?.name}
                    </a>
                  ))}
                  {user ? (
                    <a
                      href="/courses"
                      className="flex items-center px-5 py-6 text-sm leading-5 text-black-300 transition duration-150 ease-in-out hover:bg-white-200 hover:no-underline focus:bg-gray-100 focus:outline-none dark:text-white-100 dark:hover:bg-black-200"
                    >
                      Cursos
                    </a>
                  ) : null}
                  <ThemeSwitch />
                </div>
                <div className="hidden items-center xl:flex">
                  {user ? (
                    <div className="relative">
                      <div
                        className="relative flex items-center"
                        onClick={() => setProfile(!profile)}
                      >
                        {profile && (
                          <ul className="absolute right-0 top-0 z-50 mt-16 w-40 rounded bg-white-100 p-2 shadow dark:bg-black-200">
                            <li className="cursor-pointer py-2 text-sm leading-3 tracking-normal text-black-300 hover:text-primary-300 focus:text-primary-300 focus:outline-none dark:text-white-100">
                              <div className="flex items-center">
                                <Link href="/profile">
                                  <span className="ml-2">Meu perfil</span>
                                </Link>
                              </div>
                            </li>

                            <li className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-black-300 hover:text-primary-300 focus:text-primary-300 focus:outline-none dark:text-white-100">
                              <button className="ml-2" onClick={logout}>
                                Sair
                              </button>
                            </li>
                          </ul>
                        )}
                        <div className="focus:border-white flex cursor-pointer rounded-full border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              user?.photoUrl || '/assets/img/default_avatar.svg'
                            }
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
                      <a href="/auth">
                        <Button style="primary">Acessar Plataforma</Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="fixed top-0 z-40 flex w-full items-center justify-between bg-white-100 py-4 px-6 dark:bg-black-300 xl:hidden">
            <div>
              <a href="/" className="flex items-center">
                <>
                  <Image
                    width={42}
                    height={42}
                    src="/assets/img/logo_icon.svg"
                  />
                  <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
                    web3dev
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
                          <div className="flex items-center">
                            <Link href="/profile">
                              <span className="ml-2">Meu perfil</span>
                            </Link>
                          </div>
                        </li>

                        <li className="mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-green-700 focus:text-green-700 focus:outline-none">
                          <button className="ml-2" onClick={logout}>
                            Sair
                          </button>
                        </li>
                      </ul>
                    )}
                    <div className="focus:border-white flex cursor-pointer rounded-full border-2 border-transparent text-sm transition duration-150 ease-in-out focus:outline-none">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user?.photoUrl || '/assets/img/default_avatar.svg'}
                        alt="profile-pic"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative ml-2 mr-4">
                  <a href="/auth">
                    <UserCircleIcon className="h-5 w-5 text-black-300 dark:text-white-100" />
                  </a>
                </div>
              )}
              <div
                id="menu"
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
                ? 'absolute z-40 h-full w-full translate-x-0  transform  xl:hidden '
                : '   absolute z-40 h-full w-full -translate-x-full  transform xl:hidden'
            }
          >
            <div
              className="h-full w-full bg-gray-800 opacity-50"
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
                          >
                            <>
                              <Image
                                width={42}
                                height={42}
                                src="/assets/img/logo_icon.svg"
                              />
                              <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
                                web3dev
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

                      {user ? (
                        <a href="/courses" className="cursor-pointer">
                          <li className="pt-10 text-gray-800">
                            <div className="flex items-center">
                              <p className="ml-3 text-base text-black-300 dark:text-white-100 xl:text-base">
                                Cursos
                              </p>
                            </div>
                          </li>
                        </a>
                      ) : null}
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="border-t border-gray-300">
                      {user ? (
                        <div className="flex w-full items-center justify-between pt-2">
                          <div className="flex items-center">
                            <a href="/profile">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  user?.photoUrl ||
                                  '/assets/img/default_avatar.svg'
                                }
                                alt="profile-pic"
                              />
                              <p className=" ml-2 text-base leading-4 text-gray-800">
                                {user?.displayName}
                              </p>
                            </a>
                          </div>
                          <ul className="flex">
                            <li className="cursor-pointer pt-5 pb-3 text-gray-800">
                              <button onClick={logout}>
                                <LogoutIcon className="h-6 w-6 text-black-300 dark:text-white-100 md:h-8 md:w-8" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="relative">
                          <ul className="flex">
                            <a href="/auth" className="cursor-pointer">
                              <li className="pt-2 text-gray-800">
                                <div className="flex items-center">
                                  <p className="ml-3 text-base text-black-300 dark:text-white-100 xl:text-base">
                                    Acessar plataforma
                                  </p>
                                </div>
                              </li>
                            </a>
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
