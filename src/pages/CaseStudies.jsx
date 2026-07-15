import { useState } from 'react'
import { useDocumentTitle } from '../lib/seo.js'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import { caseStudies } from '../data/caseStudies.js'
import { solutions } from '../data/solutions.js'

export default function CaseStudies() {
  useDocumentTitle('Case Studies')
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? caseStudies : caseStudies.filter(c => c.pillarId === filter)

  const chips = [{ id: 'all', title: 'All' }, ...solutions]

  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 text-center">
        <h1 className="text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">Case Studies</h1>
        <p className="mt-3 text-slate max-w-2xl mx-auto">Selected fintech engagements. Client work is delivered as consultancy; clients are credited.</p>
      </section>

      <div className="container mx-auto px-6 mt-8 flex flex-wrap justify-center gap-2">
        {chips.map(c => (
          <button key={c.id} onClick={() => setFilter(c.id)}
            className={`text-sm py-2 px-4 rounded-full border transition-colors ${filter === c.id ? 'bg-teal text-teal-ink border-teal' : 'border-surface-border text-slate hover:text-teal'}`}>
            {c.title}
          </button>
        ))}
      </div>

      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-8">
        {shown.map(c => <CaseStudyCard key={c.slug} study={c} />)}
      </section>
    </main>
  )
}
