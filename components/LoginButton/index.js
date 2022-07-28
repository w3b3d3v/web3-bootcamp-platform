import Image from 'next/image'
import React from 'react'

export default function LoginButton(props) {
  const { imgSrc, textContent, id, imgSize, loginGithub, loginGoogle } = props

  const buttonImage = () => (
    <Image src={imgSrc} alt={textContent} width={imgSize} height={imgSize} />
  )
  return (
    <>
      {id.includes('github') ? (
        <section className="flex items-center justify-center">
          <button
            id={id}
            className={`dark:hover:bg-grey-400 fw-bold mb-5 flex
            w-full cursor-pointer items-center justify-evenly rounded-lg border border-gray-700 bg-white-100  text-xl text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 dark:text-black-200`}
            onClick={() => loginGithub()}
          >
            {buttonImage()}
            {textContent}
          </button>
        </section>
      ) : (
        <section className="flex w-full items-center justify-center">
          {buttonImage()}
          <button
            id={id}
            className="cursor-pointer border-none bg-transparent hover:underline"
            onClick={() => loginGoogle()}
          >
            {textContent}
          </button>
        </section>
      )}
    </>
  )
}
