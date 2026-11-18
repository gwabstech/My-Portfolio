/**
 * Continuous animated architectural grid + glowing particle nodes & circuit streams
 * inspired by the Alula DeFi / Fintech Dribbble design.
 */
const PARTICLES = [
  { left: '8%', top: '18%', size: 6, delay: '0s', duration: '6s', color: '#00C2A8' },
  { left: '22%', top: '72%', size: 4, delay: '1.2s', duration: '7s', color: '#36E0C8' },
  { left: '38%', top: '24%', size: 5, delay: '2.4s', duration: '5.5s', color: '#60A5FA' },
  { left: '54%', top: '82%', size: 6, delay: '0.7s', duration: '6.8s', color: '#00C2A8' },
  { left: '68%', top: '16%', size: 4, delay: '1.8s', duration: '7.2s', color: '#36E0C8' },
  { left: '84%', top: '64%', size: 7, delay: '0.4s', duration: '6.2s', color: '#60A5FA' },
  { left: '91%', top: '28%', size: 5, delay: '2.9s', duration: '5.8s', color: '#00C2A8' },
  { left: '14%', top: '48%', size: 4, delay: '1.5s', duration: '6.4s', color: '#60A5FA' },
]

export default function ParticleGridBackground({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Subtle architectural grid */}
      <div className={`absolute inset-0 bg-arch-grid ${isLight ? 'opacity-40' : 'opacity-70'}`} />

      {/* Radial corner spotlights matching Dribbble cyan/blue glow */}
      <div
        className="absolute -top-36 -left-36 w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse-glow"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(0,194,168,0.14) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,194,168,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl animate-pulse-glow"
        style={{
          animationDelay: '2s',
          background: isLight
            ? 'radial-gradient(circle, rgba(2,86,205,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(2,86,205,0.24) 0%, transparent 70%)',
        }}
      />

      {/* Animated SVG circuit traces */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 180 H240 L310 250 H560 L620 190 H940"
          stroke="#00C2A8"
          strokeWidth="1.2"
          strokeOpacity="0.28"
        />
        <path
          d="M0 180 H240 L310 250 H560 L620 190 H940"
          stroke="#36E0C8"
          strokeWidth="2"
          className="animate-circuit"
        />
        <path
          d="M1440 620 H1120 L1040 540 H760 L690 610 H360"
          stroke="#0256CD"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <path
          d="M1440 620 H1120 L1040 540 H760 L690 610 H360"
          stroke="#60A5FA"
          strokeWidth="2"
          className="animate-circuit-reverse"
        />
      </svg>

      {/* Floating luminous particles */}
      {PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 14px 3px ${p.color}`,
            opacity: isLight ? 0.45 : 0.75,
          }}
        />
      ))}
    </div>
  )
}
