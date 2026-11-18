import { Link } from 'react-router-dom'
import { howItWorksSteps } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

function StepIllustration({ index }) {
  if (index === 0) {
    // Step 1: Connect Wallet / Terminal HAL badge (Dribbble Shot 2 Step 1 style)
    return (
      <div className="relative h-40 rounded-2xl bg-[#050E22] border border-white/10 flex flex-col items-center justify-center overflow-hidden p-4">
        <div
          aria-hidden="true"
          className="absolute w-36 h-36 rounded-full blur-2xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(54,224,200,0.35), transparent 70%)' }}
        />
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate/80 mb-2 relative z-10">
          Connect Terminal / HAL
        </span>
        <div className="relative z-10 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#36E0C8] via-[#60A5FA] to-[#3B82F6] text-[#041022] font-extrabold font-outfit text-sm shadow-[0_0_25px_rgba(54,224,200,0.45)] flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#041022] text-teal flex items-center justify-center text-xs">
            ▣
          </span>
          <span>GWABS Unified SDK</span>
        </div>
        <div className="mt-2.5 flex gap-2 relative z-10 text-[10px] font-mono text-teal/80">
          <span>Topwise</span>
          <span>•</span>
          <span>Urovo</span>
          <span>•</span>
          <span>Blumen</span>
        </div>
      </div>
    )
  }

  if (index === 1) {
    // Step 2: Isolated Processor Pools / Pillars (Dribbble Shot 2 Step 2 style)
    return (
      <div className="relative h-40 rounded-2xl bg-[#050E22] border border-white/10 flex items-center justify-center gap-3 overflow-hidden p-4">
        <div
          aria-hidden="true"
          className="absolute w-40 h-40 rounded-full blur-2xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(2,86,205,0.45), transparent 70%)' }}
        />
        {[
          { label: 'NIBSS', sub: 'ISO 8583', active: true },
          { label: 'ISW', sub: 'Kimono', active: false },
          { label: 'CoralPay', sub: 'Failover', active: true },
        ].map((pool) => (
          <div
            key={pool.label}
            className={`relative z-10 w-20 h-28 rounded-xl border flex flex-col items-center justify-between p-2.5 transition-transform group-hover:-translate-y-1 ${
              pool.active
                ? 'bg-gradient-to-b from-[#122B59] to-[#07142C] border-teal/50 shadow-[0_0_20px_rgba(0,194,168,0.2)]'
                : 'bg-[#08152E]/80 border-white/10 opacity-80'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal text-[11px] font-bold">
              ⇄
            </span>
            <div className="text-center">
              <p className="text-[11px] font-bold text-white">{pool.label}</p>
              <p className="text-[9px] font-mono text-teal">{pool.sub}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Step 3: Live Settlement & Telemetry Orb (Dribbble Shot 2 Step 3 style)
  return (
    <div className="relative h-40 rounded-2xl bg-[#050E22] border border-white/10 flex items-center justify-center gap-5 overflow-hidden p-4">
      <div
        aria-hidden="true"
        className="absolute w-36 h-36 rounded-full blur-2xl opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(54,224,200,0.4), transparent 70%)' }}
      />
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal/30 to-cyber-blue/40 border border-teal flex items-center justify-center shadow-[0_0_30px_rgba(0,194,168,0.45)]">
        <span className="w-8 h-8 rounded-full bg-teal text-teal-ink font-extrabold flex items-center justify-center text-sm animate-pulse">
          ✓
        </span>
      </div>
      <div className="relative z-10 space-y-1.5 text-left font-mono">
        <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-teal">
          0210 APPROVED · T+0
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-[#F4F7FB]">
          WSS ALERT &lt; 15ms
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className="relative py-20 3xl:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
            END-TO-END PAYMENT LIFECYCLE
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">
            How it Works
          </h2>
          <p className="mt-3 text-slate text-sm sm:text-base">
            From physical EMV card tap on the terminal to multi-processor ISO 8583 routing and automated ledger settlement.
          </p>
        </div>

        {/* 3 Connected Step Cards with [→] Connector Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {howItWorksSteps.map((item, idx) => (
            <div key={item.step} className="relative flex">
              <TiltCard
                intensity={9}
                className="obsidian-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between w-full group border border-surface-border hover:border-teal/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[#F4F7FB]">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-mono text-teal">
                      {item.subtitle}
                    </span>
                  </div>

                  <StepIllustration index={idx} />

                  <h3 className="mt-6 text-xl font-extrabold text-[#F4F7FB] font-outfit group-hover:text-teal transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#9FB2D0] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:underline"
                  >
                    <span>{item.linkLabel}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </TiltCard>

              {/* Connector Arrow Badge between cards on desktop (Dribbble Shot 2) */}
              {idx < howItWorksSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#091938] border border-teal/50 text-teal items-center justify-center text-xs font-bold shadow-lg"
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
