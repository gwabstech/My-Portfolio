import { Link } from 'react-router-dom'
import { company, media } from '../data/company.js'

const QUICK_LAUNCHERS = [
  {
    title: 'Android POS App & Fleet',
    sub: 'EMV, NFC, PIN & Thermal Print',
    topic: 'Android POS Terminal App & Fleet Deployment',
  },
  {
    title: 'ISO 8583 Payment Switch',
    sub: 'Multi-Processor BIN Failover',
    topic: 'Multi-Processor ISO 8583 Switch & Failover',
  },
  {
    title: 'Unified Hardware HAL SDK',
    sub: 'Topwise, Urovo & Blumen in 1 API',
    topic: 'Unified POS Hardware HAL SDK Licensing',
  },
  {
    title: 'MFB POS-as-a-Service',
    sub: 'Turnkey TMS, DVA & Agency Banking',
    topic: 'Managed POS-as-a-Service & Banking Platform',
  },
]

export default function CTASection() {
  const cleanPhone = company.phone.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello GWABS Engineering Team, I would like to schedule a technical consultation regarding our payments project.'
  )}`

  return (
    <section className="relative py-20 3xl:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="obsidian-panel rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border border-teal/40 shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-arch-grid opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-72 rounded-full blur-3xl opacity-55"
            style={{
              background:
                'radial-gradient(circle, rgba(54,224,200,0.48), rgba(2,86,205,0.34), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/15 border border-teal/40 text-xs font-mono uppercase tracking-[0.18em] text-teal mb-4">
              <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
              DIRECT ENGINEERING ENGAGEMENT
            </span>

            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-[#F4F7FB] font-outfit leading-tight">
              Have a payments problem to solve?
            </h2>

            <p className="mt-3 text-[#9FB2D0] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Skip the sales middleman. Speak directly with the payment architects who built live ISO 8583 switches, multi-vendor POS SDKs, and banking platforms across Nigeria. Select your project scope below to initiate a discussion:
            </p>

            {/* 4 One-Click Project Discussion Starters */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {QUICK_LAUNCHERS.map((item) => (
                <Link
                  key={item.title}
                  to={`/contact?topic=${encodeURIComponent(item.topic)}`}
                  className="rounded-2xl p-4 bg-white/5 hover:bg-teal/20 border border-white/15 hover:border-teal transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-white font-outfit group-hover:text-teal transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#9FB2D0] mt-1">
                      {item.sub}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] font-mono font-bold text-teal flex items-center justify-between">
                    <span>Initiate Brief</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn-gradient font-extrabold py-3.5 px-8 rounded-full text-sm sm:text-base inline-flex items-center gap-2 shadow-xl"
              >
                <span>Book a consultation</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#032018] font-extrabold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg transition-colors"
              >
                <span>Chat on WhatsApp Now</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={media.capabilityStatement}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-white/20 text-[#F4F7FB] hover:border-teal hover:text-teal text-sm sm:text-base font-semibold transition-colors"
              >
                Capability Statement (PDF) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
