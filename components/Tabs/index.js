import React, { useState } from 'react'
const Tabs = (course) => {
  console.log('course', course)
  const [activeStatus, setActiveStatus] = useState(1)
  return (
    <div>
      <div className="relative mx-auto w-11/12 sm:hidden">
        <div className="absolute inset-0 z-0 m-auto mr-4 h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-selector"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#A0AEC0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="8 9 12 5 16 9" />
            <polyline points="16 15 12 19 8 15" />
          </svg>
        </div>
        <select
          aria-label="Selected tab"
          className="form-select relative z-10 block w-full appearance-none rounded border border-gray-300 bg-transparent p-3 text-gray-600"
        >
          <option className="text-sm text-gray-600">Inativo </option>
          <option className="text-sm text-gray-600">Inativo </option>
          <option selected className="text-sm text-gray-600">
            Ativo{' '}
          </option>
          <option className="text-sm text-gray-600">Inativo </option>
          <option className="text-sm text-gray-600">Inativo </option>
        </select>
      </div>
      <div className="hidden h-12 rounded sm:block xl:mx-0 xl:w-full">
        <ul className="flex border-b px-5">
          <li
            onClick={() => setActiveStatus(1)}
            className={
              activeStatus == 1
                ? 'mr-12 rounded-t border-primary-300 pt-3 text-sm text-primary-300'
                : 'mr-12 flex cursor-pointer items-center py-3 text-sm text-gray-600 hover:text-primary-300'
            }
          >
            <div className="mb-3 flex items-center">
              <span className="ml-1 font-normal">
                {activeStatus == 1 ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            {activeStatus == 1 && (
              <div className="h-1 w-full rounded-t-md bg-primary-300" />
            )}
          </li>
          <li
            onClick={() => setActiveStatus(2)}
            className={
              activeStatus == 2
                ? 'mr-12 rounded-t border-primary-300 pt-3 text-sm text-primary-300'
                : 'mr-12 flex cursor-pointer items-center py-3 text-sm text-gray-600 hover:text-primary-300'
            }
          >
            <div className="mb-3 flex items-center">
              <span className="ml-1 font-normal">
                {activeStatus == 2 ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            {activeStatus == 2 && (
              <div className="h-1 w-full rounded-t-md bg-primary-300" />
            )}
          </li>
          <li
            onClick={() => setActiveStatus(3)}
            className={
              activeStatus == 3
                ? 'mr-12 rounded-t border-primary-300 pt-3 text-sm text-primary-300'
                : 'mr-12 flex cursor-pointer items-center py-3 text-sm text-gray-600 hover:text-primary-300'
            }
          >
            <div className="mb-3 flex items-center">
              <span className="ml-1 font-normal">
                {activeStatus == 3 ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            {activeStatus == 3 && (
              <div className="h-1 w-full rounded-t-md bg-primary-300" />
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Tabs
