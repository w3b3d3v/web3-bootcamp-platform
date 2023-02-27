import Image from 'next/image'
import { Link } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeSwitch from '../ThemeSwitch'
import { Modal, Button as NUButton, useModal, Text, Input } from '@nextui-org/react'
import constants from '../../lib/constants'
import { BsDiscord } from 'react-icons/bs'
import { FiMoreVertical } from 'react-icons/fi'

import { RiArticleFill } from 'react-icons/ri'
import { FaLinkedinIn } from 'react-icons/fa'
import { AiFillYoutube, AiOutlineInstagram, AiOutlinePlus } from 'react-icons/ai'
import { FiGithub } from 'react-icons/fi'
 
import { Navbar, Text, Dropdown, User, Container, Button, useModal, Modal, Card, styled } from '@nextui-org/react'
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
      <Navbar variant={'floating'} isBordered >
        <Container display="flex" alignItems="center" css={{ gap: '10px' }}>
          <Link href="/">
            <Navbar.Brand alignItems="center" display="flex">
              <Image width={42} height={42} src="/assets/img/w3d-logo-symbol-ac.svg" />
              <Text weight={'bold'}>WEB3DEV</Text>
            </Navbar.Brand>
          </Link>

          <Button
            href="https://discord.web3dev.com.br"
            icon={<BsDiscord size="20px" />}
            size={'xs'}
            shadow
            css={{
              padding: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100px',
              h: '10px',
            }}
          ></Button>

          <Button color={''} size={'xs'} light onPress={() => setVisible(true)}>
            🔗
          </Button>

          <Modal
            closeButton
            scroll={true}
            blur
            aria-labelledby="Social-Medias"
            aria-describedby="Social Medias from Web3Dev"
            {...bindings}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                WEB3DEV 🔗
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Card css={buttonContainer}>
                <Button icon={<FaLinkedinIn />} color={'default'} size={'sm'} shadow></Button>
                <Button icon={<FiGithub />} size={'sm'} color={''} shadow></Button>
                <Button icon={<RiArticleFill />} size={'sm'} color={''}></Button>
                <Button icon={<AiFillYoutube />} size={'sm'} color={'error'}></Button>
                <Button icon={<AiOutlineInstagram />} size={'sm'} color={'secondary'}></Button>
              </Card>
            </Modal.Body>
          </Modal>
        </Container>

        {/* {process.env.NEXT_PUBLIC_ENVIRONMENT && (
          <div className="w-1/3 bg-gradient-to-r from-green-400 to-violet-500 text-center font-semibold tracking-widest">
            {process.env.NEXT_PUBLIC_ENVIRONMENT}
          </div>
        )} */}
        <Navbar.Content>
          <div className="hidden items-center gap-x-6 text-sm font-bold xl:flex">
            {navbarLinks.map((link) => (
              <Navbar.Link key={link.name} href={link?.href} target="_blank">
                {link?.name}
              </Navbar.Link>
            ))}

            <Navbar.Link>
              <Link href="/courses">
                <Text weight={'bold'}>Builds</Text>
              </Link>
            </Navbar.Link>
            <ThemeSwitch />
            {user ? (
              <div>
                <Container display="flex" alignItems="center">
                  <User name="vitordev" src="https://i.imgur.com/3dhIq7h.png" />
                  <Dropdown onChange={() => setProfile(!profile)}>
                    <Dropdown.Button flat size={'200px'} color={'success'}></Dropdown.Button>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link href="/profile">Meu perfil</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Navbar.Link
                          onChange={() => {
                            signOut({ redirect: false })
                            logout()
                          }}
                        >
                          <Text>Sair</Text>
                        </Navbar.Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Container>
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
        </Navbar.Content>
      </Navbar>

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

            <div id="mobile-open-menu" className="relative h-8 w-9" onClick={() => setShow(!show)}>
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
                <Link href="#">
                  <li className="cursor-pointer list-none" onClick={() => setVisible(true)}>
                    Indique e ganhe
                  </li>
                </Link>
                <Link href="/courses">
                  <li className="cursor-pointer list-none">Builds</li>
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
