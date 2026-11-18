import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      return window.localStorage.getItem('gwabs-theme') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    if (theme === 'light') {
      root.classList.add('theme-light')
      root.classList.remove('theme-dark')
    } else {
      root.classList.add('theme-dark')
      root.classList.remove('theme-light')
    }
    try {
      window.localStorage.setItem('gwabs-theme', theme)
    } catch {
      // ignore storage errors in restricted environments
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
