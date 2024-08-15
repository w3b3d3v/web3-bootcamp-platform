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
        <div className="flex items-center justify-center">
          <button
            id={id}
            className={`dark:hover:bg-grey-400 fw-bold mb-5 flex
            w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-none bg-white-100 py-1 font-bold text-gray-700 hover:scale-[1.02] hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 dark:text-black-200`}
            onClick={() => loginGithub()}
          >
            {buttonImage()}
            {textContent}
          </button>
        </div>
      ) : (
        <section className="flex w-full items-center justify-center rounded-lg bg-white-100 hover:scale-[1.02] hover:bg-gray-300">
          {buttonImage()}
          <button
            id={id}
            className="cursor-pointer border-none bg-transparent font-bold text-gray-700 dark:text-black-200"
              onClick={() => loginGoogle()}
          >
            {textContent}
          </button>
        </section>
      )}
    </>
  )
}
