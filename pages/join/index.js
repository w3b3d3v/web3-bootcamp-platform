import Image from 'next/image'
import Head from 'next/head'
import useAuth from '../../hooks/useAuth'
import { withPublic } from '../../hooks/route'
import { Button } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'
import { signIn, useSession } from 'next-auth/react'

function signUpPage() {
  const { loginGoogle, loginGithub } = useAuth()

  return (
    <>
      <Head>
        <title>Join WEB3DEV</title>
      </Head>

      <div>
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
          <div className=" mb-6 flex items-center justify-center sm:mb-8 sm:flex sm:items-center md:hidden lg:hidden">
            <Image src="/assets/img/w3d-logo-symbol-ac.svg" width={42} height={42} />
            <h2 className="pl-3 text-xl font-bold leading-normal sm:block">web3dev</h2>
          </div>
          <div className="d w-full  rounded px-6 py-6 shadow-lg sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <p
              tabIndex={0}
              className="text-center text-2xl font-extrabold leading-6 focus:outline-none "
            >
              Join WEB3DEV now
            </p>

            <div className="flex w-full items-center justify-between py-5"></div>
            <div className="flex flex-col gap-3">
              <Button
                id={'sign-in-with-github'}
                onPress={() => loginGithub()}
                icon={<GrGithub />}
                size={'lg'}
                color={''}
                bordered
              >
                Login com o Github
              </Button>
              <Button
                id={'sign-in-with-google'}
                icon={<FcGoogle />}
                alt="Google-Login-Icon"
                onPress={() => loginGoogle()}
                size={'lg'}
                color={''}
                bordered
              >
                Login com o Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

signUpPage.getInitialProps = () => {
  return {
    hideNavbar: true,
    hideFooter: true,
  }
}

export default withPublic(signUpPage, signIn('discord', { callbackUrl: '/join/discord' }))
