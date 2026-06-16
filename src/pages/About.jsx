import { useDocumentTitle } from '../lib/seo.js'
import ReviewList from '../components/ReviewList.jsx'
import ReviewForm from '../components/ReviewForm.jsx'
import CTASection from '../components/CTASection.jsx'
import { company } from '../data/company.js'

export default function About() {
  useDocumentTitle('About')
  return (
    <main className="pt-28">
      <section className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-offwhite font-outfit">About GWABS</h1>
        <p className="mt-4 text-slate leading-relaxed">
          {company.legalName} (RC {company.rc}) is a Nigerian fintech engineering company, formerly {company.formerName}, incorporated on {company.incorporated} under CAMA 2020. We design and build secure, compliant payment systems: POS terminal applications, payment switching and middleware, device & hardware SDKs, and fintech software — for banks, microfinance banks, processors, and merchants.
        </p>
        <p className="mt-4 text-slate leading-relaxed">
          Our work spans the full payments stack, from EMV card acceptance on terminal hardware to ISO 8583 switching, terminal management, and SaaS business platforms. We hold PCI DSS-aligned expertise and design for CBN compliance.
        </p>
      </section>

      <section className="container mx-auto px-6 max-w-3xl mt-12">
        <h2 className="text-2xl font-extrabold text-offwhite font-outfit">Leadership</h2>
        <div className="glass-card rounded-2xl p-6 mt-4">
          <h3 className="text-lg font-bold text-offwhite">Abubakar Abdullahi Gwabare — Founder</h3>
          <p className="text-teal text-sm mt-1">Fintech Architect · POS & Payment Systems</p>
          <p className="mt-3 text-slate leading-relaxed">
            Fintech-focused engineer specialising in Kotlin, Android, and payment infrastructure, with hands-on delivery of POS and switching systems across NIBSS, Interswitch, and multiple processors. PCI DSS certified, with a track record building core-banking, POS, and SDK products.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-16">
        <h2 className="text-2xl font-extrabold text-offwhite font-outfit text-center">What clients say</h2>
        <div className="mt-8"><ReviewList /></div>
        <div className="mt-10"><ReviewForm /></div>
      </section>

      <div className="mt-16"><CTASection /></div>
    </main>
  )
}
