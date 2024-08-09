import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@nextui-org/react'
import { CgMoon, CgSun } from 'react-icons/cg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <Switch
      shadow
      color="secondary"
      checked={isDark}
      icon={isDark ? <CgMoon className="text-white" /> : <CgSun className="text-black" />}
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
    />
  )
}
