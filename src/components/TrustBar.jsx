import { trustBadges } from '../data/company.js'

export default function TrustBar() {
  return (
    <div className="bg-navy-deep border-y border-surface-border">
      <div className="container mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs tracking-wider text-slate/70">
        {trustBadges.map(b => <span key={b}>{b}</span>)}
      </div>
    </div>
  )
}
