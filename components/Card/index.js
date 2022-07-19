import React from 'react'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { ClockIcon } from '@heroicons/react/solid'

export default function Card(props) {
  const { title, img, desc, duration, difficulty, active, children, id, tags } = props
  const ref = React.createRef()
  return (
    <>
      <div
        data-testid="card"
        className={`flex flex-col justify-between overflow-hidden rounded-lg bg-white-200 shadow-xl dark:bg-black-400 ${
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
                className="h-full w-full cursor-pointer"
              />
            </Link>
          ) : (
            <img src={img} alt={title} className="h-full w-full" />
          )}
        </div>
        <div className="bg-white flex h-full flex-col justify-between" data-testid="course-data">
          <div className="flex items-center justify-between px-6 pt-4">
            <div className="jus flex items-center text-black-300 dark:text-white-100">
              <ClockIcon className="h-4 w-4 md:h-4 md:w-4" />
              <p className="ml-2 mb-0 p-0 pb-3 text-xs">{duration ? duration : 'Em breve...'}</p>
            </div>
            {difficulty === 'Iniciante' ? (
              <div className="rounded-full bg-green-200 px-6">
                <p data-testid="difficulty-level" className="text-xs font-bold text-green-500">
                  {difficulty}
                </p>
              </div>
            ) : difficulty === 'Intermediário' ? (
              <div className="rounded-full bg-yellow-200 px-6">
                <p data-testid="difficulty-level" className="text-xs font-bold text-yellow-500">
                  {difficulty}
                </p>
              </div>
            ) : difficulty === 'Avançado' ? (
              <div className="rounded-full bg-red-200 px-6">
                <p data-testid="difficulty-level" className="text-xs font-bold text-red-500">
                  {difficulty}
                </p>
              </div>
            ) : (
              <div className="rounded-full bg-gray-200 px-6">
                <p data-testid="difficulty-level" className="text-xs font-bold text-gray-500">
                  {difficulty}
                </p>
              </div>
            )}
          </div>
          <div className="flex h-full flex-col justify-between p-4">
            <div>
              <h2 className="text-lg font-semibold">
                {active ? (
                  <Link href={`/courses/${id}`}>
                    <a id={`access-course-title`} className="text-black-100 dark:text-white-100">
                      {title.substring(0, 60) + '...'}
                    </a>
                  </Link>
                ) : (
                  title.substring(0, 60) + '...'
                )}
              </h2>
            </div>

            <p className="h-10 break-normal py-2 text-xs text-gray-600 dark:text-white-100">
              {desc.substring(0, 100) + '...'}
            </p>
            <div className="lg:justify-left mt-4 flex flex-wrap items-center">
              {tags?.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="mr-2 mt-2 rounded-full bg-gray-200 p-2 text-center text-xs font-bold text-gray-500 xl:px-4"
                  >
                    {tag}
                  </div>
                )
              })}
            </div>

            <div>
              {active ? (
                <Link href={`/courses/${id}`}>
                  <Button id={`access-course-button`} ref={ref} customClass="w-full mt-3">
                    Ver projeto
                  </Button>
                </Link>
              ) : (
                <div className="mt-3 rounded-full bg-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-500 xl:px-4">
                  Em breve
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
