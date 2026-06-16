import { stats } from '../data/company.js'

export default function StatsBand() {
  return (
    <section className="bg-teal text-teal-ink">
      <div className="container mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map(s => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold font-outfit">{s.value}</div>
            <div className="text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
