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
      className="rounded-full bg-black p-2 text-white dark:bg-white dark:text-black"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-blue-500" />
      ) : (
        <SunIcon className="h-5 w-5 text-blue-500" />
      )}
    </button>
  )
}
