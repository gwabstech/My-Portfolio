import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { institutionalFeatures } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

export default function InstitutionalPerformance() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % institutionalFeatures.length)
    }, 4800)
    return () => clearInterval(timer)
  }, [paused])

  const active = institutionalFeatures[activeIndex]

  return (
    <section
      aria-label="Built for Institutional Performance"
      className="relative py-20 3xl:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-6">
        <div className="obsidian-panel rounded-3xl p-6 sm:p-10 lg:p-14 border border-surface-border relative overflow-hidden">
          {/* Ambient radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-10 w-96 h-96 rounded-full blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(2,86,205,0.45), rgba(0,194,168,0.2), transparent 70%)',
            }}
          />

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
              BANK-GRADE RELIABILITY
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-[#F4F7FB] font-outfit leading-tight">
              Built for Institutional Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Active Carousel Narrative + Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 border border-teal/35 text-[11px] font-mono font-bold text-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                <span>{active.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FB] font-outfit">
                {active.title}
              </h3>

              <p className="text-[#9FB2D0] text-sm sm:text-base leading-relaxed">
                {active.description}
              </p>

              {/* Key Metric Pair */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-2xl font-extrabold font-outfit text-teal">
                    {active.metricValue}
                  </div>
                  <div className="text-xs text-[#9FB2D0] mt-0.5">{active.metricLabel}</div>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-2xl font-extrabold font-outfit text-[#F4F7FB]">
                    {active.secondaryValue}
                  </div>
                  <div className="text-xs text-[#9FB2D0] mt-0.5">{active.secondaryLabel}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/case-studies/${active.caseStudySlug}`}
                  className="text-xs sm:text-sm font-semibold text-teal hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Case Study: {active.caseStudyTitle}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  to={`/solutions#${active.pillarId}`}
                  className="text-xs sm:text-sm font-medium text-[#9FB2D0] hover:text-white inline-flex items-center gap-1"
                >
                  <span>Pillar specs</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Carousel Pagination Dots & Arrows (Dribbble Shot 2 Bottom-Left) */}
              <div className="pt-4 flex items-center gap-3">
                {institutionalFeatures.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === activeIndex
                        ? 'w-9 bg-teal shadow-[0_0_12px_#00C2A8]'
                        : 'w-2.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous institutional feature"
                    onClick={() =>
                      setActiveIndex(
                        (prev) => (prev - 1 + institutionalFeatures.length) % institutionalFeatures.length
                      )
                    }
                    className="w-8 h-8 rounded-full border border-white/15 bg-white/5 text-white hover:border-teal hover:text-teal flex items-center justify-center text-xs"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next institutional feature"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % institutionalFeatures.length)
                    }
                    className="w-8 h-8 rounded-full border border-white/15 bg-white/5 text-white hover:border-teal hover:text-teal flex items-center justify-center text-xs"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Dashboard UI Preview Card (Dribbble Shot 2 "Isolated Pools" UI) */}
            <div className="lg:col-span-7">
              <TiltCard
                intensity={8}
                className="rounded-2xl bg-gradient-to-br from-[#0F2552] via-[#081633] to-[#040B1B] border border-teal/35 p-5 sm:p-7 shadow-2xl"
              >
                {/* Top Window Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white text-[#06122B] text-xs font-extrabold font-outfit shadow">
                      {active.title}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-teal/20 border border-teal/40 text-teal text-[11px] font-mono">
                      LIVE TELEMETRY
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9FB2D0]">
                    GWABS Core · ISO 8583 / HAL
                  </span>
                </div>

                {/* Live Routing / Architecture Rows */}
                <div className="mt-5 space-y-3">
                  {active.routes.map((r) => (
                    <div
                      key={r.bin}
                      className="rounded-xl bg-[#050E22]/90 border border-white/10 hover:border-teal/40 px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal shadow-[0_0_8px_#00C2A8]" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#F4F7FB] font-mono">
                            {r.bin}
                          </p>
                          <p className="text-[11px] text-[#9FB2D0]">{r.processor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal/15 text-teal border border-teal/30 font-semibold">
                          {r.status}
                        </span>
                        <span className="text-xs font-mono text-[#F4F7FB] font-semibold">
                          {r.latency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Risk & Security Parameter Strip (Matches "Risk Parameters" card in Shot 2) */}
                <div className="mt-5 rounded-xl bg-gradient-to-r from-[#091B3E] to-[#06122B] border border-white/10 p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal block">
                      SECURITY &amp; SETTLEMENT PARAMETERS
                    </span>
                    <span className="text-xs font-semibold text-[#F4F7FB]">
                      AES-256-GCM · HMAC-SHA256 Signed Webhooks · Zero Cross-Tenant Contagion
                    </span>
                  </div>
                  <Link
                    to={`/case-studies/${active.caseStudySlug}`}
                    className="px-3.5 py-1.5 rounded-lg bg-teal text-teal-ink font-bold text-xs hover:brightness-110 transition"
                  >
                    Inspect System ↗
                  </Link>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
