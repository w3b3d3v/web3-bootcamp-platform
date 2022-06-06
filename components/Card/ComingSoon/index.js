import React from 'react'

export default function ComingSoonCard() {
  return (
    <>
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200 min-w-full">
          <div className="flex min-w-full">
            <div className="px-6 py-5 min-w-full items-center flex justify-between">
              <div className='flex-col'>
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
              &#x1F98F; Está chegando a hora!
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Estamos finalizando os últimos preparativos para o evento. Volte para conferir em breve!
              </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
