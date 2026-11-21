import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import Hero from '../components/Hero.jsx'
import TrustBar from '../components/TrustBar.jsx'
import AutoVideoVoiceShowcase from '../components/AutoVideoVoiceShowcase.jsx'
import CinematicServiceJourney from '../components/CinematicServiceJourney.jsx'
import SolutionsExplorer from '../components/SolutionsExplorer.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import InstitutionalPerformance from '../components/InstitutionalPerformance.jsx'
import DeveloperShowcase from '../components/DeveloperShowcase.jsx'
import ScaleBanner from '../components/ScaleBanner.jsx'
import LightInfrastructureSection from '../components/LightInfrastructureSection.jsx'
import StatsBand from '../components/StatsBand.jsx'
import CTASection from '../components/CTASection.jsx'
import SolutionCard from '../components/SolutionCard.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import ExplainerVideo from '../components/ExplainerVideo.jsx'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'

export default function Home() {
  useDocumentTitle('')
  const [featuredTab, setFeaturedTab] = useState('all')

  const filteredStudies =
    featuredTab === 'all'
      ? caseStudies.slice(0, 6)
      : featuredTab === 'products'
      ? caseStudies.filter((c) => c.isOwnProduct)
      : caseStudies.filter((c) => !c.isOwnProduct).slice(0, 6)

  return (
    <main className="overflow-hidden">
      {/* 1. First-Glance Hero: Auto-Rolling 4-Service Matrix + 3D Orbital POS Stage */}
      <Hero />

      {/* 2. Categorized 3-Column Ecosystem & Compliance Trust Bar */}
      <TrustBar />

      {/* 3. Auto-Running Video & AI Voice Stories (Market Woman POS Payment, EMV Receipt, ISO Switch, Agency Fleet) */}
      <AutoVideoVoiceShowcase />

      {/* 4. 3D Interactive POS-in-Action Simulator (Card Insert -> PIN -> Charge -> Receipt) */}
      <CinematicServiceJourney />

      {/* 5. 4-Pillar Engineering Grid ("What we do") */}
      <section className="container mx-auto px-6 py-20 3xl:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
            CORE CAPABILITIES
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">
            What we do
          </h2>
          <p className="mt-3 text-slate text-sm sm:text-base">
            End-to-end payment engineering across physical POS terminals, high-availability switching, vendor-agnostic SDKs, and multi-tenant platforms.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
          {solutions.map((s) => (
            <SolutionCard key={s.id} solution={s} />
          ))}
        </div>
      </section>

      {/* 6. Interactive Split Dark/White Solutions & Deployment Configurator */}
      <SolutionsExplorer />

      {/* 7. 3-Step Connected Process Flow ("How it Works") */}
      <HowItWorks />

      {/* 8. Auto-Playing Institutional Performance Carousel */}
      <InstitutionalPerformance />

      {/* 9. Developer & SDK Code Preview ("Build on GWABS") */}
      <DeveloperShowcase />

      {/* 10. Featured Work & Production Deployments Showcase */}
      <section className="bg-navy-deep/80 border-y border-surface-border py-20 3xl:py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
                PRODUCTION TRACK RECORD
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">
                Featured work
              </h2>
              <p className="text-slate mt-2 text-sm sm:text-base">
                Selected fintech engagements &amp; proprietary SaaS platforms — clients credited.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Featured (6)' },
                { id: 'products', label: 'GWABS SaaS Products' },
                { id: 'client', label: 'Bank & Processor Consultancy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFeaturedTab(tab.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    featuredTab === tab.id
                      ? 'bg-teal text-teal-ink border-teal shadow-md'
                      : 'border-surface-border bg-surface/70 text-slate hover:text-teal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
            {filteredStudies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 border border-teal/40 bg-surface/80 text-offwhite hover:border-teal hover:text-teal font-semibold py-3.5 px-8 rounded-full transition-all shadow-lg"
            >
              View all {caseStudies.length} case studies →
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Scale Operations Banner + 3-Column Divider Strip */}
      <ScaleBanner />

      {/* 12. High-Contrast Light Section ("Secure infrastructure for modern payment markets" with Auto-Running Video) */}
      <LightInfrastructureSection />

      {/* 13. Explainer Video Walkthrough */}
      <ExplainerVideo />

      {/* 14. Stats Band & Final Consultation CTA */}
      <StatsBand />
      <CTASection />
    </main>
  )
}
