import { Link } from 'react-router-dom'
import { media } from '../data/company.js'

export default function CTASection() {
  return (
    <section className="relative py-20 3xl:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="obsidian-panel rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border border-teal/35">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-arch-grid opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-64 rounded-full blur-3xl opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(54,224,200,0.45), rgba(2,86,205,0.3), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-teal mb-3">
              READY TO SHIP?
            </span>
            <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-[#F4F7FB] font-outfit">
              Have a payments problem to solve?
            </h2>
            <p className="mt-3 text-[#9FB2D0] text-sm sm:text-base">
              Let&apos;s talk about POS terminal apps, ISO 8583 switching, hardware SDKs, or multi-tenant fintech software. We respond within one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn-gradient font-semibold py-3.5 px-8 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
              >
                <span>Book a consultation</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={media.capabilityStatement}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full border border-white/20 text-[#F4F7FB] hover:border-teal hover:text-teal text-sm sm:text-base font-semibold transition-colors"
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
