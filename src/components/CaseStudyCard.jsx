import { Link } from 'react-router-dom'

export default function CaseStudyCard({ study }) {
  return (
    <Link to={`/case-studies/${study.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
      <div className="h-28 bg-gradient-to-br from-surface to-teal/60" />
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
