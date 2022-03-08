import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true), []
  })

  if (!mounted) return null
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="bg-black text-white dark:bg-white dark:text-black rounded-full p-2"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-primary-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-primary-300" />
      )}
    </button>
  )
}
