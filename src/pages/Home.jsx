import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import Hero from '../components/Hero.jsx'
import TrustBar from '../components/TrustBar.jsx'
import StatsBand from '../components/StatsBand.jsx'
import CTASection from '../components/CTASection.jsx'
import SolutionCard from '../components/SolutionCard.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'
import { company } from '../data/company.js'

export default function Home() {
  useDocumentTitle('')
  const featured = caseStudies.slice(0, 3)
  return (
    <main>
      <Hero />
      <TrustBar />

      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-offwhite font-outfit text-center">What we do</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map(s => <SolutionCard key={s.id} solution={s} />)}
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-offwhite font-outfit text-center">Featured work</h2>
          <p className="text-center text-slate mt-2">Selected engagements — clients credited.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(c => <CaseStudyCard key={c.slug} study={c} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/case-studies" className="border border-surface-border text-slate hover:text-teal font-semibold py-3 px-8 rounded-full transition-colors">View all 8 case studies →</Link>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="container mx-auto px-6 py-20 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <h2 className="text-3xl font-extrabold text-offwhite font-outfit">Built by payment engineers</h2>
          <p className="mt-4 text-slate leading-relaxed">
            Formerly <span className="text-teal font-semibold">{company.formerName}</span>, now incorporated as {company.legalName} (RC {company.rc}). We specialise in secure, compliant payment systems — from the terminal to the switch.
          </p>
          <Link to="/about" className="inline-block mt-5 text-teal font-semibold">About the company →</Link>
        </div>
        <div className="md:col-span-2 glass-card rounded-2xl h-48 flex items-center justify-center bg-gradient-to-br from-navy-2 to-navy-deep">
          <img src="/favicon.svg" alt="GWABS logo" className="h-24 w-24 rounded-2xl opacity-95" />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
