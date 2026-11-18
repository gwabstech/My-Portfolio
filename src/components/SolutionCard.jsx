import { Link } from 'react-router-dom'
import TiltCard from './TiltCard.jsx'

export default function SolutionCard({ solution }) {
  return (
    <TiltCard
      intensity={10}
      className="glass-card rounded-2xl p-6 3xl:p-8 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="w-11 h-11 rounded-xl bg-teal/15 border border-teal/40 flex items-center justify-center text-xl text-teal shadow-[0_0_20px_rgba(0,194,168,0.2)]">
            {solution.icon}
          </div>
          {solution.badge && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-surface-border text-teal">
              {solution.badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg 3xl:text-xl font-bold text-offwhite font-outfit group-hover:text-teal transition-colors">
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
