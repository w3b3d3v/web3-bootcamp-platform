import React from 'react'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { ClockIcon } from '@heroicons/react/solid'

export default function Card(props) {
  const { title, img, desc, duration, difficulty, active, children, id, tags } = props
  const ref = React.createRef();
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
                id={`access-course-image`}
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
              <p className="ml-2 mb-0 p-0 text-xs pb-3">
                {duration ? duration : 'Em breve...'}
              </p>
            </div>
            {difficulty === 'Iniciante' ? (
              <div className="rounded-full bg-green-200 px-6">
                <p className="text-xs font-bold text-green-500">{difficulty}</p>
              </div>
            ) : difficulty === 'Intermediário' ? (
              <div className="rounded-full bg-yellow-200 px-6">
                <p className="text-xs font-bold text-yellow-500">
                  {difficulty}
                </p>
              </div>
            ) : difficulty === 'Avançado' ? (
              <div className="rounded-full bg-red-200 px-6">
                <p className="text-xs font-bold text-red-500">{difficulty}</p>
              </div>
            ) : (
              <div className="rounded-full bg-gray-200 px-6">
                <p className="text-xs font-bold text-gray-500">{difficulty}</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">
                {active ? (
                  <Link href={`/courses/${id}`}>
                    <a id={`access-course-title`} className='text-black-100 dark:text-white-100'>
                    {title.substring(0, 60) + '...'}
                    </a>
                  </Link>
                ) : (
                  title.substring(0, 60) + '...'
                )}
              </h2>
            </div>
            <p className="mt-2 text-xs text-gray-600 break-normal dark:text-white-100">
              {desc.substring(0, 100) + '...'}
            </p>
            <div className="mt-4 flex items-center lg:justify-center  xl:flex-nowrap xl:justify-end">
              {tags?.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="rounded-full bg-gray-200 px-2 xl:px-4 text-center mr-2"
                  >
                    <p className="text-xs font-bold text-gray-500">{tag}</p>
                    </div>
                )
              })}
               {active ? (
                <Link href={`/courses/${id}`}>
                  <Button id={`access-course-button`} ref={ref}>Ver projeto</Button>
                </Link>
              ) : (
                <div className=" cursor-default">
                  <Button ref={ref} disabled>Em breve</Button>
                </div>
              )}
            </div>
            
              </div>
            </div>
          </div>
    </>
  )
}
