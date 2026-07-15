import { useDocumentTitle } from '../lib/seo.js'
import SolutionCard from '../components/SolutionCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { solutions } from '../data/solutions.js'

export default function Solutions() {
  useDocumentTitle('Solutions')
  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 pb-8 text-center">
        <h1 className="text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">Solutions</h1>
        <p className="mt-3 text-slate max-w-2xl mx-auto">From the terminal to the switch — we build, integrate, and advise across the payments stack.</p>
      </section>
      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 2xl:gap-8">
        {solutions.map(s => <SolutionCard key={s.id} solution={s} />)}
      </section>
      <CTASection />
    </main>
  )
}
