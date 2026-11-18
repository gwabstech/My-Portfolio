import { useState } from 'react'
import { Link } from 'react-router-dom'
import { developerSnippets, media } from '../data/company.js'
import TiltCard from './TiltCard.jsx'

export default function DeveloperShowcase() {
  const [selectedId, setSelectedId] = useState(developerSnippets[0].id)
  const [copied, setCopied] = useState(false)

  const current =
    developerSnippets.find((s) => s.id === selectedId) || developerSnippets[0]

  const copyCode = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(current.code)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      aria-label="Build on GWABS"
      className="relative py-20 3xl:py-28 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal">
            DEVELOPER-FIRST SDKs &amp; MIDDLEWARE
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-offwhite font-outfit">
            Build on GWABS
          </h2>
          <p className="mt-3 text-slate text-sm sm:text-base">
            Use our programmatic payment SDKs, ISO 8583 switch routers, and WebSocket gateways to ship certified financial products without hardware lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Dribbble "Build on Alula" Tab Links */}
          <div className="lg:col-span-5 space-y-3">
            {developerSnippets.map((snippet) => {
              const isActive = snippet.id === current.id
              return (
                <button
                  key={snippet.id}
                  type="button"
                  onClick={() => setSelectedId(snippet.id)}
                  className={`w-full text-left rounded-2xl px-6 py-4 transition-all border flex items-center justify-between group ${
                    isActive
                      ? 'obsidian-panel border-teal/60 shadow-[0_10px_30px_-8px_rgba(0,194,168,0.3)]'
                      : 'glass-card border-surface-border hover:border-teal/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-base sm:text-lg font-bold font-outfit ${
                          isActive ? 'text-[#F4F7FB]' : 'text-offwhite group-hover:text-teal'
                        }`}
                      >
                        {snippet.label}
                      </span>
                      <span className="text-teal font-bold text-sm">›</span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isActive ? 'text-[#9FB2D0]' : 'text-slate'
                      }`}
                    >
                      {snippet.subtitle}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full ${
                      isActive
                        ? 'bg-teal/20 text-teal border border-teal/40'
                        : 'bg-surface text-slate border border-surface-border'
                    }`}
                  >
                    Kotlin
                  </span>
                </button>
              )
            })}

            {/* Business & Tech Docs External Link (Matches "Business & Tech docs ↗" in Shot 1) */}
            <a
              href={media.capabilityStatement}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl px-6 py-4 glass-card border border-surface-border hover:border-teal/50 flex items-center justify-between text-offwhite hover:text-teal transition-all"
            >
              <div>
                <span className="text-base font-bold font-outfit">
                  Business &amp; Tech Capability Docs
                </span>
                <p className="text-xs text-slate mt-0.5">
                  Download official architecture &amp; compliance profile (PDF)
                </p>
              </div>
              <span aria-hidden="true" className="text-teal font-bold">
                ↗
              </span>
            </a>
          </div>

          {/* Right Column: Glowing Code Editor Window (Dribbble Shot 1 "Alula V1" Window) */}
          <div className="lg:col-span-7">
            <TiltCard
              intensity={6}
              glareColor="rgba(54, 224, 200, 0.14)"
              className="obsidian-panel rounded-3xl overflow-hidden border border-teal/35 shadow-2xl"
            >
              {/* Window Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#081530] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-teal">
                    {current.version}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs font-mono text-[#9FB2D0]">
                    {current.fileName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyCode}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/10 hover:bg-teal hover:text-teal-ink text-[#F4F7FB] transition-colors"
                  >
                    {copied ? '✓ Copied' : 'Copy snippet'}
                  </button>
                  <div className="hidden sm:flex items-center gap-1.5 pl-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-blue/70" />
                  </div>
                </div>
              </div>

              {/* Code Content with Line Numbers */}
              <div className="p-5 sm:p-6 overflow-x-auto bg-[#040B1A]/90 font-mono text-xs sm:text-sm leading-relaxed">
                <pre className="text-[#E4E9F2] m-0">
                  {current.code.split('\n').map((line, i) => {
                    const isComment = line.trim().startsWith('//')
                    return (
                      <div key={i} className="table-row">
                        <span className="table-cell pr-4 select-none text-right text-[#4B638B] text-xs">
                          {i + 1}
                        </span>
                        <span
                          className={`table-cell ${
                            isComment ? 'text-teal/85 italic' : 'text-[#E4E9F2]'
                          }`}
                        >
                          {line || ' '}
                        </span>
                      </div>
                    )
                  })}
                </pre>
              </div>

              {/* Bottom Status & Case Study Bar */}
              <div className="px-5 py-3.5 bg-[#071229] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#9FB2D0] font-mono">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span>Production-verified in live banking deployments</span>
                </div>
                <Link
                  to={`/case-studies/${current.caseStudySlug}`}
                  className="text-teal font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View production case study</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
