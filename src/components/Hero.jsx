import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import TiltCard from './TiltCard.jsx'
import ParticleGridBackground from './ParticleGridBackground.jsx'

const HERO_SERVICES = [
  {
    id: 'pos-apps',
    step: '01',
    icon: '▣',
    label: 'POS Terminal Apps',
    offer: 'Custom Android EMV, NFC Tap & Agency Banking Apps',
    sub: 'EMV · NFC · PIN',
    to: '/solutions#pos-apps',
    posClass: 'top-3 left-2 sm:left-4',
    liveAction: 'POS TAP IN ACTION · ₦250,000.00 EMV CHIP & PIN VERIFIED',
    liveMeta: 'Topwise · Urovo · Blumen · CBN 50m Geofence Active',
  },
  {
    id: 'switching',
    step: '02',
    icon: '⇄',
    label: 'ISO 8583 Switching',
    offer: 'Multi-Processor BIN Routing & Automatic Failover',
    sub: 'BIN Failover Router',
    to: '/solutions#switching',
    posClass: 'top-3 right-2 sm:right-4',
    liveAction: 'SWITCH ROUTING · MTI 0200 → NIBSS / CORALPAY 0210 (180ms)',
    liveMeta: 'Zero-Downtime BIN Failover · TMK/TPK Key Exchange',
  },
  {
    id: 'sdks',
    step: '03',
    icon: '⚙',
    label: 'Unified Device SDKs',
    offer: 'One Kotlin & Flutter Payment HAL Across All OEMs',
    sub: 'Topwise · Urovo · Blumen',
    to: '/solutions#sdks',
    posClass: 'bottom-24 left-2 sm:left-4',
    liveAction: 'HAL SDK KERNEL · DUKPT IPEK DERIVED & RECEIPT PRINTED',
    liveMeta: 'Write Payment Logic Once · Native Android & Flutter Bridge',
  },
  {
    id: 'software',
    step: '04',
    icon: '◈',
    label: 'Multi-Tenant SaaS & TMS',
    offer: 'Fleet TMS, Lending (LMS), Virtual Accounts & POS-as-a-Service',
    sub: 'TMS · LMS · FleetOS',
    to: '/solutions#software',
    posClass: 'bottom-24 right-2 sm:right-4',
    liveAction: 'T+0 SETTLEMENT · PER-POS VIRTUAL ACCOUNT & <15ms WSS PUSH',
    liveMeta: 'BlumenTMS · Gwabs Business Suite · Reconcile · Okada FleetOS',
  },
]

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SERVICES.length)
    }, 3400)
    return () => clearInterval(timer)
  }, [paused])

  const activeService = HERO_SERVICES[activeIdx]

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 lg:pt-34 lg:pb-22 3xl:pt-40 3xl:pb-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ParticleGridBackground />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Clear Value Proposition + "What We Offer at First Glance" 4-Service Matrix */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/90 border border-teal/35 shadow-lg mb-5">
              <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
              <p className="text-[11px] sm:text-xs 3xl:text-sm tracking-[0.18em] font-bold text-teal uppercase">
                FINTECH SOLUTIONS &amp; CONSULTANCY
              </p>
              <span className="hidden sm:inline-block text-slate/40">|</span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-offwhite">
                POS · SWITCHING · SDKs · SAAS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl 3xl:text-7xl font-extrabold text-offwhite font-outfit leading-[1.07] tracking-tight">
              Fintech infrastructure,
              <br />
              <span className="text-gradient">engineered to settle.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base sm:text-lg 3xl:text-xl text-slate leading-relaxed">
              {company.whatWeDo} We build the complete payments stack for Nigerian banks, microfinance institutions, processors, and fleet operators.
            </p>

            {/* AT FIRST GLANCE: Interactive Auto-Rolling 4-Service Matrix */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-teal mb-2.5">
                <span>WHAT WE OFFER AT A GLANCE (CLICK OR WATCH AUTO-ROLL):</span>
                <a
                  href="#service-journey"
                  className="underline hover:text-offwhite transition-colors"
                >
                  Full POS Walkthrough ↓
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HERO_SERVICES.map((srv, idx) => {
                  const isSelected = idx === activeIdx
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`text-left rounded-2xl p-3.5 border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'obsidian-panel border-teal shadow-[0_0_25px_-5px_rgba(0,194,168,0.4)] scale-[1.01]'
                          : 'glass-card border-surface-border hover:border-teal/40 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-teal text-teal-ink shadow'
                            : 'bg-teal/15 text-teal border border-teal/30'
                        }`}
                      >
                        {srv.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-extrabold font-outfit text-offwhite truncate">
                            {srv.step}. {srv.label}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-teal/20 text-teal border border-teal/40 shrink-0">
                              LIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate mt-0.5 line-clamp-1">
                          {srv.offer}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dual Dribbble Pill CTAs + Live Walkthrough Trigger */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                to="/solutions"
                className="btn-gradient font-semibold py-3.5 px-7 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span>Explore solutions</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#service-journey"
                className="btn-white-pill font-bold py-3.5 px-6 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-teal-ink animate-ping" />
                <span>Watch POS in Action</span>
              </a>
              <Link
                to="/contact"
                className="glass-card border border-surface-border hover:border-teal/50 text-offwhite hover:text-teal font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all inline-flex items-center gap-2"
              >
                <span>Book a consultation</span>
                <span aria-hidden="true" className="text-xs">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Auto-Rolling 3D Shield + Live POS & Switch Action Stage */}
          <div className="lg:col-span-5">
            <TiltCard
              intensity={11}
              glareColor="rgba(54, 224, 200, 0.22)"
              className="obsidian-panel rounded-3xl p-5 sm:p-7 min-h-[460px] sm:min-h-[490px] flex flex-col justify-between relative group border border-teal/40"
            >
              {/* Perspective Floor Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-60 bg-perspective-grid opacity-55 pointer-events-none"
              />

              {/* Radial Cyan/Blue Glow behind Shield */}
              <div
                aria-hidden="true"
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse-glow pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(54,224,200,0.36) 0%, rgba(2,86,205,0.3) 55%, transparent 75%)',
                }}
              />

              {/* Top Stage Status Pill */}
              <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-[#9FB2D0] px-3 py-1.5 rounded-full bg-[#050E21]/85 border border-white/10">
                <span className="flex items-center gap-1.5 text-teal font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  AUTO-ROLLING SERVICE STAGE ({activeService.step}/04)
                </span>
                <span>{activeService.label}</span>
              </div>

              {/* Center 3D Shield + Connected Hexagonal Nodes */}
              <div className="relative flex-1 flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 420 340"
                  className="w-full max-w-[330px] h-auto relative z-10 select-none"
                  role="img"
                  aria-label="GWABS 3D Security Shield and Live POS Infrastructure Network"
                >
                  <defs>
                    <linearGradient id="shield-face-left" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E3A6D" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#0D2247" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#050E21" stopOpacity="0.98" />
                    </linearGradient>
                    <linearGradient id="shield-face-right" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#36E0C8" stopOpacity="0.38" />
                      <stop offset="45%" stopColor="#0A1E40" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#030917" stopOpacity="0.98" />
                    </linearGradient>
                    <linearGradient id="shield-rim" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor="#36E0C8" />
                      <stop offset="75%" stopColor="#0256CD" />
                      <stop offset="100%" stopColor="#36E0C8" />
                    </linearGradient>
                  </defs>

                  {/* Orbital Security Rings */}
                  <circle
                    cx="210"
                    cy="170"
                    r="125"
                    fill="none"
                    stroke="url(#shield-rim)"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    strokeDasharray="10 8"
                  />
                  <circle
                    cx="210"
                    cy="170"
                    r="98"
                    fill="none"
                    stroke="#36E0C8"
                    strokeWidth="1.2"
                    strokeOpacity="0.25"
                  />

                  {/* Orthogonal Circuit Traces to the 4 Corner Service Nodes */}
                  <g stroke="#1E3A6D" strokeWidth="1.8" fill="none">
                    <path d="M145 120 L95 80 H45" />
                    <path d="M275 120 L325 80 H375" />
                    <path d="M150 220 L95 260 H45" />
                    <path d="M270 220 L325 260 H375" />
                  </g>
                  <g stroke="#36E0C8" strokeWidth="2.4" fill="none" className="animate-circuit">
                    <path d="M145 120 L95 80 H45" />
                    <path d="M275 120 L325 80 H375" />
                    <path d="M150 220 L95 260 H45" />
                    <path d="M270 220 L325 260 H375" />
                  </g>

                  {/* Outer Glowing 3D Shield Silhouette */}
                  <path
                    d="M210 52 L296 86 V168 C296 232 258 276 210 298 C162 276 124 232 124 168 V86 Z"
                    fill="url(#shield-face-left)"
                    stroke="url(#shield-rim)"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M210 52 L296 86 V168 C296 232 258 276 210 298 V52 Z"
                    fill="url(#shield-face-right)"
                  />

                  {/* Central Active POS / EMV Core inside Shield */}
                  <rect
                    x="176"
                    y="132"
                    width="68"
                    height="76"
                    rx="12"
                    fill="#041024"
                    stroke="#36E0C8"
                    strokeWidth="2"
                  />
                  <rect
                    x="185"
                    y="141"
                    width="50"
                    height="26"
                    rx="4"
                    fill="#09234C"
                    stroke="#00C2A8"
                    strokeWidth="1.2"
                  />
                  <text
                    x="210"
                    y="158"
                    fontSize="11"
                    fill="#36E0C8"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {activeService.step}·LIVE
                  </text>
                  {/* POS Keypad Dots inside Shield Core */}
                  {[0, 1, 2].map((c) => (
                    <circle
                      key={c}
                      cx={194 + c * 16}
                      cy="182"
                      r="3.2"
                      fill="#36E0C8"
                    />
                  ))}
                  {[0, 1, 2].map((c) => (
                    <circle
                      key={`r2-${c}`}
                      cx={194 + c * 16}
                      cy="195"
                      r="3.2"
                      fill="#60A5FA"
                    />
                  ))}
                </svg>

                {/* 4 Floating Clickable Hexagonal Service Nodes synchronized with auto-roll */}
                {HERO_SERVICES.map((node, idx) => {
                  const isActiveNode = idx === activeIdx
                  return (
                    <Link
                      key={node.id}
                      to={node.to}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`absolute ${node.posClass} z-20 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md transition-all ${
                        isActiveNode
                          ? 'bg-[#0C2552]/95 border-2 border-teal shadow-[0_0_25px_rgba(0,194,168,0.5)] scale-105'
                          : 'bg-[#07142C]/85 border border-teal/30 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isActiveNode
                            ? 'bg-teal text-teal-ink'
                            : 'bg-teal/15 border border-teal/40 text-teal'
                        }`}
                      >
                        {node.icon}
                      </span>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-[#F4F7FB] leading-tight">
                          {node.label}
                        </p>
                        <p className="text-[9px] font-mono text-teal/90 leading-tight">
                          {node.sub}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Bottom Live Auto-Rolling POS & Service Telemetry HUD Bar */}
              <div className="relative z-20 rounded-2xl bg-[#040B1A]/95 border border-teal/40 p-3.5 shadow-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-teal truncate">
                    {activeService.liveAction}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-teal/20 text-teal font-mono text-[9px] font-bold shrink-0">
                    0210 OK
                  </span>
                </div>
                <p className="text-[11px] text-[#9FB2D0] mt-1 truncate">
                  {activeService.liveMeta}
                </p>
                {/* Mini Step Progress Dots */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  {HERO_SERVICES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Preview ${s.label}`}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeIdx ? 'w-8 bg-teal' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                  <span className="ml-auto text-[10px] font-mono text-teal">
                    Auto-rolling →
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
