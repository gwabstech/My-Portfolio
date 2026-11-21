import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/company.js'

const DISCUSSION_TOPICS = [
  {
    label: 'Launch Android POS App / Terminal Fleet',
    topic: 'Android POS App & Terminal Fleet Deployment',
    tag: '4–6 wks',
  },
  {
    label: 'Deploy Multi-Processor ISO 8583 Switch',
    topic: 'High-Availability ISO 8583 Switch & BIN Failover',
    tag: '99.98% SLA',
  },
  {
    label: 'License Unified POS SDK (Topwise / Urovo / Blumen)',
    topic: 'Unified Hardware HAL SDK Licensing',
    tag: 'v1.4.2 Ready',
  },
  {
    label: 'MFB POS-as-a-Service / Custom Banking SaaS',
    topic: 'Managed POS-as-a-Service & Multi-Tenant Banking Platform',
    tag: 'Turnkey',
  },
]

export default function QuickConnectLauncher() {
  const [open, setOpen] = useState(false)
  const cleanPhone = company.phone.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello GWABS Engineering Team, I visited gwabs.com.ng and would like to discuss a payment infrastructure / POS project.'
  )}`

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[340px] sm:w-[375px] obsidian-panel rounded-3xl p-5 border border-teal/50 shadow-[0_25px_70px_rgba(0,0,0,0.75)] animate-fade-in">
          <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/favicon.svg"
                  alt="GWABS Architect"
                  className="w-10 h-10 rounded-xl ring-2 ring-teal/50"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#040A18]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white font-outfit">
                  Talk to a Payment Architect
                </h4>
                <p className="text-[11px] text-teal font-mono">
                  Direct Engineering Response · &lt; 2 hrs
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close discussion launcher"
              className="text-[#9FB2D0] hover:text-white text-sm px-2 py-0.5"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-[#9FB2D0] leading-relaxed">
            Pick what you&apos;re building to pre-fill a technical brief, or message our engineering lead directly:
          </p>

          <div className="mt-3 space-y-2">
            {DISCUSSION_TOPICS.map((item) => (
              <Link
                key={item.topic}
                to={`/contact?topic=${encodeURIComponent(item.topic)}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-teal/20 border border-white/10 hover:border-teal text-xs font-semibold text-white transition-all group"
              >
                <span className="group-hover:text-teal transition-colors truncate">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal/15 text-teal shrink-0">
                  {item.tag} →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#032018] font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-lg transition-colors"
            >
              <span>WhatsApp Chat</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Call Direct</span>
              <span aria-hidden="true">☎</span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Initiate project discussion"
        className="btn-gradient font-outfit font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-full shadow-[0_12px_35px_rgba(0,194,168,0.55)] flex items-center gap-2.5 border border-white/30"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#031B17] animate-ping" />
        <span>{open ? 'Close Chat' : 'Initiate Discussion'}</span>
        <span aria-hidden="true" className="text-sm">
          {open ? '✕' : '→'}
        </span>
      </button>
    </div>
  )
}
