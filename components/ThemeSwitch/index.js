import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      data-testid="ThemeSwitch"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-white dark:text-black cursor-pointer rounded-full border-transparent bg-transparent p-2"
    >
      {theme === 'light' ? (
        <MoonIcon
          data-testid="dark"
          id="change-to-dark-theme"
          className="h-5 w-5 text-primary-300"
        />
      ) : (
        <SunIcon
          data-testid="light"
          id="change-to-light-theme"
          className="h-5 w-5 text-primary-300"
        />
      )}
    </button>
  )
}
