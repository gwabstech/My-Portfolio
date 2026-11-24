import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import ReviewList from '../components/ReviewList.jsx'
import ReviewForm from '../components/ReviewForm.jsx'
import CTASection from '../components/CTASection.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ParticleGridBackground from '../components/ParticleGridBackground.jsx'
import { company, media } from '../data/company.js'
import { solutions } from '../data/solutions.js'

const ENGINEERING_PRINCIPLES = [
  {
    badge: 'PCI DSS & CRYPTOGRAPHY',
    title: 'Hardware-Backed Security',
    desc: 'Every terminal and switch integration enforces DUKPT / Master-Session key hierarchy, AES-256-GCM payload encryption, and HMAC-SHA256 webhook verification.',
  },
  {
    badge: 'CBN REGULATORY ALIGNMENT',
    title: 'Built-In Geofence & KYC',
    desc: 'Automated 50m radius CBN geofence enforcement on Android POS fleets, NIN/BVN verification pipelines, and immutable audit trails.',
  },
  {
    badge: 'ZERO-CONTAGION MULTI-TENANCY',
    title: 'Isolated Ledgers & Pools',
    desc: 'Strict tenant, branch, and per-POS virtual collection account isolation so institutions can scale agency and merchant banking safely.',
  },
]

const MILESTONES = [
  {
    phase: 'Foundation',
    title: 'Terminal & SDK Engineering Origins',
    detail:
      'Built unified EMV / ISO 8583 hardware abstraction layers across Topwise, Urovo, and Blumen POS devices and multi-processor switching middleware.',
  },
  {
    phase: 'Corporate Evolution',
    title: 'Incorporated Under CAMA 2020 in Abuja',
    detail:
      'Formally incorporated in Nigeria, expanding into full-stack banking infrastructure, terminal management, and proprietary SaaS products.',
  },
  {
    phase: 'Live Production Scale',
    title: '14+ Shipped Platforms, SoftPOS & MFB POS-as-a-Service',
    detail:
      'Powering GWABS SoftPOS (EMV L2 Tap-to-Phone), CPay (ISO 8583 Switch & S60 POS), OneClick (Social Commerce & Business Banking), Gwabs Business Suite (gbs.ng), Reconcile LMS (reconcile.ng), Okada FleetOS (okadaos.ng), and managed POS/switching stacks for Otech MFB, Regent MFB, and Bellbank MFB.',
  },
]

export default function About() {
  useDocumentTitle('About')
  return (
    <main className="pt-28 overflow-hidden">
      {/* Dark Obsidian Hero Section */}
      <section className="relative py-16 lg:py-20 border-b border-surface-border overflow-hidden">
        <ParticleGridBackground />
        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-teal/35 text-xs font-mono text-teal mb-4">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                NIGERIAN FINTECH ENGINEERING COMPANY
              </span>
              <h1 className="text-4xl sm:text-5xl 3xl:text-6xl font-extrabold text-offwhite font-outfit">
                About GWABS
              </h1>
              <p className="mt-5 text-slate leading-relaxed text-base sm:text-lg">
                {company.legalName} (RC {company.rc}) is a Nigerian fintech engineering company, formerly {company.formerName}, incorporated on {company.incorporated} under CAMA 2020. We design and build secure, compliant payment systems: POS terminal applications, payment switching and middleware, device &amp; hardware SDKs, and fintech software — for banks, microfinance banks, processors, and merchants.
              </p>
              <p className="mt-4 text-slate leading-relaxed text-sm sm:text-base">
                Our work spans the full payments stack, from EMV card acceptance on terminal hardware to ISO 8583 switching, terminal management, and SaaS business platforms. We hold PCI DSS-aligned expertise and design for CBN compliance.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href={media.capabilityStatement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-gradient font-semibold py-3.5 px-8 rounded-full text-sm sm:text-base"
                >
                  <span>↓</span> Download capability statement (PDF)
                </a>
                <Link
                  to="/case-studies"
                  className="px-6 py-3.5 rounded-full glass-card border border-surface-border hover:border-teal text-sm font-semibold text-offwhite hover:text-teal transition-colors"
                >
                  Inspect 14+ Case Studies →
                </Link>
              </div>
            </div>

            {/* Right Corporate Credentials Card */}
            <div className="lg:col-span-5">
              <TiltCard
                intensity={8}
                className="obsidian-panel rounded-3xl p-7 border border-teal/35 space-y-5"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <img
                    src="/favicon.svg"
                    alt="GWABS corporate emblem"
                    className="w-12 h-12 rounded-2xl ring-2 ring-teal/40"
                  />
                  <div>
                    <h2 className="text-base font-extrabold text-[#F4F7FB] font-outfit">
                      Corporate Profile
                    </h2>
                    <p className="text-xs font-mono text-teal">
                      Incorporated {company.incorporated}
                    </p>
                  </div>
                </div>

                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <dt className="text-[#9FB2D0]">CAC Registration No.</dt>
                    <dd className="font-mono font-bold text-[#F4F7FB]">#{company.rc}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <dt className="text-[#9FB2D0]">Tax Identification</dt>
                    <dd className="font-mono font-bold text-[#F4F7FB]">TIN {company.tin}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <dt className="text-[#9FB2D0]">Security Standard</dt>
                    <dd className="font-mono font-bold text-teal">PCI DSS Certified</dd>
                  </div>
                  <div className="pt-1">
                    <dt className="text-[#9FB2D0] mb-1">Headquarters</dt>
                    <dd className="text-[#F4F7FB] font-medium">{company.address}</dd>
                  </div>
                </dl>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Light Contrast Section: Engineering Principles & Compliance */}
      <section className="light-contrast-section py-20 border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0256CD] font-bold">
              INSTITUTIONAL STANDARDS
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#06122B] font-outfit">
              How We Engineer Financial Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGINEERING_PRINCIPLES.map((p) => (
              <TiltCard
                key={p.title}
                intensity={7}
                className="light-showcase-card rounded-2xl p-6"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal/15 text-[#04241F] font-bold">
                  {p.badge}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#06122B] font-outfit">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Evolution Section */}
      <section className="container mx-auto px-6 max-w-5xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Leadership Spotlight */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
              ARCHITECTURAL LEADERSHIP
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-offwhite font-outfit">
              Leadership
            </h2>
            <TiltCard intensity={7} className="glass-card rounded-3xl p-7 mt-5 border border-teal/35">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal to-cyber-blue text-teal-ink font-extrabold font-outfit text-xl flex items-center justify-center shadow-lg">
                  AG
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-offwhite font-outfit">
                    Abubakar Abdullahi Gwabare — Founder
                  </h3>
                  <p className="text-teal text-xs sm:text-sm font-mono mt-0.5">
                    Fintech Architect · POS &amp; Payment Systems
                  </p>
                </div>
              </div>

              <p className="mt-5 text-slate text-sm sm:text-base leading-relaxed">
                Fintech-focused engineer specialising in Kotlin, Android, and payment infrastructure, with hands-on delivery of POS and switching systems across NIBSS, Interswitch, and multiple processors. PCI DSS certified, with a track record building core-banking, POS, and SDK products.
              </p>

              <div className="mt-6 pt-5 border-t border-surface-border flex flex-wrap gap-2">
                {['Kotlin / Ktor', 'ISO 8583 (jPOS)', 'Android POS HAL', 'PCI DSS Certified', 'Multi-Tenant SaaS'].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-surface border border-surface-border text-offwhite"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Milestones Timeline */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
              TRACK RECORD
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-offwhite font-outfit">
              Company Evolution
            </h2>
            <div className="mt-5 space-y-4">
              {MILESTONES.map((m, idx) => (
                <div
                  key={m.phase}
                  className="glass-card rounded-2xl p-5 border-l-4 border-l-teal"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-teal mb-1">
                    <span>0{idx + 1} · {m.phase}</span>
                  </div>
                  <h3 className="text-base font-bold text-offwhite font-outfit">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solutions Cross-Links */}
        <div className="mt-14 pt-10 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-semibold text-offwhite">
            Explore our four core engineering pillars:
          </span>
          <div className="flex flex-wrap gap-2">
            {solutions.map((s) => (
              <Link
                key={`about-sol-${s.id}`}
                to={`/solutions#${s.id}`}
                className="text-xs font-semibold px-3.5 py-2 rounded-full bg-surface border border-surface-border text-slate hover:text-teal hover:border-teal transition-colors"
              >
                {s.icon} {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="container mx-auto px-6 py-16 border-t border-surface-border">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
            CLIENT FEEDBACK
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-offwhite font-outfit">
            What clients say
          </h2>
        </div>
        <div className="mt-8">
          <ReviewList />
        </div>
        <div className="mt-12">
          <ReviewForm />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
