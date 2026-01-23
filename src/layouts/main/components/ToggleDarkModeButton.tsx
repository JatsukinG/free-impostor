import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Text } from '@components'

const ToggleDarkModeButton = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    setIsDark(newIsDark)
  }

  return (
      <button
          aria-label="Toggle theme"
          onClick={() => toggleDarkMode()}
          className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
      >
        <Text className="flex items-center gap-2" weight="medium">
          <span>
            {isDark ? <FaMoon/> : <FaSun/>}
          </span>
          {isDark ? 'Oscuro' : 'Claro'}
        </Text>
      </button>
  )
}

export default ToggleDarkModeButton