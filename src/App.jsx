import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { ThemeProvider } from './lib/theme.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

function HashScrollHandler() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el && typeof el.scrollIntoView === 'function') {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      }
    } else if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        // ignore in jsdom
      }
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-navy text-offwhite transition-colors duration-300">
        <Nav />
        <HashScrollHandler />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
      </div>
    </ThemeProvider>
  )
}
