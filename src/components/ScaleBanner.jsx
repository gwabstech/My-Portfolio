import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'

const PILLAR_GUARANTEES = [
  {
    icon: '◈',
    title: 'Dedicated Multi-Tenant Vaults',
    description:
      'Your merchants, your rules. Configure isolated per-POS virtual collection accounts, custom fee sweeps, and granular branch RBAC.',
  },
  {
    icon: '🛡',
    title: 'Native CBN & PCI Compliance',
    description:
      'Built-in 50m CBN geofence kill-switches, DUKPT / Master-Session key exchange, AES-256-GCM encryption, and signed audit trails.',
  },
  {
    icon: '⇄',
    title: 'Zero-Contagion Failover',
    description:
      'Isolated processor routing across NIBSS, Interswitch, CoralPay, and Zone. Automatic BIN re-routing and instant timeout reversals.',
  },
]

export default function ScaleBanner() {
  return (
    <section className="relative py-20 3xl:py-28">
      <div className="container mx-auto px-6">
        {/* Top Glowing Perspective Grid Banner (Matches "Scale your RWA operations..." in Dribbble Shot 1 & 2) */}
        <TiltCard
          intensity={5}
          glareColor="rgba(54, 224, 200, 0.18)"
          className="obsidian-panel rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border border-teal/30"
        >
          {/* Grid & Corner Radial Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-arch-grid opacity-55"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-65"
            style={{ background: 'radial-gradient(circle, rgba(2,86,205,0.55), transparent 70%)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-65"
            style={{ background: 'radial-gradient(circle, rgba(0,194,168,0.45), transparent 70%)' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-teal mb-3">
              ENTERPRISE &amp; MFB INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F7FB] font-outfit leading-tight">
              Scale your payment operations with programmable, compliant infrastructure
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9FB2D0] leading-relaxed max-w-2xl mx-auto">
              Designed for microfinance banks, commercial switches, payment processors, and fleet operators. GWABS provides the engineering stack to build isolated, CBN-compliant POS networks on high-speed rails.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="btn-white-pill font-bold py-3.5 px-9 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span>Contact Us</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/case-studies"
                className="px-7 py-3.5 rounded-full border border-white/20 text-[#F4F7FB] hover:border-teal hover:text-teal text-sm sm:text-base font-semibold transition-colors"
              >
                Inspect 11+ Live Deployments
              </Link>
            </div>
          </div>
        </TiltCard>

        {/* Bottom 3-Column Divider Strip (Matches "Dedicated Vaults / Native Compliance / Zero Contagion" in Shot 1 & 2) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-surface-border">
          {PILLAR_GUARANTEES.map((g, idx) => (
            <div
              key={g.title}
              className={`flex flex-col ${
                idx === 0 ? 'md:pr-8' : idx === 1 ? 'md:px-8' : 'md:pl-8'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-teal/15 border border-teal/40 text-teal flex items-center justify-center text-lg font-bold mb-4 shadow-[0_0_20px_rgba(0,194,168,0.2)]">
                {g.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-offwhite font-outfit">
                {g.title}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
