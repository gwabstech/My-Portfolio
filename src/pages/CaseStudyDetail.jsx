import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/seo.js'
import { caseStudies, getCaseStudy } from '../data/caseStudies.js'
import { solutions } from '../data/solutions.js'
import LivePreview from '../components/LivePreview.jsx'
import TiltCard from '../components/TiltCard.jsx'

function SectionCard({ label, icon, children, highlight = false }) {
  return (
    <TiltCard
      intensity={6}
      className={`rounded-2xl p-6 sm:p-7 ${
        highlight ? 'light-showcase-card' : 'glass-card'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-teal/15 border border-teal/40 flex items-center justify-center text-teal text-xs font-bold">
          {icon}
        </span>
        <h2
          className={`text-xs tracking-[0.2em] font-bold uppercase ${
            highlight ? 'text-[#0256CD]' : 'text-teal'
          }`}
        >
          {label}
        </h2>
      </div>
      <p
        className={`mt-3 text-sm sm:text-base leading-relaxed ${
          highlight ? 'text-slate-700' : 'text-slate'
        }`}
      >
        {children}
      </p>
    </TiltCard>
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
        <Link to="/case-studies" className="text-teal mt-4 inline-block">
          ← Back to case studies
        </Link>
      </main>
    )
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug)
  const prevStudy =
    currentIndex > 0 ? caseStudies[currentIndex - 1] : caseStudies[caseStudies.length - 1]
  const nextStudy =
    currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : caseStudies[0]
  const pillar = solutions.find((s) => s.id === study.pillarId)
  const related = caseStudies
    .filter((c) => c.pillarId === study.pillarId && c.slug !== study.slug)
    .slice(0, 2)

  return (
    <main className="pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Top Breadcrumb & Pillar Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-surface-border">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Link to="/case-studies" className="text-slate hover:text-teal font-medium">
              ← Case studies
            </Link>
            <span className="text-surface-border">/</span>
            {pillar && (
              <Link
                to={`/solutions#${pillar.id}`}
                className="text-teal hover:underline font-mono text-xs"
              >
                {pillar.title}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {study.clientUrl ? (
              <a
                href={study.clientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs px-3 py-1 rounded-full border border-surface-border bg-surface hover:border-teal ${
                  study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'
                }`}
              >
                {study.client} ↗
              </a>
            ) : (
              <span
                className={`text-xs px-3 py-1 rounded-full border border-surface-border bg-surface ${
                  study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'
                }`}
              >
                {study.client}
              </span>
            )}
            {study.status && (
              <span className="text-[11px] font-bold uppercase tracking-wide text-teal border border-teal/40 bg-teal/10 rounded-full px-3 py-1">
                {study.status}
              </span>
            )}
          </div>
        </div>

        {/* Hero Title & Action Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit leading-tight">
              {study.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate max-w-2xl">
              {study.hook}
            </p>
          </div>

          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient font-semibold py-3 px-7 rounded-full shrink-0 self-start md:self-auto"
            >
              Visit live site <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {/* Media / Live Preview Showcase */}
        {study.media?.type === 'youtube' ? (
          <div className="mt-8 aspect-video rounded-3xl overflow-hidden border border-teal/35 shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${study.media.id}`}
              title={study.title}
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>
        ) : study.liveUrl || study.previewUrl ? (
          <LivePreview
            key={study.slug}
            url={study.liveUrl || study.previewUrl}
            previewImage={study.previewImage}
            pillarId={study.pillarId}
            title={study.title}
            badgeText={study.liveUrl ? 'LIVE' : 'CLIENT SITE'}
            isLive={Boolean(study.liveUrl)}
          />
        ) : (
          <LivePreview
            key={study.slug}
            previewImage={study.previewImage}
            pillarId={study.pillarId}
            title={study.title}
            subtitle={
              study.clientUrl
                ? study.clientUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : `${study.client} · System Preview`
            }
            badgeText={study.status || 'PREVIEW'}
            isLive={false}
          />
        )}

        {/* 3-Card Structured Breakdown: Problem, Solution, Impact (with Light Contrast Highlight on Impact) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard label="The Problem" icon="01">
            {study.problem}
          </SectionCard>
          <SectionCard label="Our Solution" icon="02">
            {study.solution}
          </SectionCard>
          <SectionCard label="Impact" icon="03" highlight>
            {study.impact}
          </SectionCard>
        </div>

        {/* Tech Stack & Pillar Architecture Strip */}
        <div className="mt-10 obsidian-panel rounded-3xl p-6 sm:p-8 border border-surface-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xs tracking-[0.2em] font-bold text-teal uppercase">
                Tech &amp; Infrastructure Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono py-1.5 px-3.5 rounded-full bg-white/5 border border-white/15 text-[#F4F7FB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {pillar && (
              <Link
                to={`/solutions#${pillar.id}`}
                className="px-5 py-3 rounded-2xl bg-teal/15 border border-teal/40 text-teal text-xs font-mono font-bold hover:bg-teal hover:text-teal-ink transition-colors shrink-0"
              >
                Explore {pillar.title} Specs →
              </Link>
            )}
          </div>
        </div>

        {/* Related Case Studies in the Same Pillar */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate mb-4">
              More in {pillar?.title || 'this pillar'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/case-studies/${r.slug}`}
                  className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-teal/50"
                >
                  <div>
                    <span className="text-xs font-mono text-teal block">{r.client}</span>
                    <span className="font-bold text-offwhite font-outfit">{r.title}</span>
                  </div>
                  <span className="text-teal font-bold">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Previous / Next Case Study Navigation */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-surface-border">
          <Link
            to={`/case-studies/${prevStudy.slug}`}
            className="glass-card rounded-2xl p-4 text-left hover:border-teal/50 transition-all"
          >
            <span className="text-[11px] font-mono text-slate block">← Previous Case Study</span>
            <span className="text-sm font-bold text-offwhite font-outfit">{prevStudy.title}</span>
          </Link>
          <Link
            to={`/case-studies/${nextStudy.slug}`}
            className="glass-card rounded-2xl p-4 text-right hover:border-teal/50 transition-all"
          >
            <span className="text-[11px] font-mono text-slate block">Next Case Study →</span>
            <span className="text-sm font-bold text-offwhite font-outfit">{nextStudy.title}</span>
          </Link>
        </div>

        {/* Consultation CTA */}
        <div className="mt-12 glass-card rounded-3xl p-8 text-center border border-teal/35">
          <p className="text-xl font-bold text-offwhite font-outfit">
            Want something similar built or integrated?
          </p>
          <p className="text-sm text-slate mt-1">
            Speak directly with the payment engineers behind {study.title}.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-5 btn-gradient font-semibold py-3 px-8 rounded-full"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </main>
  )
}
