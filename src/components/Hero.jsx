import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import TiltCard from './TiltCard.jsx'
import ParticleGridBackground from './ParticleGridBackground.jsx'
import {
  PosDevice3DMotion,
  IsoSwitch3DMotion,
  HalSdk3DMotion,
  FleetAndSaas3DMotion,
} from './PosAndService3DAnimator.jsx'

const HERO_SERVICES = [
  {
    id: 'pos-apps',
    step: '01',
    icon: '▣',
    label: 'POS Terminal Apps',
    offer: 'Card Insert → PIN Auth → Charge → Instant Receipt',
    sub: 'EMV · NFC · PIN',
    to: '/solutions#pos-apps',
    orbitPos: 'top-2 left-2',
    liveAction: 'POS IN MOTION · CARD INSERTED → PIN VERIFIED → CHARGED → RECEIPT PRINTED',
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
    orbitPos: 'top-2 right-2',
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
    orbitPos: 'bottom-20 left-2',
    liveAction: 'HAL SDK KERNEL · 1 API CALL DRIVING 3 POS VENDORS SIMULTANEOUSLY',
    liveMeta: 'Write Payment Logic Once · Native Android & Flutter Bridge',
  },
  {
    id: 'software',
    step: '04',
    icon: '◈',
    label: 'Multi-Tenant SaaS & TMS',
    offer: 'Fleet Radar, Lending (LMS), Virtual Accounts & POS-as-a-Service',
    sub: 'TMS · LMS · FleetOS',
    to: '/solutions#software',
    orbitPos: 'bottom-20 right-2',
    liveAction: 'T+0 SETTLEMENT · CBN RADAR LOCK & PER-POS VIRTUAL ACCOUNT',
    liveMeta: 'BlumenTMS · Gwabs Business Suite · Reconcile · Okada FleetOS',
  },
]

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-roll through the 4 services (gives POS device 7s so user sees full Insert -> PIN -> Charge -> Receipt cycle!)
  useEffect(() => {
    if (paused) return
    const duration = activeIdx === 0 ? 7000 : 4800
    const timer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SERVICES.length)
    }, duration)
    return () => clearTimeout(timer)
  }, [activeIdx, paused])

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
          {/* Left Column: Value Proposition + "What We Offer at First Glance" 4-Service Matrix */}
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
              {company.whatWeDo} Watch our live 3D POS terminal insert a customer card, authorize PIN, route ISO 8583, and print a thermal receipt — or click any service below to see its 3D engine in motion.
            </p>

            {/* AT FIRST GLANCE: Interactive Auto-Rolling 4-Service Matrix */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-teal mb-2.5">
                <span>WHAT WE OFFER AT A GLANCE (CLICK TO SWITCH 3D STAGE):</span>
                <a
                  href="#service-journey"
                  className="underline hover:text-offwhite transition-colors"
                >
                  Scroll 3D Orbital Walkthrough ↓
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-teal text-teal-ink shadow-[0_0_12px_#00C2A8]'
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
                              3D LIVE
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

            {/* Pill CTAs */}
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
                <span>3D POS &amp; Services Walkthrough</span>
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

          {/* Right Column: 3D Orbital Circle Stage with Live Animated POS (Card Insert -> PIN -> Charge -> Receipt) & All Services */}
          <div className="lg:col-span-5">
            <TiltCard
              intensity={10}
              glareColor="rgba(54, 224, 200, 0.22)"
              className="obsidian-panel rounded-3xl p-4 sm:p-6 min-h-[540px] flex flex-col justify-between relative group border border-teal/45"
            >
              {/* Perspective Floor Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-60 bg-perspective-grid opacity-50 pointer-events-none"
              />

              {/* Top 3D Stage Selector Header */}
              <div className="relative z-30 flex items-center justify-between gap-2 text-[10px] font-mono text-[#9FB2D0] px-3 py-1.5 rounded-full bg-[#050E21]/90 border border-white/10">
                <span className="flex items-center gap-1.5 text-teal font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  3D ORBITAL STAGE ({activeService.step}/04)
                </span>
                <div className="flex items-center gap-1">
                  {HERO_SERVICES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`px-2 py-0.5 rounded-full transition-colors ${
                        idx === activeIdx
                          ? 'bg-teal text-teal-ink font-bold'
                          : 'hover:text-white'
                      }`}
                    >
                      {s.step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Center Live 3D Animated Service Object surrounded by 4 Circular Orbital Badges */}
              <div className="relative flex-1 flex items-center justify-center my-1">
                {activeIdx === 0 && <PosDevice3DMotion compact />}
                {activeIdx === 1 && <IsoSwitch3DMotion />}
                {activeIdx === 2 && <HalSdk3DMotion />}
                {activeIdx === 3 && <FleetAndSaas3DMotion />}

                {/* 4 Orbiting Circle Service Cards around the 3D Stage */}
                {HERO_SERVICES.map((node, idx) => {
                  const isActiveNode = idx === activeIdx
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`hidden sm:flex absolute ${node.orbitPos} z-30 items-center gap-2 px-2.5 py-1.5 rounded-full backdrop-blur-md transition-all ${
                        isActiveNode
                          ? 'bg-[#0C2552]/95 border-2 border-teal shadow-[0_0_22px_rgba(0,194,168,0.55)] scale-105'
                          : 'bg-[#07142C]/80 border border-white/15 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isActiveNode
                            ? 'bg-teal text-teal-ink'
                            : 'bg-teal/15 text-teal'
                        }`}
                      >
                        {node.icon}
                      </span>
                      <span className="text-[10px] font-bold text-[#F4F7FB] pr-1">
                        {node.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Bottom Live Auto-Rolling POS & Service Telemetry HUD Bar */}
              <div className="relative z-30 rounded-2xl bg-[#040B1A]/95 border border-teal/40 p-3 shadow-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-teal truncate">
                    {activeService.liveAction}
                  </span>
                  <Link
                    to={activeService.to}
                    className="px-2 py-0.5 rounded bg-teal/20 text-teal hover:bg-teal hover:text-teal-ink font-mono text-[9px] font-bold shrink-0 transition-colors"
                  >
                    Specs →
                  </Link>
                </div>
                <p className="text-[10.5px] text-[#9FB2D0] mt-0.5 truncate">
                  {activeService.liveMeta}
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
