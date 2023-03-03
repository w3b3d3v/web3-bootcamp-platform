import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import { withPublic } from '../../hooks/route'
import { auth } from '../../firebase/initFirebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import Head from 'next/head'
import { Button } from '@nextui-org/react'
import LoginButton from '../../components/LoginButton'
import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'


function authPage() {
  const { login, loginGoogle, loginGithub } = useAuth()
  const [showpass, setShowPass] = useState(false)

  const [isDisable, setIsDisable] = useState(false)
  const { register, handleSubmit } = useForm()
  const [email, setEmail] = useState('')

  const onLoginSubmit = (data) => login(data)
  const onLoginError = (errors, e) => {
    toast.error(errors, e, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  function handleResetPassword(auth, email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Email enviado com sucesso')
        setIsDisable(false)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        errorCode.includes('not-found')
          ? toast.error('Email não encontrado')
          : toast.error(errorMessage)
      })
  }
  const denyLogin = () => {
    sessionStorage.clear()
    Router.push('/auth')
  }

  return (
    <>
      <Head>
        <title>Login -Web3Dev</title>
      </Head>
      <div className="">
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
          {sessionStorage.getItem('credential') ? (
            <>
              <div className="w-full rounded bg-white-100 px-6 py-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
                <h3>Deseja vincular o github à sua conta já cadastrada?</h3>
                <div className="flex w-full justify-around">
                  <Button customClass={'bg-slate-300'} onClick={() => denyLogin()}>
                    Não
                  </Button>
                  <Button onClick={() => loginGoogle()}>Sim</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full rounded  px-6 py-6 shadow-lg m:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
              <p
                tabIndex={0}
                className="text-2xl font-extrabold leading-6 focus:outline-none"
              >
                {isDisable ? 'Resete sua senha' : 'Entre na sua conta'}
              </p>
              <p
                tabIndex={0}
                className="mt-3 text-sm font-medium leading-none text-black-100 focus:outline-none dark:text-gray-300"
              >
                Não tem uma conta?{' '}
                <Link
                  href="/auth/signup"
                  className="cursor-pointer text-sm font-medium leading-none text-primary-300 hover:text-gray-500 hover:no-underline focus:text-gray-500 focus:no-underline focus:outline-none dark:text-primary-300"
                >
                  <span className="cursor-pointer text-primary-300 transition duration-150 ease-in-out hover:text-primary-400 dark:text-primary-300">
                    Registre-se agora!
                  </span>
                </Link>
              </p>
              {!isDisable ? (
                <form onSubmit={handleSubmit(onLoginSubmit, onLoginError)}>
                  <div className="pt-6">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      aria-labelledby="email"
                      type="email"
                      className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                      placeholder="ex: silva@gmail.com"
                      onInputCapture={(e) => setEmail(e.target.value)}
                      {...register('email', {
                        required: 'Por favor, insira seu e-mail',
                        message: 'E-mail invalido',
                        pattern:
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                      })}
                    />
                  </div>
                  <div className="mt-6 w-full">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                    >
                      {' '}
                      Senha{' '}
                    </label>
                    <div className="relative flex items-center justify-center">
                      <input
                        id="password"
                        type={showpass ? 'text' : 'password'}
                        className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800"
                        placeholder=""
                        {...register('password', {
                          required: 'Por favor, insira sua senha',
                          message: 'Verifique sua senha',
                          min: 8,
                        })}
                      />

                      <div
                        onClick={() => setShowPass(!showpass)}
                        className="absolute right-0 mt-2 mr-3 cursor-pointer"
                      >
                        <div id="show">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                              fill="#71717A"
                            />
                          </svg>
                        </div>
                        <div id="hide" className="hidden">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-eye-off"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#27272A"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <line x1={3} y1={3} x2={21} y2={21} />
                            <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                            <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className="w-fit cursor-pointer text-xs text-indigo-300 hover:underline"
                        onClick={() => setIsDisable(true)}
                      >
                        Esqueci minha senha
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      role="button"
                      className="w-full rounded bg-primary-300 py-4 text-sm font-semibold leading-none text-white-100 transition duration-150 ease-in-out hover:bg-primary-400 focus:outline-none focus:ring-0 focus:ring-primary-300 focus:ring-offset-2 dark:text-black-300"
                      type="submit"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="pt-6">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      aria-labelledby="email"
                      type="email"
                      className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                      placeholder="ex: silva@gmail.com"
                      onInputCapture={(e) => setEmail(e.target.value)}
                      {...register('email', {
                        required: 'Por favor, insira seu e-mail',
                        message: 'E-mail invalido',
                        pattern:
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                      })}
                    />
                  </div>
                  <div className="mt-8">
                    <button
                      role="button"
                      className="w-full rounded bg-primary-300 py-4 text-sm font-semibold leading-none text-white-100 transition duration-150 ease-in-out hover:bg-primary-400 focus:outline-none focus:ring-0 focus:ring-primary-300 focus:ring-offset-2 dark:text-black-300"
                      onClick={() => handleResetPassword(auth, email)}
                    >
                      Resetar Senha
                    </button>
                  </div>
                </>
              )}

              <div className="flex w-full items-center justify-between py-5">
                <hr className="w-full bg-gray-400" />
                <p className="px-2.5 text-base font-medium leading-4 text-gray-500">OU</p>
                <hr className="w-full bg-gray-400" />
              </div>
                <div className='flex flex-col gap-3'>
                  <Button
                    onClick={() => loginGithub()}
                    icon={<GrGithub/>}
                    size={'lg'}
                    color={''}
                    bordered
                  >
                
                  Login com o Github
                </Button>
                
                <Button
                  icon={<FcGoogle/>}
                  alt="Google-Login-Icon"
                  onClick={() => loginGoogle()}
                  size={'lg'}
                  color={''}
                  bordered
                >
                  Login com o Google
                </Button>
                </div>
              </div>
          )}
        </div>
      </div>
    </>
  )
}

export default withPublic(authPage)
