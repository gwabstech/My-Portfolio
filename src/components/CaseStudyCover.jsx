// Branded SVG cover art for case studies — one motif per solution pillar,
// rendered in the GWABS navy/teal palette. Replaces blank image placeholders.

const TEAL = '#00C2A8'
const INK = '#F4F7FB'
const SLATE = '#7e90ad'

function PosAppsMotif() {
  return (
    <g stroke={TEAL} strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round">
      {/* terminal body */}
      <rect x="150" y="46" width="120" height="150" rx="14" fill="#0f274f" />
      {/* screen */}
      <rect x="166" y="62" width="88" height="50" rx="6" fill="#0a1f44" stroke={SLATE} />
      <path d="M176 96 l14 -16 12 12 16 -22 14 26" stroke={TEAL} />
      {/* keypad */}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <circle key={`${r}-${c}`} cx={182 + c * 28} cy={134 + r * 20} r="5" fill={SLATE} stroke="none" />
      )))}
      {/* card */}
      <rect x="236" y="150" width="70" height="44" rx="6" fill="#0256cd" stroke={INK} transform="rotate(14 270 172)" />
      <rect x="246" y="162" width="20" height="13" rx="2" fill={TEAL} stroke="none" transform="rotate(14 270 172)" />
    </g>
  )
}

function SwitchingMotif() {
  return (
    <g fill="none" strokeWidth="3" strokeLinecap="round">
      <path d="M120 120 H180" stroke={SLATE} />
      <path d="M232 92 H300" stroke={TEAL} />
      <path d="M232 148 H300" stroke={TEAL} />
      <path d="M196 108 L226 92 M196 132 L226 148" stroke={TEAL} />
      <circle cx="108" cy="120" r="22" fill="#0256cd" stroke={INK} />
      <circle cx="206" cy="120" r="26" fill="#0f274f" stroke={TEAL} />
      <text x="206" y="127" fontSize="22" fill={TEAL} textAnchor="middle" stroke="none" fontFamily="monospace">⇄</text>
      <circle cx="314" cy="92" r="16" fill="#0f274f" stroke={SLATE} />
      <circle cx="314" cy="148" r="16" fill="#0f274f" stroke={SLATE} />
    </g>
  )
}

function SdksMotif() {
  return (
    <g fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M150 70 L112 120 L150 170" stroke={TEAL} />
      <path d="M286 70 L324 120 L286 170" stroke={TEAL} />
      <path d="M214 64 L196 176" stroke={SLATE} strokeWidth="3" />
      {/* chip */}
      <rect x="196" y="96" width="48" height="48" rx="6" fill="#0256cd" stroke={INK} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <g key={i} stroke={SLATE} strokeWidth="3">
          <path d={`M${204 + i * 14} 96 V84`} />
          <path d={`M${204 + i * 14} 144 V156`} />
        </g>
      ))}
    </g>
  )
}

function SoftwareMotif() {
  return (
    <g strokeLinejoin="round">
      <rect x="120" y="60" width="200" height="120" rx="12" fill="#0f274f" stroke={SLATE} strokeWidth="2" />
      <path d="M120 86 H320" stroke={SLATE} strokeWidth="2" />
      <circle cx="136" cy="73" r="4" fill={TEAL} />
      <circle cx="150" cy="73" r="4" fill={SLATE} />
      {/* bars */}
      <g fill={TEAL}>
        <rect x="142" y="140" width="20" height="26" rx="3" />
        <rect x="174" y="122" width="20" height="44" rx="3" />
        <rect x="206" y="132" width="20" height="34" rx="3" />
        <rect x="238" y="108" width="20" height="58" rx="3" fill="#0256cd" />
      </g>
      <path d="M142 116 L186 104 L222 112 L286 96" fill="none" stroke={INK} strokeWidth="2.5" />
    </g>
  )
}

const MOTIFS = {
  'pos-apps': PosAppsMotif,
  switching: SwitchingMotif,
  sdks: SdksMotif,
  software: SoftwareMotif,
}

export default function CaseStudyCover({ pillarId, className = '' }) {
  const Motif = MOTIFS[pillarId] || SoftwareMotif
  return (
    <svg viewBox="0 0 440 240" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="cover-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A1F44" />
          <stop offset="1" stopColor="#0D2A5C" />
        </linearGradient>
      </defs>
      <rect width="440" height="240" fill="url(#cover-bg)" />
      {/* faint G watermark echo */}
      <g opacity="0.06" stroke={TEAL} strokeWidth="14" fill="none">
        <circle cx="372" cy="196" r="78" />
        <path d="M372 196 H452" stroke={TEAL} strokeWidth="18" />
      </g>
      <Motif />
    </svg>
  )
}
