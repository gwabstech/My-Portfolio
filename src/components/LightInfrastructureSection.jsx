import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { company, media, trustBadges } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

export default function LightInfrastructureSection() {
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  const toggleSound = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
      if (!nextMuted) {
        try {
          videoRef.current.currentTime = 0
          videoRef.current.play()
        } catch {
          // ignore
        }
      }
    }
  }

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
              {/* Top Partner Badges */}
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
                , now incorporated as {company.legalName} (RC {company.rc}). From a market woman accepting an instant EMV card payment in Abuja to high-availability ISO 8583 switching for microfinance banks, our systems are built for zero-downtime settlement.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-5">
                <Link
                  to="/contact?topic=Enterprise%20POS%20%26%20Payment%20Infrastructure"
                  className="btn-alula-cta font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>Initiate Partnership</span>
                  <span aria-hidden="true">→</span>
                </Link>
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
                  <span>Capability PDF</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Right Auto-Running Video & Giant Metrics Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Auto-Running Video Showcase inside White Card */}
              <div className="rounded-2xl overflow-hidden bg-[#06122B] border-2 border-slate-200 shadow-xl relative group">
                <video
                  ref={videoRef}
                  src="/media/market-woman-pos.mp4"
                  poster="/media/market-woman-pos.jpg"
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className="w-full aspect-video object-cover block"
                />
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`absolute bottom-3 right-3 z-20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md border transition-all ${
                    !muted
                      ? 'bg-teal text-teal-ink border-white shadow-lg'
                      : 'bg-[#06122B]/85 text-white border-teal/50 hover:bg-teal hover:text-teal-ink'
                  }`}
                >
                  {!muted ? '🔊 Voiceover On' : '🔈 Unmute Voice'}
                </button>
              </div>

              {/* Giant Metrics Row (Matches "$300M+ TVL / 5.4% APY" in Shot 1) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2 px-2">
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#06122B]">
                    14+
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
                    4+ HALs
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500 block mt-0.5">
                    POS &amp; SoftPOS SDKs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Bottom "Partners & Ecosystem" Section on Light Background */}
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
