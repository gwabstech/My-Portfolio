import { useState } from 'react'
import { Link } from 'react-router-dom'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'
import TiltCard from './TiltCard.jsx'

export default function SolutionsExplorer() {
  const [activeId, setActiveId] = useState(solutions[0].id)
  const [terminals, setTerminals] = useState(2500)
  const [dailyTx, setDailyTx] = useState(85000)

  const activeSolution = solutions.find((s) => s.id === activeId) || solutions[0]
  const matchingStudies = caseStudies.filter((c) => c.pillarId === activeSolution.id).slice(0, 3)

  // Calculate realistic engineering throughput metrics based on sliders
  const peakTps = Math.max(12, Math.round((dailyTx / 86400) * 14 + terminals / 450))
  const monthlyTxMillions = ((dailyTx * 30) / 1_000_000).toFixed(1)
  const targetSla = activeSolution.metrics?.baseAvailability || 99.98

  return (
    <section
      aria-label="Live Solutions and Architecture Explorer"
      className="relative py-20 3xl:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-teal mb-2">
            INTERACTIVE ARCHITECTURE CONFIGURATOR
          </span>
          <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit leading-tight">
            Live Payment Rails &amp; Infrastructure Opportunities
          </h2>
          <p className="mt-3 text-slate text-sm sm:text-base">
            Select a core engineering pillar and model your terminal fleet or transaction throughput.
          </p>
        </div>

        {/* Dribbble Shot 1 "Live Markets" Container: Dark Outer Frame + Left Dark Tabs + Right Crisp White Card */}
        <div className="obsidian-panel rounded-3xl p-4 sm:p-6 lg:p-8 border border-surface-border shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Dark Column: Selectable Solution Pillars */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {solutions.map((s) => {
                const isSelected = s.id === activeSolution.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all border ${
                      isSelected
                        ? 'bg-[#0E224A]/95 border-teal/60 shadow-[0_0_30px_-5px_rgba(0,194,168,0.3)]'
                        : 'bg-[#071226]/70 border-white/10 hover:border-teal/30 hover:bg-[#0A1936]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold transition-colors ${
                            isSelected
                              ? 'bg-teal text-teal-ink shadow-md'
                              : 'bg-white/10 text-teal'
                          }`}
                        >
                          {s.icon}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-teal block">
                            {s.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-[#F4F7FB] font-outfit">
                            {s.title}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                          isSelected
                            ? 'bg-teal/20 text-teal border border-teal/40'
                            : 'text-[#9FB2D0]/60'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </span>
                    </div>

                    {isSelected && (
                      <p className="mt-3 text-xs sm:text-sm text-[#B7C4DA] leading-relaxed">
                        {s.summary}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right Crisp White Interactive Card (Dribbble Shot 1 Contrast) */}
            <div className="lg:col-span-7 flex">
              <TiltCard
                intensity={5}
                glareColor="rgba(2, 86, 205, 0.08)"
                className="light-showcase-card rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between"
              >
                {/* Top Header Bar inside White Card */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#06122B] text-teal flex items-center justify-center font-bold text-sm">
                        {activeSolution.icon}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-[#06122B] block">
                          {activeSolution.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {activeSolution.metrics?.compliance}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-[#06122B] border border-slate-200">
                      Delivery: {activeSolution.metrics?.deploymentWeeks}
                    </span>
                  </div>

                  {/* Interactive Slider 1: Terminal / Endpoint Fleet */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#06122B] mb-2">
                      <label htmlFor="fleet-slider">Active POS Terminals / Endpoints</label>
                      <span className="font-mono text-base font-extrabold text-[#06122B]">
                        {terminals.toLocaleString()} units
                      </span>
                    </div>
                    <input
                      id="fleet-slider"
                      type="range"
                      min={100}
                      max={25000}
                      step={100}
                      value={terminals}
                      onChange={(e) => setTerminals(Number(e.target.value))}
                      className="w-full gwabs-slider"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                      <span>100 pilot units</span>
                      <span>10,000 MFB fleet</span>
                      <span>25,000+ nationwide</span>
                    </div>
                  </div>

                  {/* Interactive Slider 2: Daily Transaction Volume */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#06122B] mb-2">
                      <label htmlFor="tx-slider">Daily Transaction Volume</label>
                      <span className="font-mono text-base font-extrabold text-[#06122B]">
                        {dailyTx.toLocaleString()} tx/day
                      </span>
                    </div>
                    <input
                      id="tx-slider"
                      type="range"
                      min={5000}
                      max={500000}
                      step={5000}
                      value={dailyTx}
                      onChange={(e) => setDailyTx(Number(e.target.value))}
                      className="w-full gwabs-slider"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                      <span>5k / day</span>
                      <span>250k / day</span>
                      <span>500k+ / day</span>
                    </div>
                  </div>

                  {/* Architecture Pipeline Chips */}
                  <div className="mt-6 pt-5 border-t border-slate-200/80">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2.5">
                      End-to-End Execution Pipeline
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeSolution.architectureFlow?.map((step, i) => (
                        <span key={step} className="inline-flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-[#06122B] border border-slate-200">
                            {step}
                          </span>
                          {i < activeSolution.architectureFlow.length - 1 && (
                            <span className="text-teal font-bold text-xs">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Metrics Summary & Gradient CTA (Matches Dribbble Shot 1 White Card Bottom) */}
                <div className="mt-6 pt-5 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span>Target Routing &amp; Switch SLA</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                      </p>
                      <p className="text-xs text-slate-500">
                        Projected Monthly Volume ({peakTps} Peak TPS)
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-extrabold font-outfit text-[#06122B]">
                        {targetSla}% SLA
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-outfit text-[#0256CD]">
                        {monthlyTxMillions}M+ tx/mo
                      </div>
                    </div>
                  </div>

                  {/* Related Shipped Case Studies Quick Links */}
                  {matchingStudies.length > 0 && (
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-500">Proven in production:</span>
                      {matchingStudies.map((cs) => (
                        <Link
                          key={cs.slug}
                          to={`/case-studies/${cs.slug}`}
                          className="font-semibold text-[#0256CD] hover:underline bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200"
                        >
                          {cs.title} ↗
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to={`/solutions#${activeSolution.id}`}
                      className="btn-alula-cta text-center font-semibold py-3.5 px-6 rounded-xl text-sm"
                    >
                      Inspect {activeSolution.title} →
                    </Link>
                    <Link
                      to="/contact"
                      className="text-center font-semibold py-3.5 px-6 rounded-xl text-sm bg-[#06122B] text-white hover:bg-[#0D2A5C] transition-colors"
                    >
                      Scope this architecture
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
