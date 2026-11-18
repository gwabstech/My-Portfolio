import { Link } from 'react-router-dom'
import { company, navLinks, media } from '../data/company.js'
import { solutions } from '../data/solutions.js'
import { caseStudies } from '../data/caseStudies.js'

export default function Footer() {
  const flagshipStudies = caseStudies.slice(0, 5)

  return (
    <footer className="relative bg-navy-deep border-t border-surface-border text-slate text-sm overflow-hidden">
      {/* Subtle top glow line */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-teal/50 to-transparent"
      />

      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1-2: Brand & Corporate Registration */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-2xl font-extrabold text-offwhite font-outfit"
          >
            <img src="/favicon.svg" alt="GWABS logo" className="h-9 w-9 rounded-xl ring-1 ring-teal/30" />
            <span>GWABS</span>
            <span className="text-teal -ml-2">.</span>
          </Link>
          <p className="mt-3 text-offwhite/90 font-medium max-w-sm">
            {company.tagline}
          </p>
          <p className="mt-2 text-xs text-slate leading-relaxed max-w-sm">
            {company.whatWeDo}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface border border-surface-border text-teal">
              RC {company.rc} · TIN {company.tin}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface border border-surface-border text-slate">
              PCI DSS Aligned
            </span>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate/90">
            {company.address}
          </p>
          <p className="mt-1.5 text-xs text-slate/75">
            Formerly {company.formerName} · Incorporated {company.incorporated}.
          </p>
        </div>

        {/* Col 3: Solutions Deep Links */}
        <div>
          <h4 className="text-offwhite font-semibold font-outfit tracking-wide mb-4">
            Solutions Stack
          </h4>
          <ul className="space-y-2.5">
            {solutions.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/solutions#${s.id}`}
                  className="hover:text-teal transition-colors flex items-center gap-2 text-xs sm:text-sm"
                >
                  <span className="text-teal text-xs">{s.icon}</span>
                  <span>{s.title}</span>
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <a
                href={media.capabilityStatement}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline text-xs font-semibold inline-flex items-center gap-1"
              >
                Capability Statement (PDF) ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Flagship Systems & Case Studies */}
        <div>
          <h4 className="text-offwhite font-semibold font-outfit tracking-wide mb-4">
            Shipped Systems
          </h4>
          <ul className="space-y-2.5">
            {flagshipStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/case-studies/${c.slug}`}
                  className="hover:text-teal transition-colors text-xs sm:text-sm block truncate"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/case-studies"
                className="text-teal hover:underline text-xs font-semibold"
              >
                All {caseStudies.length} case studies →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Navigation & Direct Contact */}
        <div>
          <h4 className="text-offwhite font-semibold font-outfit tracking-wide mb-4">
            Company & Contact
          </h4>
          <ul className="space-y-2 mb-5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-teal transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-surface-border space-y-1.5 text-xs">
            <p>
              <a href={`mailto:${company.email}`} className="text-offwhite hover:text-teal font-medium">
                {company.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="text-slate hover:text-teal"
              >
                {company.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-border/80 bg-obsidian/50 py-5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate/80">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p className="font-mono text-[11px] text-slate/70">
            POS Terminals · ISO 8583 Switching · Hardware SDKs · Multi-Tenant SaaS
          </p>
        </div>
      </div>
    </footer>
  )
}
