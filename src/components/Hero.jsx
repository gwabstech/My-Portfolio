import { Link } from 'react-router-dom'
import { company } from '../data/company.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-2 pt-32 pb-24 3xl:pt-40 3xl:pb-32 text-center">
      <div className="container mx-auto px-6">
        <p className="text-xs 3xl:text-sm tracking-[0.2em] font-bold text-teal">FINTECH SOLUTIONS &amp; CONSULTANCY</p>
        <h1 className="mt-4 text-4xl md:text-6xl 3xl:text-7xl font-extrabold text-offwhite font-outfit leading-tight">
          Fintech infrastructure,<br /><span className="text-gradient">engineered to settle.</span>
        </h1>
        <p className="mt-5 max-w-2xl 3xl:max-w-3xl mx-auto text-lg 3xl:text-xl text-slate">{company.whatWeDo}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/solutions" className="btn-gradient font-semibold py-3 px-8 rounded-full">Explore solutions</Link>
          <Link to="/contact" className="border border-surface-border text-slate hover:text-teal font-semibold py-3 px-8 rounded-full transition-colors">Book a consultation</Link>
        </div>
      </div>
    </section>
  )
}
