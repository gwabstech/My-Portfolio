import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import ParticleGridBackground from '../components/ParticleGridBackground.jsx'
import CTASection from '../components/CTASection.jsx'
import { caseStudies } from '../data/caseStudies.js'
import { solutions } from '../data/solutions.js'

export default function CaseStudies() {
  useDocumentTitle('Case Studies')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const shown = caseStudies.filter((c) => {
    const matchesPillar = filter === 'all' || c.pillarId === filter
    const q = search.trim().toLowerCase()
    const matchesQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.client.toLowerCase().includes(q) ||
      c.hook.toLowerCase().includes(q) ||
      c.tech.some((t) => t.toLowerCase().includes(q))
    return matchesPillar && matchesQuery
  })

  const chips = [{ id: 'all', title: 'All' }, ...solutions]
  const ownProductsCount = caseStudies.filter((c) => c.isOwnProduct).length
  const clientEngagementsCount = caseStudies.length - ownProductsCount

  return (
    <main className="pt-28 overflow-hidden">
      {/* Header Section */}
      <section className="relative py-14 lg:py-18 border-b border-surface-border overflow-hidden">
        <ParticleGridBackground />
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 border border-teal/35 text-xs font-mono uppercase tracking-[0.18em] text-teal mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            SHIPPED SYSTEMS &amp; BANKING ENGAGEMENTS
          </span>
          <h1 className="text-4xl sm:text-5xl 3xl:text-6xl font-extrabold text-offwhite font-outfit">
            Case Studies
          </h1>
          <p className="mt-3 text-slate text-base sm:text-lg max-w-2xl mx-auto">
            Selected fintech engagements and proprietary platforms. Client work is delivered as engineering consultancy; clients are credited.
          </p>

          {/* Summary Telemetry Pills */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="glass-card rounded-2xl p-3.5 text-center">
              <span className="text-2xl font-extrabold font-outfit text-teal block">
                {caseStudies.length}
              </span>
              <span className="text-[11px] font-mono text-slate">Total Systems</span>
            </div>
            <div className="glass-card rounded-2xl p-3.5 text-center">
              <span className="text-2xl font-extrabold font-outfit text-offwhite block">
                {ownProductsCount}
              </span>
              <span className="text-[11px] font-mono text-slate">GWABS SaaS</span>
            </div>
            <div className="glass-card rounded-2xl p-3.5 text-center">
              <span className="text-2xl font-extrabold font-outfit text-offwhite block">
                {clientEngagementsCount}
              </span>
              <span className="text-[11px] font-mono text-slate">Client Contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips & Instant Search Bar */}
      <div className="container mx-auto px-6 mt-10 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full border transition-all ${
                filter === c.id
                  ? 'bg-teal text-teal-ink border-teal shadow-md'
                  : 'border-surface-border bg-surface/70 text-slate hover:text-teal hover:border-teal/40'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="w-full lg:w-72">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by client, tech (e.g. jPOS, NIBSS)..."
            aria-label="Search case studies"
            className="w-full px-4 py-2.5 rounded-full bg-surface border border-surface-border text-xs sm:text-sm text-offwhite placeholder:text-slate/60 focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-8">
        {shown.map((c) => (
          <CaseStudyCard key={c.slug} study={c} />
        ))}
      </section>

      {/* Light Contrast Architecture Cross-Navigation Strip */}
      <section className="light-contrast-section py-16 border-y border-slate-200">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#0256CD] font-bold">
            EXPLORE BY TECHNICAL PILLAR
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#06122B] font-outfit">
            Want to inspect the underlying SDK &amp; Switch architecture?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Jump directly to our technical specifications for POS terminals, ISO 8583 middleware, hardware HALs, or SaaS platforms.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {solutions.map((s) => (
              <Link
                key={`cs-pillar-${s.id}`}
                to={`/solutions#${s.id}`}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-[#06122B] hover:border-teal transition-colors"
              >
                {s.icon} {s.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
