import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'

const JOURNEY_SCENES = [
  {
    id: 'pos-action',
    stepNumber: '01',
    servicePillar: 'POS Terminal Applications',
    pillarLink: '/solutions#pos-apps',
    badge: 'FIELD POS IN ACTION',
    title: 'Tap, Chip & PIN on Real Android POS Hardware',
    summary:
      'Customers tap or insert an EMV card on a Topwise, Urovo, Blumen, or Horizon Android terminal. The app verifies CBN 50m geofence compliance, captures encrypted PIN, and prints an instant thermal receipt.',
    posScreen: {
      header: 'GWABS PAY · TERMINAL #ABJ-042',
      status: 'NFC CONTACTLESS TAP DETECTED',
      amount: '₦250,000.00',
      subtext: 'MASTERCARD •••• 8842 · EMV L2',
      stepBadge: 'STEP 1/5 · CARD & PIN VERIFIED',
      receiptVisible: false,
      pinDots: 4,
    },
    telemetry: [
      { label: 'Hardware OEM', value: 'Topwise MP35 / Urovo i5300 / Horizon S60' },
      { label: 'Card Kernel', value: 'EMV Contact + NFC Tap + Offline/Online PIN' },
      { label: 'CBN Geofence', value: 'LOCKED · 14m from registered agent coordinates' },
      { label: 'Offline Queue', value: 'Auto-retry & store-and-forward resilience' },
    ],
    deliverables: [
      'Custom Android POS Apps',
      'Agency Banking & Cashout',
      'Government & IGR Collections',
      'Instant Thermal Receipt Printing',
    ],
    caseStudy: {
      title: 'Getpayed Android POS',
      slug: 'getpayed-android-pos',
      client: 'Getpayed Technology',
    },
  },
  {
    id: 'sdk-hal',
    stepNumber: '02',
    servicePillar: 'Device & Hardware SDKs',
    pillarLink: '/solutions#sdks',
    badge: 'UNIFIED HARDWARE HAL',
    title: 'One Payment SDK Across Every Terminal Vendor',
    summary:
      'Under the hood, our unified Hardware Abstraction Layer (HAL) translates one clean Kotlin or Flutter call into vendor-specific EMV kernels, DUKPT key slots, and printer drivers.',
    posScreen: {
      header: 'GWABS HAL SDK v1.4.2',
      status: 'DERIVING DUKPT IPEK / PEK KEYS',
      amount: '₦250,000.00',
      subtext: 'KEY SLOT #02 · AES / 3DES PIN BLOCK',
      stepBadge: 'STEP 2/5 · HAL ENCRYPTION READY',
      receiptVisible: false,
      pinDots: 4,
    },
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
    id: 'iso-switching',
    stepNumber: '03',
    servicePillar: 'Payment Switching & Middleware',
    pillarLink: '/solutions#switching',
    badge: 'HIGH-AVAILABILITY SWITCHING',
    title: 'Intelligent BIN Routing & Zero-Downtime Failover',
    summary:
      'The encrypted ISO 8583 (0200) payload hits our high-availability switch. It routes by card BIN across NIBSS, Interswitch, CoralPay, and Zone — automatically failing over in milliseconds if a rail degrades.',
    posScreen: {
      header: 'ISO 8583 SWITCH ROUTER',
      status: 'MTI 0200 → 0210 APPROVED (00)',
      amount: '₦250,000.00',
      subtext: 'STAN 492810 · RRN 632904819201',
      stepBadge: 'STEP 3/5 · ROUTED & AUTHORIZED',
      receiptVisible: false,
      pinDots: 4,
    },
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
    id: 'tms-alerts',
    stepNumber: '04',
    servicePillar: 'Terminal Management & Gateways',
    pillarLink: '/solutions#software',
    badge: 'FLEET TMS & REAL-TIME PUSH',
    title: 'Sub-Millisecond Alerts & Remote Fleet Control',
    summary:
      'The moment the switch settles, our stateless Ktor WebSocket Gateway pushes an encrypted confirmation to the terminal in under 15ms while BlumenTMS monitors device health, geofence, and OTA updates.',
    posScreen: {
      header: 'WSS ALERT STREAM · < 12ms',
      status: 'INSTANT VOICE & PUSH CONFIRMED',
      amount: '₦250,000.00',
      subtext: 'FLEET HEARTBEAT: ONLINE · APK v1.7.4',
      stepBadge: 'STEP 4/5 · PUSH & RECEIPT PRINT',
      receiptVisible: true,
      pinDots: 4,
    },
    telemetry: [
      { label: 'Push Latency', value: '< 15ms via Ktor Netty WebSocket Gateway' },
      { label: 'Offline Replay', value: 'In-memory queue replays missed alerts on 4G' },
      { label: 'Fleet Control', value: 'Canary APK OTA rollout + remote kill-switch' },
      { label: 'Telemetry', value: 'Battery, paper, SIM & GPS live dashboard' },
    ],
    deliverables: [
      'Terminal Management System (TMS)',
      'Real-Time WebSocket Alert SDK',
      'Remote Geofence Kill-Switch',
      'Canary APK Over-The-Air Updates',
    ],
    caseStudy: {
      title: 'BlumenTMS — Terminal Management',
      slug: 'blumen-tms',
      client: 'Blumen',
    },
  },
  {
    id: 'saas-settlement',
    stepNumber: '05',
    servicePillar: 'Fintech Software & Consultancy',
    pillarLink: '/solutions#software',
    badge: 'T+0 LEDGER & MULTI-TENANT SAAS',
    title: 'Automated Virtual Accounts, Sweeps & Reconciliation',
    summary:
      'Funds settle straight into isolated per-POS or merchant virtual accounts. Platform fees split automatically, ledgers reconcile at T+0, and merchants track everything across web and mobile consoles.',
    posScreen: {
      header: 'T+0 SETTLEMENT ENGINE',
      status: 'MERCHANT WALLET CREDITED',
      amount: '₦250,000.00',
      subtext: 'DVA #8049201942 · LEDGER BALANCED',
      stepBadge: 'STEP 5/5 · SETTLED & RECONCILED',
      receiptVisible: true,
      pinDots: 4,
    },
    telemetry: [
      { label: 'Account Model', value: 'Per-POS Collection DVA + Merchant Hierarchy' },
      { label: 'Reconciliation', value: 'Automated T+0 ledger match & fee sweep' },
      { label: 'Access Control', value: 'Multi-tenant RBAC (Super Admin → Cashier)' },
      { label: 'Live Platforms', value: 'GBS (gbs.ng) · Reconcile LMS · Okada FleetOS' },
    ],
    deliverables: [
      'POS-as-a-Service for MFBs & Banks',
      'Multi-Tenant SaaS POS & Inventory',
      'Lending Management (LMS)',
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
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [vendorIdx, setVendorIdx] = useState(0)
  const [failoverSimulated, setFailoverSimulated] = useState(false)
  const [manualReceipt, setManualReceipt] = useState(false)

  // Auto-rolling cinematic timer (ticks every 100ms, advances scene every 5.5s)
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSceneIndex((idx) => (idx + 1) % JOURNEY_SCENES.length)
          return 0
        }
        return prev + 2
      })
    }, 110)
    return () => clearInterval(interval)
  }, [isPlaying])

  const selectScene = (idx) => {
    setActiveSceneIndex(idx)
    setProgress(0)
  }

  const scene = JOURNEY_SCENES[activeSceneIndex]
  const currentVendor = TERMINAL_VENDORS[vendorIdx]
  const showReceipt = scene.posScreen.receiptVisible || manualReceipt

  return (
    <section
      id="service-journey"
      aria-label="Cinematic Service Walkthrough and POS in Action"
      className="relative py-20 3xl:py-28 overflow-hidden border-b border-surface-border"
    >
      <div className="container mx-auto px-6">
        {/* Top Section Header: What We Offer & How Our Services Connect */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/15 border border-teal/40 text-xs font-mono font-bold text-teal mb-3">
              <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
              <span>AUTO-ROLLING CINEMATIC SERVICE WALKTHROUGH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit leading-tight">
              Watch Our Services in Action:{' '}
              <span className="text-gradient">From POS Tap to T+0 Settlement</span>
            </h2>
            <p className="mt-3 text-slate text-sm sm:text-base">
              An interactive, auto-rolling journey across everything GWABS builds — watch a live ₦250,000 transaction flow through our Android POS app, unified hardware SDK, ISO 8583 switch, and cloud ledger.
            </p>
          </div>

          {/* Playback & Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
              className="px-4 py-2.5 rounded-full bg-surface border border-teal/40 text-xs font-mono font-bold text-teal hover:bg-teal hover:text-teal-ink transition-all flex items-center gap-2"
            >
              <span>{isPlaying ? '⏸ Pause Auto-Roll' : '▶ Resume Auto-Roll'}</span>
            </button>

            <button
              type="button"
              onClick={() => setVendorIdx((v) => (v + 1) % TERMINAL_VENDORS.length)}
              className="px-4 py-2.5 rounded-full bg-surface border border-surface-border hover:border-teal/40 text-xs font-mono text-offwhite transition-all"
            >
              OEM: <span className="text-teal font-bold">{currentVendor}</span> ↻
            </button>

            <button
              type="button"
              onClick={() => {
                setFailoverSimulated((f) => !f)
                selectScene(2) // Jump to ISO 8583 switching scene
              }}
              className={`px-4 py-2.5 rounded-full border text-xs font-mono font-bold transition-all ${
                failoverSimulated
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-surface border-surface-border text-slate hover:text-offwhite'
              }`}
            >
              {failoverSimulated ? '⚡ Failover Active (CoralPay)' : '⇄ Simulate Switch Failover'}
            </button>
          </div>
        </div>

        {/* 5-Stage Service Journey Scrubber Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {JOURNEY_SCENES.map((item, idx) => {
            const isCurrent = idx === activeSceneIndex
            const isCompleted = idx < activeSceneIndex
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectScene(idx)}
                className={`text-left rounded-2xl p-3.5 border transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'obsidian-panel border-teal shadow-[0_0_25px_-5px_rgba(0,194,168,0.4)]'
                    : 'glass-card border-surface-border hover:border-teal/40 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isCurrent ? 'text-teal font-bold' : 'text-slate'}>
                    STAGE {item.stepNumber}
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
                <div className="text-xs sm:text-sm font-bold font-outfit text-offwhite truncate">
                  {item.servicePillar}
                </div>
                <div className="text-[11px] text-slate truncate mt-0.5">
                  {item.badge}
                </div>

                {/* Animated Progress Bar at Bottom of Active Stage */}
                <div className="mt-2.5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal to-cyber-blue transition-all duration-100"
                    style={{
                      width: isCurrent ? `${progress}%` : isCompleted ? '100%' : '0%',
                    }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Cinematic Stage: 3 Columns (POS Terminal in Action | Live Network Pipeline | Service Deliverables & Telemetry) */}
        <div className="obsidian-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-teal/35 shadow-2xl relative overflow-hidden">
          {/* Background architectural grid & radial spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-arch-grid opacity-45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-45"
            style={{
              background:
                'radial-gradient(circle, rgba(0,194,168,0.35), rgba(2,86,205,0.25), transparent 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN (Cols 1-4): Interactive Physical Android POS Terminal Simulator in Action */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <TiltCard
                intensity={10}
                className="w-full max-w-[310px] rounded-[2.2rem] bg-gradient-to-b from-[#162C56] via-[#0B1833] to-[#050C1C] p-4 border-2 border-teal/45 shadow-[0_25px_70px_-15px_rgba(0,194,168,0.35)] relative"
              >
                {/* Animated Sliding Thermal Paper Receipt at Top of POS */}
                <div
                  className={`mx-auto w-56 bg-[#F8FAFC] text-[#06122B] rounded-t-xl px-4 py-3 font-mono text-[10px] shadow-md border border-slate-300 transition-all duration-500 overflow-hidden ${
                    showReceipt
                      ? 'max-h-36 opacity-100 mb-3 translate-y-0'
                      : 'max-h-0 opacity-0 mb-0 translate-y-3 py-0 border-0'
                  }`}
                >
                  <div className="flex justify-between font-bold border-b border-dashed border-slate-300 pb-1">
                    <span>GWABS POS RECEIPT</span>
                    <span className="text-emerald-600">APPROVED</span>
                  </div>
                  <div className="mt-1 space-y-0.5 text-[9px] text-slate-600">
                    <div className="flex justify-between">
                      <span>OEM: {currentVendor}</span>
                      <span>STAN: 492810</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAIL: {failoverSimulated ? 'CORALPAY (FO)' : 'NIBSS EPMS'}</span>
                      <span>RESP: 00</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#06122B] pt-0.5">
                      <span>AMOUNT SETTLED:</span>
                      <span>₦250,000.00</span>
                    </div>
                  </div>
                </div>

                {/* POS Top Speaker & NFC Contactless Zone */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 rounded-xl bg-[#040B18]/80 border border-white/10">
                  <span className="text-[10px] font-mono text-teal font-bold">
                    {currentVendor}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#9FB2D0]">NFC</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
                  </div>
                </div>

                {/* POS High-Contrast Illuminated Screen */}
                <div className="rounded-2xl bg-gradient-to-b from-[#061530] to-[#030A18] border border-teal/40 p-4 shadow-inner relative overflow-hidden">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#9FB2D0] pb-2 border-b border-white/10">
                    <span>{scene.posScreen.header}</span>
                    <span className="text-teal">4G ●●●</span>
                  </div>

                  {/* Active Stage Pill on POS Screen */}
                  <div className="mt-2.5 inline-block px-2.5 py-0.5 rounded-full bg-teal/20 border border-teal/40 text-[9px] font-mono font-bold text-teal">
                    {scene.posScreen.stepBadge}
                  </div>

                  {/* Transaction Amount */}
                  <div className="mt-2 text-2xl font-extrabold font-outfit text-white tracking-tight">
                    {scene.posScreen.amount}
                  </div>
                  <div className="text-[10px] font-mono text-teal mt-0.5">
                    {failoverSimulated && activeSceneIndex === 2
                      ? 'FAILOVER → CORALPAY ISO 0210'
                      : scene.posScreen.status}
                  </div>
                  <div className="text-[9px] font-mono text-[#9FB2D0] mt-1">
                    {scene.posScreen.subtext}
                  </div>

                  {/* Animated EMV Card Tap Wave & Encrypted PIN Dots */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-[#9FB2D0]">PIN:</span>
                      {[0, 1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#00C2A8]"
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      CBN GPS OK
                    </span>
                  </div>
                </div>

                {/* POS Physical Illuminated Keypad & Interactive Action Buttons */}
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
                    <div
                      key={key}
                      className="py-1.5 rounded-lg bg-[#091836] border border-white/10 text-center font-mono text-xs font-bold text-[#9FB2D0]"
                    >
                      {key}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => selectScene(0)}
                    className="py-1.5 rounded-lg bg-red-500/20 border border-red-400/40 text-center font-mono text-[10px] font-bold text-red-300 hover:bg-red-500/30"
                  >
                    TAP
                  </button>
                  <div className="py-1.5 rounded-lg bg-[#091836] border border-white/10 text-center font-mono text-xs font-bold text-[#9FB2D0]">
                    0
                  </div>
                  <button
                    type="button"
                    onClick={() => setManualReceipt((r) => !r)}
                    className="py-1.5 rounded-lg bg-teal text-teal-ink text-center font-mono text-[10px] font-extrabold hover:brightness-110"
                  >
                    PRINT
                  </button>
                </div>

                {/* Floating Contactless EMV Card Badge overlapping bottom-right of terminal */}
                <div className="mt-3 rounded-xl bg-gradient-to-r from-[#0256CD] to-[#00C2A8] p-2.5 text-[#03152E] flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-4 rounded bg-amber-300 border border-amber-500 inline-block" />
                    <span className="text-[10px] font-extrabold font-outfit text-white">
                      EMV CHIP &amp; NFC TAP
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white">
                    ))))
                  </span>
                </div>
              </TiltCard>
            </div>

            {/* CENTER & RIGHT COLUMNS (Cols 5-12): Live Architecture Flow + What We Offer Service Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Live Animated Pipeline Header */}
              <div className="rounded-2xl bg-[#040B1A]/90 border border-white/10 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-teal font-bold">
                    LIVE TRANSACTION PIPELINE · STAGE {scene.stepNumber} OF 05
                  </span>
                  <span className="text-[11px] font-mono text-[#9FB2D0]">
                    {failoverSimulated
                      ? '⚡ FAILOVER ROUTE: POS → HAL → CORALPAY → LEDGER'
                      : 'PRIMARY ROUTE: POS → HAL → NIBSS EPMS → LEDGER'}
                  </span>
                </div>

                {/* 5 Connected Pipeline Nodes with Animated Pulse Bar */}
                <div className="grid grid-cols-5 gap-2 items-center">
                  {[
                    { idx: 0, label: 'POS Tap', sub: currentVendor },
                    { idx: 1, label: 'HAL SDK', sub: 'DUKPT Encryption' },
                    {
                      idx: 2,
                      label: 'ISO Switch',
                      sub: failoverSimulated ? 'CoralPay Failover' : 'NIBSS 0200/0210',
                    },
                    { idx: 3, label: 'TMS & Push', sub: '<15ms WSS Alert' },
                    { idx: 4, label: 'T+0 Ledger', sub: 'Virtual Account' },
                  ].map((node) => {
                    const active = node.idx === activeSceneIndex
                    const passed = node.idx < activeSceneIndex
                    return (
                      <button
                        key={node.label}
                        type="button"
                        onClick={() => selectScene(node.idx)}
                        className={`rounded-xl p-2.5 text-left border transition-all ${
                          active
                            ? 'bg-teal/20 border-teal text-white shadow-[0_0_20px_rgba(0,194,168,0.35)]'
                            : passed
                            ? 'bg-[#0B1E40] border-teal/40 text-[#F4F7FB]'
                            : 'bg-white/5 border-white/10 text-[#9FB2D0]'
                        }`}
                      >
                        <div className="text-[11px] font-bold font-outfit truncate">
                          {node.label}
                        </div>
                        <div className="text-[9px] font-mono text-teal truncate">
                          {node.sub}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Active Scene Narrative & Service Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Service Explanation & What We Deliver */}
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

                    {/* What We Offer in This Pillar (Deliverable Chips) */}
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

                  {/* Action Links for this Service */}
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

                {/* Live Engineering Telemetry Box (Crisp White Contrast Card) */}
                <div className="md:col-span-5 flex">
                  <div className="light-showcase-card rounded-2xl p-5 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0256CD]">
                          LIVE SYSTEM TELEMETRY
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          ACTIVE
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
