import { media } from '../data/company.js'

export default function ExplainerVideo({ variant = 'dark' }) {
  const isLight = variant === 'light'
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
          ARCHITECTURE WALKTHROUGH
        </span>
        <h2
          className={`mt-2 text-3xl 3xl:text-4xl font-extrabold font-outfit ${
            isLight ? 'text-[#06122B]' : 'text-offwhite'
          }`}
        >
          See how GWABS works
        </h2>
        <p className={`mt-3 ${isLight ? 'text-slate-600' : 'text-slate'}`}>
          A two-minute look at how we engineer payments end to end — from the terminal to the switch.
        </p>
      </div>
      <div className="mt-10 max-w-4xl 3xl:max-w-5xl mx-auto rounded-3xl overflow-hidden border border-teal/35 shadow-2xl bg-[#040A18] p-2">
        <div className="rounded-2xl overflow-hidden">
          <video
            className="w-full h-full block bg-[#040A18]"
            controls
            preload="metadata"
            poster="/favicon.svg"
          >
            <source src={media.explainerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a
          href={media.capabilityStatement}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 border font-semibold py-3 px-8 rounded-full transition-colors ${
            isLight
              ? 'border-slate-300 bg-white text-[#06122B] hover:border-teal shadow-sm'
              : 'border-surface-border text-slate hover:text-teal'
          }`}
        >
          <span className="text-teal">↓</span> Download capability statement (PDF)
        </a>
      </div>
    </section>
  )
}
