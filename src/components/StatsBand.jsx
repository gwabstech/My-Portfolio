import { stats } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

export default function StatsBand() {
  return (
    <section className="relative py-12 3xl:py-16 bg-gradient-to-r from-[#04142E] via-[#072247] to-[#04142E] border-y border-teal/30">
      <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <TiltCard
            key={s.label}
            intensity={8}
            className="rounded-2xl bg-[#061531]/85 border border-teal/30 p-6 text-center shadow-lg"
          >
            <div className="text-3xl sm:text-4xl 3xl:text-5xl font-extrabold font-outfit text-teal">
              {s.value}
            </div>
            <div className="text-sm sm:text-base font-bold text-[#F4F7FB] mt-1.5">
              {s.label}
            </div>
            {s.detail && (
              <div className="text-xs text-[#9FB2D0] mt-1 font-mono">
                {s.detail}
              </div>
            )}
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
