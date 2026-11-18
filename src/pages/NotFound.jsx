import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import ParticleGridBackground from '../components/ParticleGridBackground.jsx'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <main className="relative pt-36 pb-28 container mx-auto px-6 text-center overflow-hidden">
      <ParticleGridBackground />
      <div className="relative z-10 max-w-lg mx-auto glass-card rounded-3xl p-10 border border-teal/35">
        <span className="text-xs font-mono uppercase tracking-widest text-teal">
          ERROR 404 · ROUTE NOT FOUND
        </span>
        <h1 className="mt-2 text-6xl font-extrabold text-offwhite font-outfit">404</h1>
        <p className="mt-3 text-slate">That page doesn&apos;t exist or has moved.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="btn-gradient font-semibold py-3 px-8 rounded-full"
          >
            Back home
          </Link>
          <Link
            to="/solutions"
            className="px-6 py-3 rounded-full border border-surface-border text-offwhite hover:border-teal hover:text-teal font-semibold transition-colors"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </main>
  )
}
