import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'

import { withPublic } from '../../../hooks/route'

function signUpPage() {
  const { user, signup, logout, loginGoogle } = useAuth()
  const [showpass, setShowPass] = useState(false)

  const { register, handleSubmit } = useForm()
  const onSignUpSubmit = (data) => signup(data)
  const onSignUpError = (errors, e) => {
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

  return (
    <>
      <div className="bg-gray-50 dark:bg-black-300">
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
          <div className=" mb-6 flex items-center justify-center sm:mb-8 sm:flex sm:items-center md:hidden lg:hidden">
            <Image src="/assets/img/logo_icon.svg" width={42} height={42} />
            <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
              web3dev
            </h2>
          </div>
          <div className="w-full rounded bg-white-100 px-6 py-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <p
              tabIndex={0}
              className="text-2xl font-extrabold leading-6 focus:outline-none dark:text-white-100"
            >
              Registre sua conta
            </p>
            <p
              tabIndex={0}
              className="mt-3 text-sm font-medium leading-none text-black-100 focus:outline-none dark:text-gray-300"
            >
              Já tem uma conta?{' '}
              <Link
                href="/auth"
                className="cursor-pointer text-sm font-medium leading-none text-primary-300 hover:text-gray-500 hover:no-underline focus:text-gray-500 focus:no-underline focus:outline-none dark:text-primary-300"
              >
                <span className="cursor-pointer text-primary-300 transition duration-150 ease-in-out hover:text-primary-400 dark:text-primary-300">
                  Entre agora!
                </span>
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSignUpSubmit, onSignUpError)}>
              <div className="pt-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                >
                  {' '}
                  E-mail{' '}
                </label>
                <input
                  id="email"
                  aria-labelledby="email"
                  type="email"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                  placeholder="ex: silva@gmail.com"
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
              </div>
              <div className="mt-8">
                <button
                  role="button"
                  className="w-full rounded bg-primary-300 py-4 text-sm font-semibold leading-none text-white-100 transition duration-150 ease-in-out hover:bg-primary-400 focus:outline-none focus:ring-0 focus:ring-primary-300 focus:ring-offset-2 dark:text-black-300"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </form>

            <div className="flex w-full items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <p className="px-2.5 text-base font-medium leading-4 text-gray-500">
                OU
              </p>
              <hr className="w-full bg-gray-400" />
            </div>

            <button
              aria-label="Continue com google"
              role="button"
              className="flex w-full items-center rounded-lg border border-gray-700 p-3 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 dark:text-white-100 dark:hover:bg-black-100"
              onClick={() => loginGoogle()}
            >
              <svg
                width={19}
                height={20}
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                  fill="#4285F4"
                />
                <path
                  d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                  fill="#34A853"
                />
                <path
                  d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                  fill="#EB4335"
                />
              </svg>
              <p className="ml-4 text-base font-medium ">Entrar com Google</p>
            </button>
          </div>
          <div className="ml-8 mt-6 md:mt-0 md:w-1/2 lg:ml-16 xl:w-1/3">
            <div className="mt-8 flex items-start">
              <p className="pl-2.5 text-xl leading-7 text-gray-600 sm:text-2xl">
                Vamos inserir algo aqui
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withPublic(signUpPage)
