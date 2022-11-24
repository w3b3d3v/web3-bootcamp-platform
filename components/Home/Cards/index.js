import React from 'react'

export default function HomeCards({ cards }) {
  const backgroundColor = (index) => {
    switch (index) {
      case 0:
        return 'from-green-400 to-teal-400'
      case 1:
        return 'from-teal-400 to-violet-500'
      case 2:
        return 'from-violet-500 to-purple-500'
      case 3:
        return 'from-purple-400 to-pink-500'
      case 4:
        return 'from-pink-400 to-orange-500'
      default:
        return 'from-green-400 to-teal-400'
    }
  }

  return ( 
    <footer>
      <div className="mx-auto max-w-4xl flex flex-col items-center justify-between py-4 text-center text-sm lg:flex-row lg:items-stretch">
        {cards.map((card, index) => (
          <div
            key={card}
            className={`h-32 w-44 rounded-lg bg-gradient-to-br mb-6 mr-0 lg:mr-6 ${backgroundColor(
              index
            )} p-1 `}
          >
            <div className="text-black flex h-full w-full items-center rounded-lg bg-slate-50 text-center shadow-xl dark:bg-zinc-900 dark:text-slate-50 sm:p-1 md:p-3 lg:p-4 ">
              {card}
            </div>
          </div>
        ))}
      </div>
      <br />
    </footer>
  )
}
