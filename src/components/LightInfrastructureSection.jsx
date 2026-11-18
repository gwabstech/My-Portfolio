import { Link } from 'react-router-dom'
import { company, media, trustBadges } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

export default function LightInfrastructureSection() {
  return (
    <section
      aria-label="Secure infrastructure for modern payment markets"
      className="light-contrast-section py-20 3xl:py-28 relative overflow-hidden border-y border-slate-200/80"
    >
      <div className="container mx-auto px-6">
        {/* Floating White Elevated Card (Matches Dribbble Shot 1 Bottom-Right Card) */}
        <TiltCard
          intensity={5}
          glareColor="rgba(0, 194, 168, 0.12)"
          className="light-showcase-card rounded-3xl p-8 sm:p-10 lg:p-14 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5">
              {/* Top Partner Badges (Matches "HALBORN · RedStone" in Shot 1) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#06122B] text-white text-xs font-extrabold tracking-wide">
                  PCI DSS CERTIFIED
                </span>
                <span className="px-3 py-1 rounded-full bg-teal/15 text-[#04241F] border border-teal/40 text-xs font-bold font-mono">
                  NIBSS · ISO 8583
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                  RC {company.rc}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#06122B] font-outfit leading-tight">
                Secure infrastructure for modern payment markets
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Built by payment engineers. Formerly{' '}
                <span className="text-[#0256CD] font-semibold">
                  {company.formerName}
                </span>
                , now incorporated as {company.legalName} (RC {company.rc}). We enable banks, microfinance institutions, and processors to run isolated POS fleets, multi-rail switching, and automated reconciliation with institutional-grade compliance.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#06122B] hover:text-[#0256CD] transition-colors"
                >
                  <span>About the company</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={media.capabilityStatement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#06122B] transition-colors"
                >
                  <span>Read capability statement</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Right Visual & Giant Metrics Column (Matches Shot 1 Right Side of White Card) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Glowing Dark Architecture Preview Frame inside White Card */}
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#06122B] via-[#0D2A5C] to-[#040A18] p-6 text-white shadow-xl relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-60"
                  style={{
                    background: 'radial-gradient(circle, rgba(54,224,200,0.5), transparent 70%)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal block">
                      BUILT BY PAYMENT ENGINEERS
                    </span>
                    <h3 className="text-lg font-bold font-outfit mt-1">
                      Terminal → HAL → Switch → Ledger
                    </h3>
                  </div>
                  <img
                    src="/favicon.svg"
                    alt="GWABS emblem"
                    className="h-12 w-12 rounded-xl ring-2 ring-teal/40"
                  />
                </div>

                <div className="relative z-10 mt-5 grid grid-cols-3 gap-2.5 text-center font-mono text-xs">
                  <div className="rounded-xl bg-white/10 border border-white/15 p-2.5">
                    <span className="text-teal font-bold block">EMV L1/L2</span>
                    <span className="text-[10px] text-slate-300">POS Kernel</span>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-2.5">
                    <span className="text-teal font-bold block">ISO 8583</span>
                    <span className="text-[10px] text-slate-300">jPOS Switch</span>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/15 p-2.5">
                    <span className="text-teal font-bold block">AES-256</span>
                    <span className="text-[10px] text-slate-300">Zero-Trust</span>
                  </div>
                </div>
              </div>

              {/* Giant Metrics Row (Matches "$300M+ TVL / 5.4% APY" in Shot 1) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2 px-2">
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#06122B]">
                    11+
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500 block mt-0.5">
                    Shipped Systems
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#06122B]">
                    99.98%
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500 block mt-0.5">
                    Switch Target
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#0256CD]">
                    3+ HALs
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500 block mt-0.5">
                    Vendor SDKs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Bottom "Partners & Ecosystem" Section on Light Background (Matches "Partners & Backers" in Shot 1) */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06122B] font-outfit">
            Partners, Rails &amp; Ecosystem
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            Integrated with Nigeria&apos;s core switching rails, certified terminal OEMs, and forward-thinking microfinance institutions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {trustBadges.map((badge) => (
              <span
                key={`light-partner-${badge}`}
                className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs sm:text-sm font-bold text-[#06122B] flex items-center gap-2 hover:border-teal transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
