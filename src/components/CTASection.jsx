import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-b from-navy-2 to-navy text-center">
      <div className="container mx-auto px-6 py-16 3xl:py-24">
        <h2 className="text-2xl md:text-3xl 3xl:text-4xl font-extrabold text-offwhite font-outfit">Have a payments problem to solve?</h2>
        <p className="mt-3 text-slate">Let's talk about POS, switching, SDKs, or fintech software.</p>
        <Link to="/contact" className="inline-block mt-6 btn-gradient font-semibold py-3 px-8 rounded-full">Book a consultation</Link>
      </div>
    </section>
  )
}
