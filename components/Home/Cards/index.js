import React from 'react'

export default function HomeCards() {
  return (
    <footer>
        <div className="container mx-auto flex flex-col items-center justify-between px-6 py-2 text-center text-sm sm:px-6 md:px-6 lg:flex-row lg:items-stretch lg:px-32 xl:py-0">
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Bootcamp 100% gratuito, sempre!
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-green-400 to-violet-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Construa sua própria DAO com JavaScript em uma semana
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Aprendizado baseado em projetos
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-fuchsia-400 to-pink-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Ganhe um NFT para cada projeto finalizado
            </div>
          </div>
          <div className="m-3 h-20 w-44 rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 p-1 lg:h-32">
            <div className="text-black flex h-full w-full items-center  rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4">
              Trabalhe como dev em projetos web3
            </div>
          </div>
        </div>
        <br />
      </footer>
  )
}
