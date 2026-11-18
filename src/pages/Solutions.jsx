import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import SolutionCard from '../components/SolutionCard.jsx'
import DeveloperShowcase from '../components/DeveloperShowcase.jsx'
import ScaleBanner from '../components/ScaleBanner.jsx'
import CTASection from '../components/CTASection.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ParticleGridBackground from '../components/ParticleGridBackground.jsx'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'

const PILLAR_SHORT_LABELS = {
  'pos-apps': '01 · Terminal Apps',
  switching: '02 · Switching & Routing',
  sdks: '03 · Unified HAL SDKs',
  software: '04 · SaaS & TMS',
}

export default function Solutions() {
  useDocumentTitle('Solutions')

  return (
    <main className="pt-28 overflow-hidden">
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-20 overflow-hidden border-b border-surface-border">
        <ParticleGridBackground />
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 border border-teal/35 text-xs font-mono uppercase tracking-[0.18em] text-teal mb-5">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            FULL-STACK PAYMENTS ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-5xl 3xl:text-6xl font-extrabold text-offwhite font-outfit leading-tight">
            Solutions Engineered for{' '}
            <span className="text-gradient">Zero-Downtime Settlement</span>
          </h1>
          <p className="mt-4 text-slate text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From the physical EMV terminal kernel to high-availability ISO 8583 switching and multi-tenant SaaS ledgers — we build, integrate, and advise across the entire payments stack.
          </p>

          {/* Anchor Jump Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {solutions.map((s) => (
              <a
                key={`jump-${s.id}`}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-full glass-card border border-surface-border hover:border-teal text-xs sm:text-sm font-semibold text-offwhite hover:text-teal transition-all flex items-center gap-2"
              >
                <span className="text-teal">{s.icon}</span>
                <span>{PILLAR_SHORT_LABELS[s.id] || s.badge}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Pillar Cards Overview */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 2xl:gap-8">
          {solutions.map((s) => (
            <SolutionCard key={s.id} solution={s} />
          ))}
        </div>
      </section>

      {/* Deep-Dive Architectural Breakdown per Pillar (Alternating Dark & Light Contrast Cards) */}
      <section className="py-12 space-y-16">
        {solutions.map((s, idx) => {
          const pillarStudies = caseStudies.filter((c) => c.pillarId === s.id)
          const isEven = idx % 2 === 1

          return (
            <div
              key={`deep-${s.id}`}
              id={s.id}
              className={`scroll-mt-28 py-14 ${
                isEven
                  ? 'light-contrast-section border-y border-slate-200/80'
                  : ''
              }`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Narrative & Stack Specs */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 border border-teal/35 text-xs font-mono font-bold text-teal">
                      <span>{s.icon}</span>
                      <span>{s.badge}</span>
                    </div>

                    <h2
                      className={`text-3xl sm:text-4xl font-extrabold font-outfit ${
                        isEven ? 'text-[#06122B]' : 'text-offwhite'
                      }`}
                    >
                      {PILLAR_SHORT_LABELS[s.id]} — Architecture &amp; Delivery
                    </h2>

                    <p
                      className={`text-base leading-relaxed ${
                        isEven ? 'text-slate-600' : 'text-slate'
                      }`}
                    >
                      {s.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {s.points.map((pt) => (
                        <div
                          key={pt}
                          className={`rounded-xl p-3.5 border text-xs sm:text-sm flex items-start gap-2.5 ${
                            isEven
                              ? 'bg-white border-slate-200 text-[#06122B] shadow-sm'
                              : 'bg-surface/70 border-surface-border text-offwhite'
                          }`}
                        >
                          <span className="text-teal font-bold">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Execution Pipeline */}
                    <div className="pt-3">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider block mb-2.5 ${
                          isEven ? 'text-slate-500' : 'text-slate'
                        }`}
                      >
                        Architecture Flow
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {s.architectureFlow?.map((node, i) => (
                          <span key={node} className="inline-flex items-center gap-2">
                            <span
                              className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border ${
                                isEven
                                  ? 'bg-[#06122B] text-white border-[#06122B]'
                                  : 'bg-obsidian text-teal border-teal/30'
                              }`}
                            >
                              {node}
                            </span>
                            {i < s.architectureFlow.length - 1 && (
                              <span className="text-teal font-bold">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        to="/contact"
                        className="btn-gradient font-semibold text-sm py-3 px-7 rounded-full"
                      >
                        Request {PILLAR_SHORT_LABELS[s.id]} Proposal →
                      </Link>
                      <Link
                        to="/case-studies"
                        className={`text-sm font-semibold hover:underline ${
                          isEven ? 'text-[#0256CD]' : 'text-teal'
                        }`}
                      >
                        Browse all {pillarStudies.length} shipped projects ↗
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: SLA & Shipped Case Studies in this Pillar */}
                  <div className="lg:col-span-6">
                    <TiltCard
                      intensity={6}
                      className={`rounded-3xl p-6 sm:p-8 ${
                        isEven ? 'light-showcase-card' : 'obsidian-panel'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-teal/20">
                        <div>
                          <span className="text-xs font-mono uppercase text-teal block">
                            PRODUCTION BENCHMARKS
                          </span>
                          <h3
                            className={`text-xl font-bold font-outfit mt-0.5 ${
                              isEven ? 'text-[#06122B]' : 'text-[#F4F7FB]'
                            }`}
                          >
                            {s.metrics?.compliance}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-extrabold font-outfit text-teal block">
                            {s.metrics?.baseAvailability}%
                          </span>
                          <span
                            className={`text-[11px] font-mono ${
                              isEven ? 'text-slate-500' : 'text-[#9FB2D0]'
                            }`}
                          >
                            Target Uptime SLA
                          </span>
                        </div>
                      </div>

                      {/* Stack Badges */}
                      <div className="mt-5">
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider block mb-2 ${
                            isEven ? 'text-slate-500' : 'text-[#9FB2D0]'
                          }`}
                        >
                          Core Engineering Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {s.metrics?.stack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-xs font-mono px-3 py-1 rounded-full border ${
                                isEven
                                  ? 'bg-slate-100 border-slate-200 text-[#06122B]'
                                  : 'bg-white/5 border-white/15 text-[#F4F7FB]'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Cross-linked Case Studies */}
                      <div className="mt-6 pt-5 border-t border-teal/20">
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider block mb-3 ${
                            isEven ? 'text-slate-500' : 'text-[#9FB2D0]'
                          }`}
                        >
                          Verified Deployments ({pillarStudies.length})
                        </span>
                        <div className="space-y-2.5">
                          {pillarStudies.map((cs) => (
                            <Link
                              key={cs.slug}
                              to={`/case-studies/${cs.slug}`}
                              className={`block rounded-xl p-3.5 border transition-all ${
                                isEven
                                  ? 'bg-slate-50 hover:bg-blue-50/60 border-slate-200 text-[#06122B]'
                                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#F4F7FB]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-sm font-outfit">
                                  {cs.title}
                                </span>
                                <span className="text-xs font-mono text-teal shrink-0">
                                  {cs.client} →
                                </span>
                              </div>
                              <p
                                className={`text-xs mt-1 line-clamp-1 ${
                                  isEven ? 'text-slate-600' : 'text-[#9FB2D0]'
                                }`}
                              >
                                {cs.hook}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <DeveloperShowcase />
      <ScaleBanner />
      <CTASection />
    </main>
  )
}
