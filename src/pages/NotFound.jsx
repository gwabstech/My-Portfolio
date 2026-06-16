import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <main className="pt-32 pb-24 container mx-auto px-6 text-center">
      <h1 className="text-5xl font-extrabold text-offwhite font-outfit">404</h1>
      <p className="mt-3 text-slate">That page doesn't exist.</p>
      <Link to="/" className="inline-block mt-6 btn-gradient font-semibold py-3 px-8 rounded-full">Back home</Link>
    </main>
  )
}
