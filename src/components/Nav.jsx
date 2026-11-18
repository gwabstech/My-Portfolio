import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks, media } from '../data/company.js'
import { solutions } from '../data/solutions.js'
import { useTheme } from '../lib/theme.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav
          aria-label="Primary navigation"
          className={`rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'glass-card shadow-2xl border-teal/30'
              : 'bg-navy-deep/75 backdrop-blur-md border border-surface-border/70'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold text-offwhite font-outfit tracking-tight group"
          >
            <div className="relative">
              <img
                src="/favicon.svg"
                alt="GWABS logo"
                className="h-9 w-9 rounded-xl ring-1 ring-teal/40 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal ring-2 ring-navy-deep animate-pulse" />
            </div>
            <span>GWABS</span>
            <span className="text-teal -ml-2">.</span>
          </Link>

          {/* Center Dribbble-style Pill Navigation */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-navy/80 border border-surface-border px-2 py-1">
            {navLinks
              .filter((l) => l.to !== '/')
              .map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm 3xl:text-base font-medium px-4 py-1.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-teal text-teal-ink font-semibold shadow-sm'
                        : 'text-slate hover:text-offwhite hover:bg-surface/60'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            <a
              href={media.capabilityStatement}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm 3xl:text-base font-medium px-4 py-1.5 rounded-full text-slate hover:text-teal transition-colors flex items-center gap-1"
            >
              Docs <span aria-hidden="true" className="text-xs">↗</span>
            </a>
          </div>

          {/* Right Actions: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full border border-surface-border bg-surface/80 text-slate hover:text-teal hover:border-teal/50 transition-all"
              title={`Current theme: ${theme}. Click to switch.`}
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                  <span>Dark</span>
                </>
              )}
            </button>

            <Link
              to="/contact"
              className="btn-gradient font-semibold text-sm 3xl:text-base py-2.5 px-5 rounded-full flex items-center gap-1.5"
            >
              <span>Get in touch</span>
              <span aria-hidden="true" className="text-xs">↗</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="p-2 rounded-full border border-surface-border bg-surface text-slate hover:text-teal"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              type="button"
              className="text-slate hover:text-teal p-1.5"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {open && (
          <div className="md:hidden mt-2 glass-card rounded-2xl border border-surface-border p-5 shadow-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                      isActive ? 'bg-teal/15 text-teal' : 'text-slate hover:text-teal'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="border-t border-surface-border pt-3 mt-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-teal px-3 mb-2">
                  Solutions Architecture
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {solutions.map((s) => (
                    <Link
                      key={s.id}
                      to={`/solutions#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="px-3 py-1.5 text-xs text-slate hover:text-teal flex items-center gap-2"
                    >
                      <span className="text-teal">{s.icon}</span>
                      <span>{s.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 btn-gradient text-center font-semibold py-2.5 px-5 rounded-full"
              >
                Book a consultation ↗
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
