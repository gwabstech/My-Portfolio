import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/company.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'glass-card shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold text-offwhite font-outfit">
          <img src="/favicon.svg" alt="GWABS logo" className="h-9 w-9 rounded-lg" />
          GWABS<span className="text-teal">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.filter(l => l.to !== '/').map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-teal' : 'text-slate hover:text-teal'}`}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-gradient font-semibold text-sm py-2 px-5 rounded-full">Get in touch</Link>
        </div>
        <button className="md:hidden text-slate" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-card border-t border-surface-border py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="text-slate hover:text-teal text-lg font-medium">{l.label}</NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
