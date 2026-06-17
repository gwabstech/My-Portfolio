import { Link } from 'react-router-dom'
import CaseStudyCover from './CaseStudyCover.jsx'

export default function CaseStudyCard({ study }) {
  return (
    <Link to={`/case-studies/${study.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
      <div className="relative">
        <CaseStudyCover pillarId={study.pillarId} className="h-32 w-full" />
        {study.liveUrl && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-teal-ink bg-teal rounded-full px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-ink animate-pulse" /> LIVE
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-offwhite font-outfit group-hover:text-teal transition-colors">{study.title}</h3>
        <p className="mt-1 text-xs">
          <span className={study.isOwnProduct ? 'text-teal font-semibold' : 'text-slate'}>{study.client}</span>
        </p>
        <p className="mt-2 text-sm text-slate">{study.hook}</p>
      </div>
    </Link>
  )
}
