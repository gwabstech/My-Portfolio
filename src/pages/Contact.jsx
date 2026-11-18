import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import ContactForm from '../components/ContactForm.jsx'
import ParticleGridBackground from '../components/ParticleGridBackground.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { company, media } from '../data/company.js'
import { solutions } from '../data/solutions.js'

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <main className="pt-28 pb-20 relative overflow-hidden">
      <ParticleGridBackground />

      <section className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 3xl:gap-16 items-start">
          {/* Left Column: Direct Channels, SLA & Pillar Links */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-teal/35 text-xs font-mono text-teal mb-4">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                DIRECT ENGINEERING CONSULTATION
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-offwhite font-outfit">
                Get in touch
              </h1>
              <p className="mt-3 text-slate text-sm sm:text-base leading-relaxed">
                Tell us about your payments project — POS terminal apps, ISO 8583 switching, hardware SDKs, or multi-tenant SaaS. We respond within one business day.
              </p>
            </div>

            {/* Crisp Light Showcase Card for Contact Facts (Dribbble Dark/Light Contrast) */}
            <TiltCard
              intensity={6}
              className="light-showcase-card rounded-3xl p-6 sm:p-7"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#0256CD] font-bold block mb-4">
                CORPORATE &amp; DIRECT CHANNELS
              </span>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[#06122B] font-bold">Email</dt>
                  <dd>
                    <a
                      className="text-[#0256CD] hover:underline font-medium"
                      href={`mailto:${company.email}`}
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[#06122B] font-bold">Phone</dt>
                  <dd>
                    <a
                      className="text-[#0256CD] hover:underline font-medium"
                      href={`tel:${company.phone.replace(/\s/g, '')}`}
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[#06122B] font-bold">Address</dt>
                  <dd className="text-slate-600">{company.address}</dd>
                </div>
                <div>
                  <dt className="text-[#06122B] font-bold">Registration</dt>
                  <dd className="font-mono text-xs text-slate-600">
                    RC {company.rc} · TIN {company.tin}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need our corporate profile?</span>
                <a
                  href={media.capabilityStatement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#06122B] hover:text-[#0256CD]"
                >
                  Capability PDF ↗
                </a>
              </div>
            </TiltCard>

            {/* Architecture Scope Quick Links */}
            <div className="obsidian-panel rounded-3xl p-6 border border-surface-border">
              <span className="text-xs font-mono uppercase tracking-wider text-teal block mb-3">
                REVIEW SPECIFICATIONS BEFORE REACHING OUT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {solutions.map((s) => (
                  <Link
                    key={`contact-${s.id}`}
                    to={`/solutions#${s.id}`}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F4F7FB] hover:text-teal transition-colors flex items-center gap-2"
                  >
                    <span className="text-teal">{s.icon}</span>
                    <span className="truncate">{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
