import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'

const SERVICE_MOTION_BADGES = {
  'pos-apps': 'Card Insert → PIN → Receipt',
  switching: '0200 → BIN Route → 0210 OK',
  sdks: '1 HAL API → 3 POS Vendors',
  software: 'CBN Radar & T+0 Vaults',
}

export default function SolutionCard({ solution }) {
  return (
    <TiltCard
      intensity={11}
      className="glass-card rounded-2xl p-6 3xl:p-8 flex flex-col justify-between group"
    >
      <div>
        {/* 3D Orbital Circle Icon Badge + Motion Tag */}
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-dashed border-teal/50 animate-orbit-ring"
            />
            <div className="w-10 h-10 rounded-full bg-teal/15 border border-teal/40 flex items-center justify-center text-lg text-teal shadow-[0_0_20px_rgba(0,194,168,0.25)] group-hover:bg-teal group-hover:text-teal-ink transition-colors">
              {solution.icon}
            </div>
          </div>
          {solution.badge && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-surface-border text-teal">
              {solution.badge}
            </span>
          )}
        </div>

        {/* Live Micro-Animation Flow Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal/10 border border-teal/25 text-[10px] font-mono text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
          <span>{SERVICE_MOTION_BADGES[solution.id] || 'Live 3D Engine'}</span>
        </div>

        <h3 className="mt-3 text-lg 3xl:text-xl font-bold text-offwhite font-outfit group-hover:text-teal transition-colors">
          {solution.title}
        </h3>
        <p className="mt-2 text-sm text-slate leading-relaxed">
          {solution.summary}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate/90">
          {solution.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="text-teal font-bold mt-0.5">›</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-surface-border/70 flex items-center justify-between text-xs">
        <span className="font-mono text-slate/75">
          {solution.metrics?.deploymentWeeks || 'Production-ready'}
        </span>
        <Link
          to={`/solutions#${solution.id}`}
          className="font-semibold text-teal hover:underline inline-flex items-center gap-1"
        >
          <span>Architecture</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </TiltCard>
  )
}
