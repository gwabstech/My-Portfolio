import { useDocumentTitle } from '../lib/seo.js'
import ContactForm from '../components/ContactForm.jsx'
import { company } from '../data/company.js'

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <main className="pt-28 pb-20">
      <section className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-extrabold text-offwhite font-outfit">Get in touch</h1>
          <p className="mt-3 text-slate">Tell us about your payments project. We respond within one business day.</p>
          <dl className="mt-8 space-y-4 text-slate">
            <div>
              <dt className="text-offwhite font-semibold">Email</dt>
              <dd><a className="hover:text-teal" href={`mailto:${company.email}`}>{company.email}</a></dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Phone</dt>
              <dd><a className="hover:text-teal" href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Address</dt>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt className="text-offwhite font-semibold">Registration</dt>
              <dd>RC {company.rc} · TIN {company.tin}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}
