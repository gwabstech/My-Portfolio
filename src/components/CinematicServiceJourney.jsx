import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'
import {
  PosDevice3DMotion,
  IsoSwitch3DMotion,
  HalSdk3DMotion,
  FleetAndSaas3DMotion,
} from './PosAndService3DAnimator.jsx'

const JOURNEY_SCENES = [
  {
    id: 'pos-action',
    stepNumber: '01',
    icon: '▣',
    servicePillar: 'POS Terminal Applications',
    pillarLink: '/solutions#pos-apps',
    badge: 'CARD INSERT → PIN → CHARGE → RECEIPT',
    title: 'Customer Inserts Card, Authorizes PIN, Gets Charged & Receipt Prints',
    summary:
      'Watch our physical POS terminal flow in real time: the customer inserts their EMV chip card (or taps NFC), keys in their 4-digit PIN on the encrypted keypad, gets charged in milliseconds, and a printed thermal receipt unrolls automatically.',
    telemetry: [
      { label: '1. Card Insert & Read', value: 'EMV L1/L2 Chip AID + NFC Contactless Tap' },
      { label: '2. PIN Authorization', value: 'Hardware PIN Pad · DUKPT 3DES/AES PinBlock' },
      { label: '3. Instant Charge', value: '₦250,000.00 Authorized · CBN 50m GPS Verified' },
      { label: '4. Thermal Receipt', value: 'Auto-printed customer & merchant copy' },
    ],
    deliverables: [
      'Custom Android POS Apps',
      'EMV Chip, NFC & PIN Flows',
      'Agency Banking & Cashout',
      'Instant Thermal Receipt Printing',
    ],
    caseStudy: {
      title: 'Getpayed Android POS',
      slug: 'getpayed-android-pos',
      client: 'Getpayed Technology',
    },
  },
  {
    id: 'iso-switching',
    stepNumber: '02',
    icon: '⇄',
    servicePillar: 'Payment Switching & Middleware',
    pillarLink: '/solutions#switching',
    badge: '3D ORBITAL ISO 8583 SWITCH',
    title: 'Intelligent BIN Routing & Zero-Downtime Processor Failover',
    summary:
      'The encrypted ISO 8583 (0200) charge packet enters our 3D orbital switch core. It routes dynamically by card BIN across NIBSS, Interswitch, CoralPay, and Zone — automatically re-routing in <180ms if any processor slows down.',
    telemetry: [
      { label: 'Ingress Protocol', value: 'ISO 8583 (jPOS) + TLS Mutual Auth REST' },
      { label: 'Primary Route', value: 'NIBSS EPMS / CoralPay Direct (180ms)' },
      { label: 'Failover Policy', value: 'Auto BIN re-route + instant 0420 reversal' },
      { label: 'Security', value: 'AES-256-GCM payloads & HMAC-SHA256 webhooks' },
    ],
    deliverables: [
      'Multi-Processor ISO 8583 Switch',
      'Intelligent BIN Routing Engine',
      'Automated Timeout Reversals',
      'Bank & Processor Connectors',
    ],
    caseStudy: {
      title: 'Bellbank Cashout Middleware',
      slug: 'bellbank-cashout-middleware',
      client: 'Bellbank MFB',
    },
  },
  {
    id: 'sdk-hal',
    stepNumber: '03',
    icon: '⚙',
    servicePillar: 'Device & Hardware SDKs',
    pillarLink: '/solutions#sdks',
    badge: '3D EXPLODED HARDWARE HAL',
    title: 'One Payment SDK Driving Topwise, Urovo & Blumen Simultaneously',
    summary:
      'Instead of rewriting payment code for every POS manufacturer, our unified Hardware Abstraction Layer (HAL) lets one Kotlin or Flutter call drive card readers, DUKPT key slots, and thermal printers across all terminal vendors.',
    telemetry: [
      { label: 'Unified API', value: 'GwabsPosSdk.chargeCard() → Native & Flutter' },
      { label: 'Supported HALs', value: 'Topwise + Urovo + Blumen in 1 artifact' },
      { label: 'Cryptography', value: 'BouncyCastle · DUKPT · Master/Session Keys' },
      { label: 'Local Storage', value: 'Encrypted SQLite journal & reversal queue' },
    ],
    deliverables: [
      'Multi-Vendor Android HAL SDK',
      'Flutter Payment Plugin Bridge',
      'Automated TMK/TPK Key Exchange',
      'EMV L1/L2 Pre-Certified Flows',
    ],
    caseStudy: {
      title: 'TeasyPay POS SDK',
      slug: 'teasypay-pos-sdk',
      client: 'Teasy Mobile International',
    },
  },
  {
    id: 'saas-settlement',
    stepNumber: '04',
    icon: '◈',
    servicePillar: 'Fintech Software & Consultancy',
    pillarLink: '/solutions#software',
    badge: '3D FLEET RADAR & T+0 VAULTS',
    title: 'Fleet TMS Radar, Sub-ms Alerts & Multi-Tenant T+0 Settlement',
    summary:
      'Our 3D fleet radar enforces CBN 50m geofences and pushes <15ms WebSocket voice/screen alerts to terminals, while funds settle into isolated per-POS virtual accounts across our banking, lending, and fleet platforms.',
    telemetry: [
      { label: 'Fleet Control', value: 'BlumenTMS Canary APK OTA & Geofence Kill-Switch' },
      { label: 'Push Latency', value: '< 15ms via Ktor Netty WebSocket Alert Gateway' },
      { label: 'Account Model', value: 'Per-POS Collection DVA + Automated T+0 Sweep' },
      { label: 'Live Platforms', value: 'GBS (gbs.ng) · Reconcile LMS · Okada FleetOS' },
    ],
    deliverables: [
      'POS-as-a-Service for MFBs & Banks',
      'Terminal Management System (TMS)',
      'Multi-Tenant SaaS POS & Lending (LMS)',
      'Fleet Telematics & Asset Financing',
    ],
    caseStudy: {
      title: 'Regent MFB — Merchant Platform',
      slug: 'regent-mfb-merchant-platform',
      client: 'Regent MFB',
    },
  },
]

const TERMINAL_VENDORS = ['Topwise MP35', 'Urovo i5300', 'Blumen S60']

export default function CinematicServiceJourney() {
  const sectionRef = useRef(null)
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [scrollSync, setScrollSync] = useState(true)
  const [progress, setProgress] = useState(0)
  const [vendorIdx, setVendorIdx] = useState(0)
  const [failoverSimulated, setFailoverSimulated] = useState(false)
  const [forcedPosPhase, setForcedPosPhase] = useState(null)

  // Auto-rolling timer (gives POS Card-Insert -> PIN -> Charge -> Receipt 7s to play out completely)
  useEffect(() => {
    if (!isPlaying) return
    const tickMs = activeSceneIndex === 0 ? 140 : 110
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSceneIndex((idx) => (idx + 1) % JOURNEY_SCENES.length)
          setForcedPosPhase(null)
          return 0
        }
        return prev + 2
      })
    }, tickMs)
    return () => clearInterval(interval)
  }, [isPlaying, activeSceneIndex])

  // Scroll-driven progression: as the user scrolls through this section, rotate the 3D Orbital Circle & POS phases
  useEffect(() => {
    if (!scrollSync || typeof window === 'undefined') return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 800
      // Only drive when section is actively scrolling through viewport
      if (rect.top < vh * 0.65 && rect.bottom > vh * 0.35) {
        const totalTravel = rect.height + vh * 0.3
        const currentTravel = vh * 0.65 - rect.top
        const ratio = Math.max(0, Math.min(0.999, currentTravel / totalTravel))
        const mappedStage = Math.floor(ratio * JOURNEY_SCENES.length)
        if (mappedStage >= 0 && mappedStage < JOURNEY_SCENES.length) {
          setActiveSceneIndex(mappedStage)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollSync])

  const selectScene = (idx) => {
    setActiveSceneIndex(idx)
    setProgress(0)
    setForcedPosPhase(null)
  }

  const scene = JOURNEY_SCENES[activeSceneIndex]
  const currentVendor = TERMINAL_VENDORS[vendorIdx]

  return (
    <section
      ref={sectionRef}
      id="service-journey"
      aria-label="Cinematic Service Walkthrough and POS in Action"
      className="relative py-20 3xl:py-28 overflow-hidden border-b border-surface-border"
    >
      <div className="container mx-auto px-6">
        {/* Top Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit leading-tight">
              Watch Our Services in Action:{' '}
              <span className="text-gradient">Card Insert → Auth → Charge → Receipt</span>
            </h2>
            <p className="mt-3 text-slate text-sm sm:text-base">
              From a customer inserting their EMV card and authorizing PIN to ISO 8583 switch routing and instant thermal receipt printing across our full payments stack.
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
              className="px-4 py-2 rounded-full bg-surface border border-teal/40 text-xs font-mono font-bold text-teal hover:bg-teal hover:text-teal-ink transition-all"
            >
              {isPlaying ? '⏸ Pause Auto-Flow' : '▶ Auto-Flow'}
            </button>

            <button
              type="button"
              onClick={() => setScrollSync((s) => !s)}
              className={`px-3.5 py-2 rounded-full border text-xs font-mono transition-all ${
                scrollSync
                  ? 'bg-teal/15 border-teal/50 text-teal font-bold'
                  : 'bg-surface border-surface-border text-slate'
              }`}
            >
              {scrollSync ? '◎ Scroll-Sync ON' : '○ Scroll-Sync OFF'}
            </button>

            <button
              type="button"
              onClick={() => setVendorIdx((v) => (v + 1) % TERMINAL_VENDORS.length)}
              className="px-3.5 py-2 rounded-full bg-surface border border-surface-border hover:border-teal/40 text-xs font-mono text-offwhite transition-all"
            >
              OEM: <span className="text-teal font-bold">{currentVendor}</span> ↻
            </button>

            <button
              type="button"
              onClick={() => {
                setFailoverSimulated((f) => !f)
                selectScene(1)
              }}
              className={`px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all ${
                failoverSimulated
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-surface border-surface-border text-slate hover:text-offwhite'
              }`}
            >
              {failoverSimulated ? '⚡ Failover Active (CoralPay)' : '⇄ Simulate Switch Failover'}
            </button>
          </div>
        </div>

        {/* 4-Service Circular / Orbital Selector Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {JOURNEY_SCENES.map((item, idx) => {
            const isCurrent = idx === activeSceneIndex
            const isCompleted = idx < activeSceneIndex
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectScene(idx)}
                className={`text-left rounded-2xl p-4 border transition-all relative overflow-hidden flex items-start gap-3 ${
                  isCurrent
                    ? 'obsidian-panel border-teal shadow-[0_0_28px_-5px_rgba(0,194,168,0.45)] scale-[1.01]'
                    : 'glass-card border-surface-border hover:border-teal/40 opacity-85 hover:opacity-100'
                }`}
              >
                {/* Circular 3D Service Badge */}
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-teal text-teal-ink shadow-[0_0_16px_#00C2A8]'
                      : 'bg-teal/15 border border-teal/35 text-teal'
                  }`}
                >
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                    <span className={isCurrent ? 'text-teal font-bold' : 'text-slate'}>
                      SERVICE {item.stepNumber}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCurrent
                          ? 'bg-teal animate-ping'
                          : isCompleted
                          ? 'bg-teal'
                          : 'bg-surface-border'
                      }`}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold font-outfit text-offwhite truncate">
                    {item.servicePillar}
                  </div>
                  <div className="text-[10px] font-mono text-slate truncate mt-0.5">
                    {item.badge}
                  </div>

                  <div className="mt-2.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-cyber-blue transition-all duration-100"
                      style={{
                        width: isCurrent ? `${progress}%` : isCompleted ? '100%' : '0%',
                      }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main 3D Orbital Stage + Service Narrative & Telemetry */}
        <div className="obsidian-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-teal/40 shadow-2xl relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-arch-grid opacity-45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-45"
            style={{
              background:
                'radial-gradient(circle, rgba(0,194,168,0.38), rgba(2,86,205,0.28), transparent 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN (Cols 1-5): 3D Orbital Circle Stage with Live POS Card-Insert-to-Receipt & Service 3D Objects */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <TiltCard
                intensity={9}
                className="w-full rounded-3xl bg-[#050E22]/90 border border-teal/35 p-4 sm:p-6 relative flex flex-col items-center justify-between min-h-[490px]"
              >
                {/* Top Quick-Trigger Buttons for POS Animation Phases */}
                <div className="w-full flex flex-wrap items-center justify-between gap-1.5 pb-3 border-b border-white/10 text-[10px] font-mono">
                  <span className="text-teal font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                    3D OBJECT IN MOTION
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(0)
                        setForcedPosPhase(0)
                      }}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-teal hover:text-teal-ink text-white transition-colors"
                    >
                      1.Insert
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(0)
                        setForcedPosPhase(1)
                      }}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-teal hover:text-teal-ink text-white transition-colors"
                    >
                      2.PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(0)
                        setForcedPosPhase(2)
                      }}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-teal hover:text-teal-ink text-white transition-colors"
                    >
                      3.Charge
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(0)
                        setForcedPosPhase(3)
                      }}
                      className="px-2 py-0.5 rounded bg-teal text-teal-ink font-extrabold hover:brightness-110 transition-colors"
                    >
                      PRINT
                    </button>
                  </div>
                </div>

                {/* Active 3D Service Object */}
                <div className="my-auto w-full flex items-center justify-center">
                  {activeSceneIndex === 0 && (
                    <PosDevice3DMotion
                      vendor={currentVendor}
                      failover={failoverSimulated}
                      forcedPhaseIndex={forcedPosPhase}
                    />
                  )}
                  {activeSceneIndex === 1 && (
                    <IsoSwitch3DMotion failover={failoverSimulated} />
                  )}
                  {activeSceneIndex === 2 && <HalSdk3DMotion />}
                  {activeSceneIndex === 3 && <FleetAndSaas3DMotion />}
                </div>

                {/* Bottom Orbital Circle Navigation Dots */}
                <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#9FB2D0]">
                  <span>ORBITAL RING: {scene.servicePillar}</span>
                  <button
                    type="button"
                    onClick={() => setForcedPosPhase(null)}
                    className="text-teal hover:underline"
                  >
                    Auto-Cycle ↻
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* RIGHT COLUMN (Cols 6-12): Service Story, Deliverables & White Telemetry Card */}
            <div className="lg:col-span-7 space-y-6">
              {/* 4-Step POS Flow Strip (Always visible so user sees the full Insert -> Auth -> Charge -> Receipt journey) */}
              <div className="rounded-2xl bg-[#040B1A]/90 border border-white/10 p-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-teal mb-2.5">
                  <span>END-TO-END TRANSACTION &amp; SERVICE FLOW</span>
                  <span>
                    {failoverSimulated
                      ? '⚡ FAILOVER ACTIVE: CORALPAY RAIL'
                      : 'NIBSS / INTERSWITCH / HAL'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { step: '01', title: 'Card Inserted', sub: 'EMV Chip / NFC Tap' },
                    { step: '02', title: 'PIN Authorized', sub: 'DUKPT Keypad Auth' },
                    { step: '03', title: 'Switch Charged', sub: 'ISO 8583 0210 OK' },
                    { step: '04', title: 'Receipt & T+0', sub: 'Thermal Print & DVA' },
                  ].map((flow, i) => (
                    <button
                      key={flow.step}
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(0)
                        setForcedPosPhase(i)
                      }}
                      className="rounded-xl bg-white/5 hover:bg-teal/15 border border-white/10 hover:border-teal/50 p-2.5 text-left transition-all"
                    >
                      <div className="text-[10px] font-mono text-teal font-bold">
                        STEP {flow.step}
                      </div>
                      <div className="text-xs font-bold text-white font-outfit">
                        {flow.title}
                      </div>
                      <div className="text-[9.5px] font-mono text-[#9FB2D0]">
                        {flow.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Explanation + Live White Telemetry Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-teal text-teal-ink text-xs font-extrabold font-outfit">
                        SERVICE {scene.stepNumber}: {scene.servicePillar}
                      </span>
                      <span className="text-xs font-mono text-teal">
                        {scene.badge}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#F4F7FB] font-outfit leading-snug">
                      {scene.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base text-[#9FB2D0] leading-relaxed">
                      {scene.summary}
                    </p>

                    <div className="mt-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-teal block mb-2">
                        WHAT WE DELIVER IN THIS SERVICE:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {scene.deliverables.map((d) => (
                          <div
                            key={d}
                            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#F4F7FB] flex items-center gap-2"
                          >
                            <span className="text-teal font-bold">✓</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      to={scene.pillarLink}
                      className="btn-gradient font-semibold text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center gap-1.5"
                    >
                      <span>Explore {scene.servicePillar}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      to={`/case-studies/${scene.caseStudy.slug}`}
                      className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-teal text-xs sm:text-sm font-semibold text-[#F4F7FB] hover:text-teal transition-colors"
                    >
                      Live Proof: {scene.caseStudy.title} ↗
                    </Link>
                  </div>
                </div>

                {/* Crisp White Telemetry Card */}
                <div className="md:col-span-5 flex">
                  <div className="light-showcase-card rounded-2xl p-5 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0256CD]">
                          LIVE SYSTEM TELEMETRY
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          IN MOTION
                        </span>
                      </div>

                      <dl className="mt-3 space-y-2.5">
                        {scene.telemetry.map((t) => (
                          <div key={t.label} className="border-b border-slate-100 pb-2 last:border-0">
                            <dt className="text-[10px] font-mono uppercase text-slate-400">
                              {t.label}
                            </dt>
                            <dd className="text-xs font-bold text-[#06122B] mt-0.5">
                              {t.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Client: {scene.caseStudy.client}
                      </span>
                      <Link
                        to="/contact"
                        className="font-bold text-[#0256CD] hover:underline"
                      >
                        Request Demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
