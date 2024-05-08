import { Link, Input } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeSwitch from '../ThemeSwitch'
import { Button as NUButton } from '@nextui-org/react'
import constants from '../../lib/constants'
import { Navbar, Text, Dropdown, Button, useModal, Modal, Grid, Avatar, Image } from '@nextui-org/react'
import { GiExitDoor } from 'react-icons/gi'
import { useTranslation } from "react-i18next"

import { 
  FaEthereum
 } from 'react-icons/fa'

import { useSession, signOut } from 'next-auth/react'
import { getUserFromFirestore, updateUserInFirestore } from '../../lib/user'
import { checkReferral, saveReferralCookie } from '../../lib/store_referral'

export default function NavbarComponent() {
  const { setVisible, bindings } = useModal()
  const { data: session, status } = useSession()
  const [firestoreUser, setFirestoreUser] = useState()
  const [link, setLink] = useState('')
  const ref = React.createRef()
  const navbarLinks = [
    {
      name: 'Builds',
      href: '/courses',
    },
  ]

  const [show, setShow] = useState(null)
  const [profile, setProfile] = useState(false)
  const { t } = useTranslation()

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
    if (typeof window !== 'undefined') {
      setLink(window.location.origin + '?referred_by=' + user?.uid)
    }
  }, [user])

  return (
    <>
      <Navbar variant={'floating'} isBordered={true}>
        <Link href="/">
          <Navbar.Brand css={{ gap: '$5' }}>
            <Image width={42} height={42} src="/assets/img/w3d-logo-symbol-ac.svg" />
            <Text weight={'bold'}>WEB3DEV</Text>
            <ThemeSwitch />
          </Navbar.Brand>
        </Link>

        <Navbar.Content hideIn={'sm'}>
          <Link href="/courses">
            <Button
              auto
              rounded
              css={{ background: '$blue300' }}
              icon={<FaEthereum color="black" />}
            >
              <Text weight={'extrabold'}>Builds</Text>
            </Button>
          </Link>
        </Navbar.Content>

        <Navbar.Content>
          {user?.uid && (
            <Navbar.Content hideIn={'md'}>
              <NUButton
                auto
                css={{ background: '#17c964' }}
                color={''}
                onPress={() => setVisible(true)}
              >
                <Text weight={'bold'}>{t('indicateAndWin')}</Text>
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
                    {t('shareLinkDescription')}
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Text id="modal-description">
                    <Input width="100%" value={link}></Input>
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  <NUButton auto flat onPress={() => setVisible(false)}>
                    {t('close')}
                  </NUButton>
                </Modal.Footer>
              </Modal>
            </Navbar.Content>
          )}
          {user ? (
            <Navbar.Content hideIn={'md'}>
              <Dropdown onChange={() => setProfile(!profile)}>
                <Dropdown.Button
                  borderWeight={'light'}
                  flat
                  color={''}
                  css={{ paddingBlock: '$10' }}
                  bordered
                >
                  <Avatar
                    size="md"
                    src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                    bordered
                  />
                  {/* <Navbar.CollapseItem 
                        css={{ display:'flex', alignItems:'center', justifyContent:'center' }}
                        >
                          <Button color={''} onPress={() => setVisible(true)} >
                            <Text weight={'bold'} >Indique e Ganhe</Text>
                          </Button>
                        </Navbar.CollapseItem> */}
                </Dropdown.Button>
                <Dropdown.Menu
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '$5',
                  }}
                >
                  <Dropdown.Item>
                    <Link href="/profile">
                      <Text weight={'bold'}>{t('myProfile')}</Text>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      animated={false}
                      color={'error'}
                      onClick={() => {
                        signOut({ redirect: false })
                        logout()
                      }}
                    >
                      {t('logout')}
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
          ) : (
            <Navbar.Content hideIn={'sm'}>
              <Link href="/auth">
                <Button color={'secondary'} id="login" bordered ref={ref}>
                  <Text weight={'bold'}>{t('accessPlatform')}</Text>
                </Button>
              </Link>
            </Navbar.Content>
          )}
          <Navbar.Toggle showIn="md" />
        </Navbar.Content>

        <Navbar.Collapse>
          {!user && (
            <Navbar.CollapseItem
              key="login"
              css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Link href="/auth">
                <Button color={'secondary'} bordered>
                  <Text weight={'bold'}>{t('accessPlatform')}</Text>
                </Button>
              </Link>
            </Navbar.CollapseItem>
          )}
          {navbarLinks.map((item, index) => (
            <Navbar.CollapseItem
              key={item.name}
              css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', h: 'auto' }}
            >
              <Link href={item.href}>
                <Text weight={'bold'}>{item.name}</Text>
              </Link>
            </Navbar.CollapseItem>
          ))}

          {user && (
            <div>
              <Navbar.CollapseItem key="profile-item">
                <div className="mr-auto ml-auto flex flex-col items-center justify-center gap-x-4 px-6">
                  <Link href="/profile" className="mb-3 flex gap-7">
                    <Text weight={'extrabold'}>Seu perfil</Text>
                    <Avatar
                      bordered
                      className="h-10 w-10 rounded-full object-cover"
                      src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                      alt={t('profilePicture')}
                    />
                    <Button icon={<GiExitDoor />} auto color={'error'} onClick={logout} />
                  </Link>
                </div>
                {/* <Text>{user?.name || session?.user?.name}</Text> */}
              </Navbar.CollapseItem>

              <Navbar.CollapseItem
                key="indicate-item"
                css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Button css={{ background: '#17c964' }} color={''} onPress={() => setVisible(true)}>
                  <Text weight={'bold'}>{t('indicateAndWin')}</Text>
                </Button>
              </Navbar.CollapseItem>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
