import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { Switch } from '@nextui-org/react'

import { CgMoon } from 'react-icons/cg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <Switch shadow color={'secondary'} iconOn={<CgMoon/>} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}></Switch>
}
