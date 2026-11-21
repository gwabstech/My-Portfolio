import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'

export const VIDEO_STORIES = [
  {
    id: 'market-woman',
    badge: 'REAL-WORLD COMMERCE · NIGERIA',
    title: 'Market Woman Selling & Customer Paying Instantly',
    subtitle: 'Instant EMV Card Tap, <15ms Voice Alert & Thermal Receipt',
    video: '/media/market-woman-pos.mp4',
    audio: '/media/voice-market-pos.mp3',
    poster: '/media/market-woman-pos.jpg',
    caption:
      '“From bustling Nigerian markets to commercial bank branches, GWABS powers real-world payments that settle instantly. A customer taps or inserts their debit card on the market woman’s Android POS terminal, authorizes their PIN, our WebSocket gateway announces the approval in under 15 milliseconds, and the receipt prints on the spot.”',
    topic: 'Android POS App & Market Merchant Collection Network',
    caseStudySlug: 'getpayed-android-pos',
    caseStudyLabel: 'Getpayed Android POS',
    metrics: [
      { value: '< 15ms', label: 'Instant Voice & Screen Alert' },
      { value: '100%', label: 'CBN 50m Geofence Compliant' },
    ],
  },
  {
    id: 'pos-card-receipt',
    badge: 'TERMINAL HARDWARE ENGINEERING',
    title: 'Customer Card Insert, DUKPT PIN & Printed Receipt',
    subtitle: 'EMV L1/L2 Kernel · Hardware PIN Pad · Thermal Printer',
    video: '/media/pos-card-receipt.mp4',
    audio: '/media/voice-pos-flow.mp3',
    poster: '/media/pos-card-receipt.jpg',
    caption:
      '“Watch our terminal engineering in action. Every GWABS POS application enforces CBN 50-meter geofencing, captures hardware-encrypted DUKPT PIN blocks, works reliably across Topwise, Urovo, and Blumen devices, and prints instant thermal receipts.”',
    topic: 'Custom Android POS Terminal Application & EMV Kernel',
    caseStudySlug: 'teasypay-pos-sdk',
    caseStudyLabel: 'TeasyPay POS SDK',
    metrics: [
      { value: '4–6 Wks', label: 'Turnkey POS App Delivery' },
      { value: 'DUKPT', label: 'Hardware 3DES / AES PIN' },
    ],
  },
  {
    id: 'iso-switch',
    badge: 'HIGH-AVAILABILITY ISO 8583 SWITCHING',
    title: 'Multi-Processor BIN Routing & Zero-Downtime Failover',
    subtitle: 'NIBSS · Interswitch · CoralPay · Zone Auto-Failover',
    video: '/media/iso-switch-routing.mp4',
    audio: '/media/voice-iso-switch.mp3',
    poster: '/media/iso-switch-routing.jpg',
    caption:
      '“Behind every card swipe is our high-availability ISO 8583 payment switch. We route transactions dynamically by card BIN across NIBSS, Interswitch, CoralPay, and Zone — automatically failing over in milliseconds so merchants and agents never lose a sale.”',
    topic: 'Multi-Processor ISO 8583 Payment Switch & BIN Failover',
    caseStudySlug: 'bellbank-cashout-middleware',
    caseStudyLabel: 'Bellbank Cashout Middleware',
    metrics: [
      { value: '99.98%', label: 'Target Routing Uptime' },
      { value: '180ms', label: 'Median Switch Turnaround' },
    ],
  },
  {
    id: 'agency-fleet',
    badge: 'AGENCY BANKING, SDKs & FLEET TELEMATICS',
    title: 'GWABS Hub Agency Banking & GPS Fleet Financing',
    subtitle: 'Topwise / Urovo / Blumen HAL · Virtual Accounts · Okada FleetOS',
    video: '/media/agency-fleet-hub.mp4',
    audio: '/media/voice-sdk-saas.mp3',
    poster: '/media/agency-fleet-hub.jpg',
    caption:
      '“With our unified Hardware Abstraction SDK and multi-tenant banking platforms, microfinance banks and fintechs launch full POS-as-a-Service, automated lending, and T+0 virtual account settlement in weeks, not years.”',
    topic: 'Managed POS-as-a-Service, Agency Banking & FleetOS',
    caseStudySlug: 'regent-mfb-merchant-platform',
    caseStudyLabel: 'Regent MFB & Okada FleetOS',
    metrics: [
      { value: '3+ OEMs', label: 'Unified in 1 HAL SDK' },
      { value: 'T+0', label: 'Per-POS Virtual Accounts' },
    ],
  },
]

export default function AutoVideoVoiceShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isNarrating, setIsNarrating] = useState(false)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const sectionRef = useRef(null)

  const current = VIDEO_STORIES[activeIdx]

  // Reload and auto-play the video whenever the active story changes
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    try {
      vid.load()
      const playPromise = vid.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    } catch {
      // ignore in jsdom
    }
  }, [activeIdx])

  // Play synchronized neural voiceover when voiceEnabled is true, or auto-advance every 9.5s when muted
  useEffect(() => {
    const aud = audioRef.current
    if (voiceEnabled && aud) {
      try {
        aud.src = current.audio
        aud.currentTime = 0
        const p = aud.play()
        setIsNarrating(true)
        if (p && typeof p.catch === 'function') {
          p.catch(() => setIsNarrating(false))
        }
      } catch {
        setIsNarrating(false)
      }
      return () => {
        try {
          aud.pause()
        } catch {
          // ignore
        }
      }
    } else {
      setIsNarrating(false)
      const timer = setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % VIDEO_STORIES.length)
      }, 9500)
      return () => clearTimeout(timer)
    }
  }, [activeIdx, voiceEnabled, current.audio])

  const toggleVoice = () => {
    const nextState = !voiceEnabled
    setVoiceEnabled(nextState)
    if (!nextState && audioRef.current) {
      try {
        audioRef.current.pause()
      } catch {
        // ignore
      }
      setIsNarrating(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Real-World POS and Payment Infrastructure Video Stories"
      className="relative py-20 3xl:py-28 overflow-hidden border-b border-surface-border"
    >
      {/* Hidden Audio Element for Neural Voiceover Narration */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => {
          setIsNarrating(false)
          setActiveIdx((prev) => (prev + 1) % VIDEO_STORIES.length)
        }}
      />

      <div className="container mx-auto px-6">
        {/* Top Section Header + Voice Narration Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/15 border border-teal/40 text-xs font-mono uppercase tracking-[0.18em] text-teal mb-3">
              <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
              REAL-WORLD IMPACT &amp; VOICE-NARRATED STORIES
            </span>
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit leading-tight">
              From the Market Stall to the{' '}
              <span className="text-gradient">Core Banking Switch</span>
            </h2>
            <p className="mt-3 text-slate text-sm sm:text-base leading-relaxed">
              See how our POS terminals, ISO 8583 switches, and unified SDKs work in the real world — from a market woman collecting an instant card payment to bank-wide transaction routing.
            </p>
          </div>

          {/* Voiceover Toggle & Story Switcher */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleVoice}
              className={`px-5 py-3 rounded-full font-outfit font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-xl border ${
                voiceEnabled
                  ? 'bg-teal text-teal-ink border-white shadow-[0_0_25px_rgba(0,194,168,0.6)]'
                  : 'obsidian-panel text-white border-teal/50 hover:border-teal'
              }`}
            >
              {/* Animated Audio Waveform Bars */}
              <span className="flex items-end gap-0.5 h-3.5">
                {[0, 1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={`w-1 rounded-full transition-all ${
                      voiceEnabled ? 'bg-teal-ink animate-pulse' : 'bg-teal'
                    }`}
                    style={{
                      height: voiceEnabled ? `${8 + ((bar * 5) % 8)}px` : '6px',
                    }}
                  />
                ))}
              </span>
              <span>
                {voiceEnabled
                  ? '🔊 AI Voice Narration: ON (Click to Mute)'
                  : '🔈 Enable AI Voice Narration'}
              </span>
            </button>
          </div>
        </div>

        {/* 4 Story Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {VIDEO_STORIES.map((story, idx) => {
            const isSelected = idx === activeIdx
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`text-left rounded-2xl p-3.5 border transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'obsidian-panel border-teal shadow-[0_0_25px_-5px_rgba(0,194,168,0.45)]'
                    : 'glass-card border-surface-border hover:border-teal/40 opacity-85 hover:opacity-100'
                }`}
              >
                <img
                  src={story.poster}
                  alt={story.title}
                  className="w-14 h-10 rounded-xl object-cover border border-teal/40 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono text-teal font-bold truncate">
                    0{idx + 1} · {idx === 0 ? 'MARKET POS' : idx === 1 ? 'EMV & RECEIPT' : idx === 2 ? 'ISO SWITCH' : 'AGENCY & FLEET'}
                  </div>
                  <div className="text-xs font-extrabold font-outfit text-offwhite truncate">
                    {story.title}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Cinema Stage: Auto-Running Video Player (Left 7 Cols) + Synchronized Voice Transcript & Conversion Card (Right 5 Cols) */}
        <div className="obsidian-panel rounded-3xl p-5 sm:p-8 border border-teal/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Auto-Playing Video Frame */}
            <div className="lg:col-span-7">
              <TiltCard
                intensity={5}
                className="rounded-2xl overflow-hidden border-2 border-teal/45 shadow-[0_20px_60px_rgba(0,0,0,0.65)] bg-[#030816] relative"
              >
                <video
                  ref={videoRef}
                  key={current.video}
                  src={current.video}
                  poster={current.poster}
                  autoPlay
                  loop={!voiceEnabled}
                  muted
                  playsInline
                  className="w-full aspect-video object-cover block"
                />

                {/* Bottom Overlay Bar with Voice Status & Quick Unmute */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold backdrop-blur-md border transition-all ${
                      voiceEnabled
                        ? 'bg-teal text-teal-ink border-white shadow-lg'
                        : 'bg-[#040A18]/85 text-white border-teal/50 hover:bg-teal hover:text-teal-ink'
                    }`}
                  >
                    {voiceEnabled && isNarrating
                      ? '🔊 Voice Playing...'
                      : '🔈 Tap for Voiceover'}
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* Right 5 Columns: Story Narrative, Synchronized Voiceover Transcript & Conversion Links */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/15 border border-teal/35 text-[11px] font-mono font-bold text-teal">
                <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                <span>{current.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FB] font-outfit leading-snug">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono text-teal">
                {current.subtitle}
              </p>

              {/* Voiceover Transcript Box */}
              <div className="rounded-2xl bg-white/5 border border-white/15 p-4 relative">
                <div className="flex items-center justify-between text-[10px] font-mono text-teal mb-1.5">
                  <span>
                    {voiceEnabled ? '🔊 LIVE VOICEOVER TRANSCRIPT' : 'VOICEOVER NARRATION'}
                  </span>
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className="underline hover:text-white"
                  >
                    {voiceEnabled ? 'Mute voice' : 'Listen now ▶'}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#D6E2F5] italic leading-relaxed">
                  {current.caption}
                </p>
              </div>

              {/* Key Metrics Pair */}
              <div className="grid grid-cols-2 gap-3">
                {current.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-[#071633] border border-teal/30 p-3.5"
                  >
                    <div className="text-xl sm:text-2xl font-extrabold font-outfit text-teal">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-[#9FB2D0] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Conversion CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/contact?topic=${encodeURIComponent(current.topic)}`}
                  className="btn-gradient font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Deploy This Solution</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to={`/case-studies/${current.caseStudySlug}`}
                  className="px-5 py-3 rounded-full bg-white/5 border border-white/15 hover:border-teal text-xs sm:text-sm font-semibold text-[#F4F7FB] hover:text-teal transition-colors"
                >
                  Case Study: {current.caseStudyLabel} ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
