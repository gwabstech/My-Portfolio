import { trustCategories } from '../data/company.js'

export default function TrustBar() {
  return (
    <section
      aria-label="Ecosystem and compliance partners"
      className="relative z-10 border-y border-surface-border bg-navy-deep/90 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 py-7">
        {/* Dribbble Shot 1 Style: 3-Column Categorized Ecosystem Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x md:divide-surface-border">
          {trustCategories.map((group, idx) => (
            <div
              key={group.label}
              className={`flex flex-col justify-center ${
                idx > 0 ? 'md:pl-8' : ''
              }`}
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate/75 mb-2.5">
                {group.label}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/90 border border-surface-border text-xs font-bold text-offwhite tracking-wide hover:border-teal/50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
