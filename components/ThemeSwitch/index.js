import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

import { CgMoon } from 'react-icons/cg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

  return <Switch 
  shadow 
  color={'secondary'} 
  iconOn={<CgMoon/>}  
  checked={isDark}
  onChange={(e) => 
  setTheme(e.target.checked ? 'dark' : 'light')}
  >
    </Switch>
}
