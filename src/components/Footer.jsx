import { Link } from 'react-router-dom'
import { company, navLinks } from '../data/company.js'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-slate text-sm">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-extrabold text-offwhite font-outfit">GWABS<span className="text-teal">.</span></div>
          <p className="mt-3 leading-relaxed">{company.address}</p>
          <p className="mt-2">RC {company.rc} · TIN {company.tin}</p>
          <p className="mt-2 text-xs">Formerly {company.formerName}.</p>
        </div>
        <div>
          <h4 className="text-offwhite font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            {navLinks.map(l => (
              <li key={l.to}><Link to={l.to} className="hover:text-teal">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-offwhite font-semibold mb-3">Contact</h4>
          <p><a href={`mailto:${company.email}`} className="hover:text-teal">{company.email}</a></p>
          <p className="mt-2"><a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-teal">{company.phone}</a></p>
        </div>
      </div>
      <div className="border-t border-surface-border py-5 text-center text-xs">
        © {new Date().getFullYear()} {company.legalName}. All rights reserved.
      </div>
    </footer>
  )
}
