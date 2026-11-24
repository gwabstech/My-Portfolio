import { useEffect, useState } from 'react'
import CaseStudyCover from './CaseStudyCover.jsx'

// Browser-framed preview card for case studies. Uses verified local screenshots
// first (never rate-limited), falling back to mshots for external live URLs
// and then branded CaseStudyCover SVG if all image sources fail.
export default function LivePreview({
  url,
  pillarId,
  title,
  previewImage,
  subtitle,
  badgeText = 'LIVE',
  isLive = true,
}) {
  const [sourceIndex, setSourceIndex] = useState(0)

  useEffect(() => {
    setSourceIndex(0)
  }, [url, previewImage])

  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : subtitle || title
  const sources = [
    previewImage || null,
    url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280` : null,
  ].filter(Boolean)

  const currentSrc = sources[sourceIndex]

  const content = (
    <>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-surface-border">
        <span className="flex gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400/75" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/75" />
          <span className="w-3 h-3 rounded-full bg-green-400/75" />
        </span>
        <span className="flex-1 mx-2 text-xs font-mono text-slate bg-navy border border-surface-border/70 rounded-md px-3 py-1 truncate">
          {host}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 shrink-0 ${
            isLive ? 'text-teal' : 'text-slate'
          }`}
        >
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />}
          {badgeText}
        </span>
      </div>

      <div className="aspect-video bg-navy-deep relative overflow-hidden">
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={`Preview of ${title}`}
            loading="lazy"
            onError={() => setSourceIndex((i) => i + 1)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
          />
        ) : (
          <CaseStudyCover pillarId={pillarId} className="w-full h-full" />
        )}

        {url && (
          <span className="pointer-events-none absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#040A18]/85 border border-teal/40 text-[11px] font-mono font-semibold text-[#F4F7FB] shadow-lg backdrop-blur-sm opacity-90 group-hover:opacity-100 group-hover:border-teal transition-all">
            {isLive ? 'Visit live site ↗' : 'Open client site ↗'}
          </span>
        )}
      </div>
    </>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-8 rounded-3xl overflow-hidden border border-surface-border shadow-2xl group hover:border-teal/50 transition-colors"
        aria-label={`Open ${title} at ${host}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className="mt-8 rounded-3xl overflow-hidden border border-surface-border shadow-2xl group"
      aria-label={`Preview of ${title}`}
    >
      {content}
    </div>
  )
}
