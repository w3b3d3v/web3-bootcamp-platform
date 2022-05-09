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
      className="bg-transparent text-white border-transparent dark:text-black rounded-full p-2"
    >
      {theme === 'light' ? (
        <MoonIcon id='change-to-dark-theme' className="h-5 w-5 text-primary-300" />
      ) : (
        <SunIcon id='change-to-light-theme' className="h-5 w-5 text-primary-300" />
      )}
    </button>
  )
}
