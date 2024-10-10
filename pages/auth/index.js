import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import { withPublic } from '../../hooks/route'
import { auth } from '../../firebase/initFirebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import Head from 'next/head'
import { Button } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'
import { useTranslation } from 'react-i18next'

function authPage() {
  const { login, signup, loginGoogle, loginGithub } = useAuth()
  const [showpass, setShowPass] = useState(false)
  const { t } = useTranslation()
  const [isSignUp, setIsSignUp] = useState(false)

  const { register, handleSubmit, watch } = useForm()
  const email = watch('email')

  const onSubmit = (data) => {
    if (isSignUp) {
      signup(data)
    } else {
      login(data)
    }
  }

  function handleResetPassword() {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(t('messages.email_sent_success'))
        })
        .catch((error) => {
          const errorMessage = error.message
          toast.error(errorMessage)
        })
    } else {
      toast.error(t('form.enter_email'))
    }
  }

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Login'} - WEB3DEV</title>
      </Head>
      <div>
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
          <div className="m:px-6 w-full rounded px-6 py-6 shadow-lg sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <p tabIndex={0} className="text-2xl font-extrabold leading-6 focus:outline-none">
              {isSignUp ? t('buttons.register') : t('buttons.sign_in')}
            </p>
            <p
              tabIndex={0}
              className="mt-3 text-sm font-medium leading-none text-black-100 focus:outline-none dark:text-gray-300"
            >
              {isSignUp ? t('form.already_have_account') : t('form.no_account')}{' '}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="cursor-pointer text-sm font-medium leading-none text-primary-300 hover:text-gray-500"
              >
                {isSignUp ? t('buttons.sign_in') : t('buttons.register_now')}
              </span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="ex: silva@gmail.com"
                  {...register('email', {
                    required: t('form.enter_email'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('form.invalid_email'),
                    },
                  })}
                />
              </div>
              <div className="mt-6 w-full">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                >
                  {t('form.password')}
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    id="password"
                    type={showpass ? 'text' : 'password'}
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800"
                    placeholder=""
                    {...register('password', {
                      required: t('form.enter_password'),
                      message: t('form.verify_password'),
                      min: 8,
                    })}
                  />
                  <div
                    onClick={() => setShowPass(!showpass)}
                    className="absolute right-0 mt-2 mr-3 cursor-pointer"
                  >
                    <img
                      src="/assets/img/eye.svg"
                      alt={showpass ? 'Hide Password' : 'Show Password'}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  role="button"
                  className="w-full rounded bg-primary-300 py-4 text-sm font-semibold leading-none text-white-100 transition duration-150 ease-in-out hover:bg-primary-400 focus:outline-none focus:ring-0 focus:ring-primary-300 focus:ring-offset-2 dark:text-black-300"
                  type="submit"
                >
                  {isSignUp ? t('buttons.register') : t('buttons.log_in')}
                </button>
              </div>
            </form>
            {isSignUp && (
              <div className="mt-8">
                <p
                  className="w-fit cursor-pointer text-xs text-indigo-300 hover:underline"
                  onClick={() => handleResetPassword(email)}
                ></p>
              </div>
            )}
            {!isSignUp && (
              <div className="mt-8">
                <p
                  className="w-fit cursor-pointer text-xs text-indigo-300 hover:underline"
                  onClick={handleResetPassword}
                >
                  {t('buttons.forgot_password')}
                </p>
              </div>
            )}
            <div className="flex w-full items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <p className="px-2.5 text-base font-medium leading-4 text-gray-500">{t('form.or')}</p>
              <hr className="w-full bg-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                id={'sign-in-with-github'}
                onClick={() => loginGithub()}
                icon={<GrGithub />}
                size={'lg'}
                color={''}
                bordered
              >
                {t('buttons.login_with_github')}
              </Button>
              <Button
                id={'sign-in-with-google'}
                icon={<FcGoogle />}
                alt="Google-Login-Icon"
                onClick={() => loginGoogle()}
                size={'lg'}
                color={''}
                bordered
              >
                {t('buttons.login_with_google')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withPublic(authPage)
