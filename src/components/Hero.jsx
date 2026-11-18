import { Link } from 'react-router-dom'
import { company, media } from '../data/company.js'
import TiltCard from './TiltCard.jsx'
import ParticleGridBackground from './ParticleGridBackground.jsx'

const FLOATING_NODES = [
  {
    id: 'pos-apps',
    label: 'POS Terminal Apps',
    sub: 'EMV · NFC · PIN',
    to: '/solutions#pos-apps',
    posClass: 'top-4 left-2 sm:left-4',
    delay: '0s',
  },
  {
    id: 'switching',
    label: 'ISO 8583 Switching',
    sub: 'BIN Failover Router',
    to: '/solutions#switching',
    posClass: 'top-6 right-2 sm:right-4',
    delay: '1.2s',
  },
  {
    id: 'sdks',
    label: 'Unified Device SDKs',
    sub: 'Topwise · Urovo · Blumen',
    to: '/solutions#sdks',
    posClass: 'bottom-8 left-2 sm:left-4',
    delay: '2.1s',
  },
  {
    id: 'software',
    label: 'Multi-Tenant SaaS',
    sub: 'TMS · LMS · FleetOS',
    to: '/solutions#software',
    posClass: 'bottom-6 right-2 sm:right-4',
    delay: '0.8s',
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 3xl:pt-44 3xl:pb-32">
      <ParticleGridBackground />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Dribbble Alula-inspired Typography & Pill CTAs */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/90 border border-teal/30 shadow-lg mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
              <p className="text-[11px] sm:text-xs 3xl:text-sm tracking-[0.18em] font-bold text-teal uppercase">
                FINTECH SOLUTIONS &amp; CONSULTANCY
              </p>
              <span className="hidden sm:inline-block text-slate/40">|</span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate">
                ISO 8583 · EMV · NIBSS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl 3xl:text-7xl font-extrabold text-offwhite font-outfit leading-[1.08] tracking-tight">
              Fintech infrastructure,
              <br />
              <span className="text-gradient">engineered to settle.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg 3xl:text-xl text-slate leading-relaxed">
              {company.whatWeDo} Configurable payment switching, multi-vendor Android POS HALs, and compliant banking platforms built for high-throughput settlement.
            </p>

            {/* Dual Dribbble Pill CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/solutions"
                className="btn-gradient font-semibold py-3.5 px-8 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span>Explore solutions</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/contact"
                className="glass-card border border-surface-border hover:border-teal/50 text-offwhite hover:text-teal font-semibold py-3.5 px-7 rounded-full text-sm sm:text-base transition-all inline-flex items-center gap-2"
              >
                <span>Book a consultation</span>
                <span aria-hidden="true" className="text-xs">↗</span>
              </Link>
              <a
                href={media.capabilityStatement}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-slate hover:text-teal transition-colors px-3 py-2 inline-flex items-center gap-1.5"
              >
                <span>Read Capability PDF</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Live Engineering Telemetry Micro-Strip */}
            <div className="mt-10 pt-8 border-t border-surface-border/70 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-outfit text-offwhite flex items-center gap-1.5">
                  <span>99.98%</span>
                  <span className="w-2 h-2 rounded-full bg-teal" />
                </div>
                <p className="text-xs text-slate mt-0.5">Multi-rail BIN failover</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-outfit text-teal">
                  11+ Live
                </div>
                <p className="text-xs text-slate mt-0.5">Production systems</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold font-outfit text-offwhite">
                  PCI DSS
                </div>
                <p className="text-xs text-slate mt-0.5">Certified architecture</p>
              </div>
            </div>
          </div>

          {/* Right Column: Combined Dribbble 3D Shield on Perspective Grid + Hexagonal Nodes */}
          <div className="lg:col-span-5">
            <TiltCard
              intensity={12}
              glareColor="rgba(54, 224, 200, 0.22)"
              className="obsidian-panel rounded-3xl p-6 sm:p-8 min-h-[420px] sm:min-h-[460px] flex items-center justify-center relative group"
            >
              {/* Perspective Floor Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-56 bg-perspective-grid opacity-55 pointer-events-none"
              />

              {/* Radial Cyan/Blue Glow behind Shield */}
              <div
                aria-hidden="true"
                className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse-glow pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(54,224,200,0.34) 0%, rgba(2,86,205,0.28) 55%, transparent 75%)',
                }}
              />

              {/* SVG Circuit Connectors + 3D Faceted Shield */}
              <svg
                viewBox="0 0 420 420"
                className="w-full max-w-[360px] h-auto relative z-10 select-none"
                role="img"
                aria-label="GWABS 3D Security Shield and Payment Infrastructure Network"
              >
                <defs>
                  <linearGradient id="shield-face-left" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1E3A6D" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#0D2247" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#050E21" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="shield-face-right" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#36E0C8" stopOpacity="0.35" />
                    <stop offset="45%" stopColor="#0A1E40" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#030917" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="shield-rim" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#36E0C8" />
                    <stop offset="75%" stopColor="#0256CD" />
                    <stop offset="100%" stopColor="#36E0C8" />
                  </linearGradient>
                  <filter id="shield-glow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Perspective Crosshairs */}
                <line x1="210" y1="20" x2="210" y2="400" stroke="#1E3A6D" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="20" y1="210" x2="400" y2="210" stroke="#1E3A6D" strokeWidth="1" strokeDasharray="4 6" />

                {/* Rotating Orbital Security Rings */}
                <circle
                  cx="210"
                  cy="210"
                  r="142"
                  fill="none"
                  stroke="url(#shield-rim)"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                  strokeDasharray="12 10"
                />
                <circle
                  cx="210"
                  cy="210"
                  r="112"
                  fill="none"
                  stroke="#36E0C8"
                  strokeWidth="1.2"
                  strokeOpacity="0.25"
                />

                {/* Orthogonal Circuit Traces to the 4 Corner Nodes */}
                <g stroke="#1E3A6D" strokeWidth="1.8" fill="none">
                  <path d="M145 150 L95 110 H52" />
                  <path d="M275 150 L325 110 H368" />
                  <path d="M150 265 L95 310 H52" />
                  <path d="M270 265 L325 310 H368" />
                </g>
                <g stroke="#36E0C8" strokeWidth="2.2" fill="none" className="animate-circuit">
                  <path d="M145 150 L95 110 H52" />
                  <path d="M275 150 L325 110 H368" />
                  <path d="M150 265 L95 310 H52" />
                  <path d="M270 265 L325 310 H368" />
                </g>

                {/* Outer Glowing Shield Silhouette (Dribbble Shot 1) */}
                <path
                  d="M210 78 L306 116 V208 C306 278 264 328 210 352 C156 328 114 278 114 208 V116 Z"
                  fill="url(#shield-face-left)"
                  stroke="url(#shield-rim)"
                  strokeWidth="3.5"
                  filter="url(#shield-glow)"
                />

                {/* Right Facet for 3D Metallic Depth */}
                <path
                  d="M210 78 L306 116 V208 C306 278 264 328 210 352 V78 Z"
                  fill="url(#shield-face-right)"
                />

                {/* Inner Beveled Shield Frame */}
                <path
                  d="M210 98 L286 129 V205 C286 262 252 304 210 326 C168 304 134 262 134 205 V129 Z"
                  fill="none"
                  stroke="#36E0C8"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                />

                {/* Central EMV Chip & ISO 8583 Core Emblem inside Shield */}
                <rect
                  x="184"
                  y="182"
                  width="52"
                  height="52"
                  rx="12"
                  fill="#06152D"
                  stroke="#36E0C8"
                  strokeWidth="2"
                />
                <path
                  d="M198 202 H222 M198 214 H222 M210 194 V222"
                  stroke="#36E0C8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="210" cy="136" r="4" fill="#FFFFFF" />
                <circle cx="210" cy="296" r="3.5" fill="#36E0C8" />
              </svg>

              {/* 4 Floating Clickable Hexagonal Pillar Nodes (Dribbble Shot 2) */}
              {FLOATING_NODES.map((node) => (
                <Link
                  key={node.id}
                  to={node.to}
                  style={{ animationDelay: node.delay }}
                  className={`absolute ${node.posClass} z-20 animate-float-slow flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#07142C]/90 border border-teal/35 hover:border-teal shadow-lg backdrop-blur-md transition-all hover:scale-105`}
                >
                  <span className="w-7 h-7 rounded-lg bg-teal/15 border border-teal/40 flex items-center justify-center text-teal text-xs font-bold shrink-0">
                    ⬡
                  </span>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-[#F4F7FB] leading-tight">
                      {node.label}
                    </p>
                    <p className="text-[10px] font-mono text-teal/90 leading-tight">
                      {node.sub}
                    </p>
                  </div>
                </Link>
              ))}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
