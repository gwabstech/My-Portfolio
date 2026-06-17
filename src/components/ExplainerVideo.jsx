import { media } from '../data/company.js'

export default function ExplainerVideo() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-offwhite font-outfit">See how GWABS works</h2>
        <p className="mt-3 text-slate">
          A two-minute look at how we engineer payments end to end — from the terminal to the switch.
        </p>
      </div>
      <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-surface-border shadow-2xl">
        <video
          className="w-full h-full block bg-navy-deep"
          controls
          preload="metadata"
          poster="/favicon.svg"
        >
          <source src={media.explainerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-8 text-center">
        <a
          href={media.capabilityStatement}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-surface-border text-slate hover:text-teal font-semibold py-3 px-8 rounded-full transition-colors"
        >
          <span className="text-teal">↓</span> Download capability statement (PDF)
        </a>
      </div>
    </section>
  )
}
