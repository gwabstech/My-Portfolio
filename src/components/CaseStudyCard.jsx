import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyCover from './CaseStudyCover.jsx'
import TiltCard from './TiltCard.jsx'

export default function CaseStudyCard({ study }) {
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgFailed(false)
  }, [study.previewImage])

  const showImage = Boolean(study.previewImage && !imgFailed)

  return (
    <TiltCard intensity={9} className="rounded-2xl flex flex-col h-full">
      <Link
        to={`/case-studies/${study.slug}`}
        className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full group"
      >
        <div>
          <div className="relative overflow-hidden bg-navy-deep">
            {showImage ? (
              <>
                <img
                  src={study.previewImage}
                  alt={`${study.title} preview`}
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                  className="h-44 2xl:h-48 w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#040A18]/75 via-[#040A18]/25 to-transparent"
                  aria-hidden="true"
                />
              </>
            ) : (
              <CaseStudyCover
                pillarId={study.pillarId}
                className="h-44 2xl:h-48 w-full group-hover:scale-105 transition-transform duration-500"
              />
            )}

            {study.liveUrl ? (
              <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-bold text-teal-ink bg-teal rounded-full px-2.5 py-0.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-ink animate-pulse" /> LIVE
              </span>
            ) : study.status ? (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide text-[#F4F7FB] bg-[#040A18]/85 border border-teal/35 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                {study.status}
              </span>
            ) : study.media?.type === 'youtube' ? (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide text-[#F4F7FB] bg-[#040A18]/85 border border-teal/35 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                VIDEO DEMO
              </span>
            ) : null}
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
              <span
                className={
                  study.isOwnProduct
                    ? 'text-teal font-semibold font-mono'
                    : 'text-slate font-medium'
                }
              >
                {study.client}
              </span>
              <span className="text-[10px] font-mono uppercase text-slate/70">
                {study.pillarId}
              </span>
            </div>

            <h3 className="text-lg 3xl:text-xl font-bold text-offwhite font-outfit group-hover:text-teal transition-colors">
              {study.title}
            </h3>
            <p className="mt-2 text-sm text-slate leading-relaxed">
              {study.hook}
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {study.tech?.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface/90 border border-surface-border text-slate"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-teal group-hover:translate-x-1 transition-transform shrink-0">
            Inspect →
          </span>
        </div>
      </Link>
    </TiltCard>
  )
}
