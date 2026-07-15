export default function SolutionCard({ solution }) {
  return (
    <div className="glass-card rounded-2xl p-6 3xl:p-8 hover:-translate-y-1 transition-transform">
      <div className="text-2xl text-teal">{solution.icon}</div>
      <h3 className="mt-3 text-lg 3xl:text-xl font-bold text-offwhite font-outfit">{solution.title}</h3>
      <p className="mt-2 text-sm text-slate">{solution.summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate/90">
        {solution.points.map(p => (
          <li key={p} className="flex gap-2"><span className="text-teal">›</span>{p}</li>
        ))}
      </ul>
    </div>
  )
}
