import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import { getCaseStudy } from '../data/caseStudies.js'
import CaseStudyCover from '../components/CaseStudyCover.jsx'
import LivePreview from '../components/LivePreview.jsx'

function Section({ label, children }) {
  return (
    <div className="mt-8">
      <h2 className="text-xs tracking-[0.2em] font-bold text-teal uppercase">{label}</h2>
      <p className="mt-2 text-slate leading-relaxed">{children}</p>
    </div>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)
  useDocumentTitle(study ? study.title : 'Case study not found')

  if (!study) {
    return (
      <main className="pt-32 pb-24 container mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold text-offwhite">Case study not found</h1>
        <Link to="/case-studies" className="text-teal mt-4 inline-block">← Back to case studies</Link>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link to="/case-studies" className="text-slate hover:text-teal text-sm">← Case studies</Link>
        <p className="mt-4 text-xs flex items-center gap-2 flex-wrap">
          {study.clientUrl ? (
            <a href={study.clientUrl} target="_blank" rel="noopener noreferrer"
              className={`hover:underline ${study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'}`}>
              {study.client} ↗
            </a>
          ) : (
            <span className={study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'}>{study.client}</span>
          )}
          {study.status && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate border border-surface-border rounded-full px-2 py-0.5">
              {study.status}
            </span>
          )}
        </p>
        <h1 className="mt-1 text-4xl font-extrabold text-offwhite font-outfit">{study.title}</h1>
        <p className="mt-3 text-lg text-slate">{study.hook}</p>

        {study.liveUrl && (
          <a href={study.liveUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 btn-gradient font-semibold py-2.5 px-6 rounded-full">
            Visit live site <span aria-hidden="true">↗</span>
          </a>
        )}

        {study.media?.type === 'youtube' ? (
          <div className="mt-8 aspect-video rounded-2xl overflow-hidden">
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${study.media.id}`}
              title={study.title} allowFullScreen style={{ border: 0 }} />
          </div>
        ) : study.liveUrl ? (
          <LivePreview url={study.liveUrl} pillarId={study.pillarId} title={study.title} />
        ) : (
          <div className="mt-8 aspect-video rounded-2xl overflow-hidden border border-surface-border">
            <CaseStudyCover pillarId={study.pillarId} className="w-full h-full" />
          </div>
        )}

        <Section label="The Problem">{study.problem}</Section>
        <Section label="Our Solution">{study.solution}</Section>
        <Section label="Impact">{study.impact}</Section>

        <div className="mt-8">
          <h2 className="text-xs tracking-[0.2em] font-bold text-teal uppercase">Tech</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {study.tech.map(t => (
              <span key={t} className="text-xs py-1 px-3 rounded-full bg-surface border border-surface-border text-slate">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <p className="text-offwhite font-semibold">Want something similar built or integrated?</p>
          <Link to="/contact" className="inline-block mt-4 btn-gradient font-semibold py-2.5 px-6 rounded-full">Book a consultation</Link>
        </div>
      </div>
    </main>
  )
}
