import { Link, Input } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeSwitch from '../ThemeSwitch'
import { Button as NUButton } from '@nextui-org/react'
import constants from '../../lib/constants'
import { Navbar, Text, Dropdown, Button, useModal, Modal, Grid, Avatar, Image } from '@nextui-org/react'
import { GiExitDoor } from 'react-icons/gi'

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
  const ref = React.createRef()
  const navbarLinks = [
   {
     name:"Builds",
     href:"/courses"
   },
   ]

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
     getUser()
  }, [user])

  return (

    <>  
        <Navbar variant={'floating'} isBordered={true} >
            <Link href="/">
              <Navbar.Brand css={{ gap:'$5' }} >
                <Image width={42} height={42} src="/assets/img/w3d-logo-symbol-ac.svg" />
                <Text weight={'bold'}>WEB3DEV</Text>
                <ThemeSwitch />
              </Navbar.Brand>
            </Link>

            {/* <Navbar.Content hideIn={'md'} >
              {process.env.NEXT_PUBLIC_ENVIRONMENT && (
                <div className="w-1/3 bg-gradient-to-r from-green-400 to-violet-500 text-center font-semibold tracking-widest">
                {process.env.NEXT_PUBLIC_ENVIRONMENT}
                </div>)
              }
            </Navbar.Content> */}
              {/* {navbarLinks.map((link) => (
                <Navbar.Link key={link.name} href={link?.href} target="_blank">
                  {link?.name}
                </Navbar.Link>
              ))} */} 
              
              <Navbar.Content hideIn={'sm'} >
                <Navbar.Link href="/courses">
                  <Button auto rounded css={{ background:'$blue300' }} icon={<FaEthereum color='black' />}>
                    <Text weight={'extrabold'}>Builds</Text>
                  </Button>
                </Navbar.Link>
                
                
              </Navbar.Content> 
              
              <Navbar.Content> 
                {user?.uid && (
                  <Navbar.Content hideIn={'md'} >
                    <NUButton auto color={''} onPress={() => setVisible(true)}>
                    <Text weight={'bold'} >Indique e ganhe</Text>
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
                          <Input
                            width="100%"
                            value={window.location.origin + '?referred_by=' + user?.uid}
                          ></Input>
                        </Text>
                      </Modal.Body>
                      <Modal.Footer>
                        <NUButton auto flat onPress={() => setVisible(false)}>
                          Fechar
                        </NUButton>
                      </Modal.Footer>
                    </Modal>
                  </Navbar.Content  >
                )}
                {user ? (
                    <Navbar.Content hideIn={'md'} > 
                        <Dropdown onChange={() => setProfile(!profile)}>
                          <Dropdown.Button  bordered={'md'} borderWeight={'light'} flat >
                            <Grid.Container gap={2}>
                          <Avatar
                          size="lg"
                          src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                          zoomed
                          bordered
                          />
                        </Grid.Container>
                        {/* <Navbar.CollapseItem 
                        css={{ display:'flex', alignItems:'center', justifyContent:'center' }}
                        >
                          <Button color={''} onPress={() => setVisible(true)} >
                            <Text weight={'bold'} >Indique e Ganhe</Text>
                          </Button>
                        </Navbar.CollapseItem> */}
                      </Dropdown.Button>
                        <Dropdown.Menu css={{ display:'flex', alignItems:'center', flexDirection:'column', gap:'$5' }} >
                          <Dropdown.Item>
                              <Link href="/profile">
                                <Text weight={'bold'} >Meu perfil</Text>
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
                            <Text weight={'bold'} >Sair</Text>
                            </Button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Navbar.Content>
          
                ) : (
                  <Navbar.Content hideIn={'sm'} >
                    <Link href="/auth">
                      <Button color={'secondary'} id="login" bordered ref={ref}  >
                        <Text weight={'bold'} >Acessar Plataforma</Text>
                      </Button>
                    </Link>
                  </Navbar.Content>
                )}
                <Navbar.Toggle showIn="md" />
              </Navbar.Content>
              
              <Navbar.Collapse>

              {!user && (
              <Navbar.CollapseItem 
              css={{ display:'flex', alignItems:'center', justifyContent:'center' }}
              >
                <Link href='/auth' >
                  <Button color={'secondary'} bordered >
                    <Text weight={'bold'} >Acessar Plataforma</Text>
                  </Button>
                </Link>
              </Navbar.CollapseItem>
              )}
              {navbarLinks.map((item, index) => (
              <Navbar.CollapseItem css={{ display:'flex', alignItems:'center', justifyContent:'center', h:'auto' }}
              >
                <Link
                  href={item.href}
                >
                  <Text weight={'bold'} >{item.name}</Text>
                </Link>
              </Navbar.CollapseItem>
              ))}

              {user && (
                <div>
                  <Navbar.CollapseItem>
                   <div className="flex items-center justify-center gap-x-4 px-6 flex-col mr-auto ml-auto">
                        <Link href="/profile" className='flex gap-7 mb-3' >
                          <Text weight={'extrabold'} >Seu perfil</Text>
                          <Avatar
                            bordered
                            className="h-10 w-10 rounded-full object-cover"
                            src={firestoreUser?.photoUrl || '/assets/img/default_avatar.svg'}
                            alt="Foto de perfil"
                          />
                          <Button icon={<GiExitDoor/>} auto color={'error'}  onClick={logout} />
                        </Link>
                    </div>
                    <Text>{user?.name || session?.user?.name}</Text>
                  </Navbar.CollapseItem>
                  
                  <Navbar.CollapseItem
              css={{ display:'flex', alignItems:'center', justifyContent:'center' }}
              >
                <Button color={''} onPress={() => setVisible(true)} >
                  <Text weight={'bold'} >Indique e Ganhe</Text>
                </Button>
              </Navbar.CollapseItem>
                </div>
              ) }

              </Navbar.Collapse>
        </Navbar>

      
    </>
  )
}
