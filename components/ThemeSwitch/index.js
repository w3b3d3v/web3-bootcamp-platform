import { useState, useEffect } from 'react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

import { CgMoon } from 'react-icons/cg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { isDark } = useTheme() // Ensure useTheme is called on every render
  const { setTheme } = useNextTheme() // Ensure useNextTheme is called on every render

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Switch
      shadow
      color={'secondary'}
      iconOn={<CgMoon />}
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      data-testid="ThemeSwitch"
    ></Switch>
  )
}
