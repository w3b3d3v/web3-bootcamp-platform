import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeSwitch from '../ThemeSwitch'

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
      <div className="container relative z-50 mx-auto h-full w-full items-center gap-8 px-6 dark:bg-black-200 sm:px-6 md:flex md:px-6 lg:px-32">
        {/* Desktop Navbar */}
        <nav className="relative hidden w-full xl:block">
          <div className="container mx-auto py-2 xl:py-0">
            <div className="flex items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center xl:hidden">
                <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition duration-150 ease-in-out hover:text-gray-100 focus:outline-none">
                  <div className="visible xl:hidden">
                    <ul className="absolute left-0 right-0 mt-8 hidden rounded border-r bg-white-100 p-2 shadow md:mt-8">
                      {navbarLinks.map((link) => (
                        <li
                          key={link.name}
                          className="mt-2 flex cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-green-700 focus:text-green-700 focus:outline-none xl:hidden"
                        >
                          <div className="flex items-center">
                            <Link href={link.href}>
                              <span className="ml-2 font-bold">
                                {link.name}
                              </span>
                            </Link>
                          </div>
                        </li>
                      ))}
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
                  <a href="/" className="flex items-center justify-center">
                    <>
                      <Image
                        width={42}
                        height={42}
                        src="/assets/img/logo_icon.svg"
                      />
                      <h2 className="hidden pl-3 text-xl font-bold leading-normal text-gray-700 sm:block">
                        web3dev
                      </h2>
                    </>
                  </a>
                  <ThemeSwitch />
                </div>
              </div>
              <div className="flex">
                <div className="hidden md:mr-6 xl:mr-16 xl:flex">
                  {navbarLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link?.href}
                      className="flex items-center px-5 py-6 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      {link?.name}
                    </a>
                  ))}
                  {user ? (
                    <a
                      href="/courses"
                      className="flex items-center px-5 py-6 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      Cursos
                    </a>
                  ) : null}
                </div>
                <div className="hidden items-center xl:flex">
                  {user ? (
                    <div className="relative ml-6">
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
                            src={
                              user?.photoUrl || '/assets/img/default_avatar.svg'
                            }
                            alt="profile-pic"
                          />
                        </div>
                        <div className="ml-2 text-gray-600">
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
                    </div>
                  ) : (
                    <div className="relative my-2">
                      <a
                        href="/auth"
                        className="text-black rounded border bg-green-300 px-5 py-2 text-xs transition duration-150 ease-in-out hover:bg-green-400 focus:outline-none"
                      >
                        Acessar Plataforma
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="bg-white-100-100 fixed top-0 z-40 flex w-full items-center justify-between py-4 px-6 xl:hidden">
            <div className="w-24">
              <a href="/" className="flex items-center justify-center">
                <>
                  <Image
                    width={42}
                    height={42}
                    src="/assets/img/logo_icon.svg"
                  />
                  <h2 className="hidden pl-3 text-xl font-bold leading-normal text-gray-700 sm:block">
                    web3dev
                  </h2>
                </>
              </a>
            </div>
            <div className="flex items-center">
              <div className="relative mr-6 ">
                <button className="rounded border border-gray-300 bg-gray-100 px-5 py-2 text-xs text-gray-600 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none">
                  Manage
                </button>
              </div>
              <div
                id="menu"
                className="text-gray-800"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  ''
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
                ? 'absolute z-50 h-full w-full translate-x-0  transform  xl:hidden '
                : '   absolute z-50 h-full w-full -translate-x-full  transform xl:hidden'
            }
          >
            <div
              className="h-full w-full bg-gray-800 opacity-50"
              onClick={() => setShow(!show)}
            />
            <div className="fixed top-0 z-40 h-auto w-64 flex-col justify-between overflow-y-auto bg-white-100 pb-4 shadow transition duration-150 ease-in-out xl:hidden">
              <div className="h-full px-6">
                <div className="flex h-full w-full flex-col justify-between">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex w-full items-center justify-between">
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
                              <h2 className="hidden pl-3 text-xl font-bold leading-normal text-gray-700 sm:block">
                                web3dev
                              </h2>
                            </>
                          </a>
                          <ThemeSwitch />
                        </div>
                        <div
                          id="cross"
                          className="text-gray-800"
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
                          href={link.href}
                          key={link.name}
                          className="cursor-pointer"
                        >
                          <li className="pt-10 text-gray-800">
                            <div className="flex items-center">
                              <p className="text-base text-green-700 xl:text-base">
                                {link.name}
                              </p>
                            </div>
                          </li>
                        </a>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="mb-4 flex w-full justify-center">
                      <div className="relative w-full">
                        <div className="absolute inset-0 m-auto ml-4 h-4 w-4 text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-search"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="#A0AEC0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={10} cy={10} r={7} />
                            <line x1={21} y1={21} x2={15} y2={15} />
                          </svg>
                        </div>
                        <input
                          className="w-full rounded bg-gray-100 py-2 pl-10 text-sm  text-gray-500 focus:outline-none"
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <div className="border-t border-gray-300">
                      <div className="flex w-full items-center justify-between pt-1">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              user?.photoUrl || '/assets/img/default_avatar.svg'
                            }
                            alt="profile-pic"
                          />

                          <p className=" ml-2 text-base leading-4 text-gray-800">
                            {user?.email}
                          </p>
                        </div>
                        <ul className="flex">
                          <li className="cursor-pointer pt-5 pb-3 text-gray-800">
                            <div className="h-6 w-6 md:h-8 md:w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-messages"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                              </svg>
                            </div>
                          </li>
                          <li className="cursor-pointer pt-5 pb-3 pl-3 text-gray-800">
                            <div className="h-6 w-6 md:h-8 md:w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-bell"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                              </svg>
                            </div>
                          </li>
                        </ul>
                      </div>
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
