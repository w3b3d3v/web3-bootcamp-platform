import React from 'react'
import Link from 'next/link'

import Button from '../../components/Button'
import { ClockIcon } from '@heroicons/react/solid'

export default function Card(props) {
  const { title, img, desc, duration, difficulty, active, children, id } = props
  return (
    <>
      <div
        className={`rounded-lg bg-white-200 shadow-xl dark:bg-black-400 ${
          active ? '' : 'cursor-default select-none opacity-60 dark:opacity-50'
        }`}
      >
        <div>
          {active ? (
            <Link href={`/courses/${id}`}>
              <img
                src={img}
                alt={title}
                className="h-full w-full cursor-pointer rounded-tr-xl rounded-tl-xl"
              />
            </Link>
          ) : (
            <img
              src={img}
              alt={title}
              className="h-full w-full rounded-tr-xl rounded-tl-xl"
            />
          )}
        </div>
        <div className="bg-white">
          <div className="flex items-center justify-between px-6 pt-4">
            <div className="jus flex items-center text-black-300 dark:text-white-100">
              <ClockIcon className="h-4 w-4 md:h-4 md:w-4" />
              <p className="ml-2 mb-0 p-0 text-xs">
                {duration ? duration : 'Em breve...'}
              </p>
            </div>
            {difficulty === 'Iniciante' ? (
              <div className="rounded-full bg-green-200 py-1.5 px-6">
                <p className="text-xs font-bold text-green-500">{difficulty}</p>
              </div>
            ) : difficulty === 'Intermediário' ? (
              <div className="rounded-full bg-yellow-200 py-1.5 px-6">
                <p className="text-xs font-bold text-yellow-500">
                  {difficulty}
                </p>
              </div>
            ) : difficulty === 'Avançado' ? (
              <div className="rounded-full bg-red-200 py-1.5 px-6">
                <p className="text-xs font-bold text-red-500">{difficulty}</p>
              </div>
            ) : (
              <div className="rounded-full bg-gray-200 py-1.5 px-6">
                <p className="text-xs font-bold text-gray-500">{difficulty}</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">
                {active ? (
                  <Link href={`/courses/${id}`}>
                    {title.substring(0, 60) + '...'}
                  </Link>
                ) : (
                  title.substring(0, 60) + '...'
                )}
              </h2>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              {desc.substring(0, 120) + '...'}
            </p>
            <div className="mt-4 flex">
              <div>
                <p className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600">
                  Tags
                </p>
              </div>
              <div className="pl-2">
                <p className="rounded bg-gray-200 py-1 px-2 text-xs text-gray-600">
                  Tags
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 pb-4">
              <div className="flex-no-wrap flex items-center">
                <div className="h-8 w-8 rounded-md bg-cover bg-center">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png"
                    alt="User avatar"
                    className="border-white h-full w-full overflow-hidden rounded-full border-2 object-cover shadow dark:border-gray-700"
                  />
                </div>
                <div className="-ml-2 h-8 w-8 rounded-md bg-cover">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_1.png"
                    alt="User avatar"
                    className="border-white h-full w-full overflow-hidden rounded-full border-2 object-cover shadow dark:border-gray-700"
                  />
                </div>
                <div className="-ml-2 h-8 w-8 rounded-md bg-cover bg-center">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_2.png"
                    alt="User avatar"
                    className="border-white h-full w-full overflow-hidden rounded-full border-2 object-cover shadow dark:border-gray-700"
                  />
                </div>
                <div className="-ml-2 h-8 w-8 rounded-md bg-cover">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_3.png"
                    alt="User avatar"
                    className="border-white h-full w-full overflow-hidden rounded-full border-2 object-cover object-center shadow dark:border-gray-700"
                  />
                </div>
                <div className="-ml-2 h-8 w-8 rounded-md bg-cover">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_4.png"
                    alt="User avatar"
                    className="border-white h-full w-full overflow-hidden rounded-full border-2 object-cover object-center shadow dark:border-gray-700"
                  />
                </div>
              </div>
              {active ? (
                <Link href={`/courses/${id}`}>
                  <Button>Ver projeto</Button>
                </Link>
              ) : (
                <div className=" cursor-default">
                  <Button>Em breve</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
