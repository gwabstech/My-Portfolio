import { useState } from 'react'
import CaseStudyCover from './CaseStudyCover.jsx'

// A browser-framed preview card for a live product site. Shows an on-demand
// screenshot of the site (most live sites block iframing), falling back to the
// branded cover art if the screenshot service is unavailable.
export default function LivePreview({ url, pillarId, title }) {
  const [failed, setFailed] = useState(false)
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const screenshot = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-8 rounded-2xl overflow-hidden border border-surface-border shadow-2xl group"
      aria-label={`Open the live ${title} site at ${host}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-surface-border">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" />
        </span>
        <span className="flex-1 mx-2 text-xs text-slate bg-navy rounded-md px-3 py-1 truncate">{host}</span>
        <span className="text-[10px] font-bold text-teal flex items-center gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> LIVE
        </span>
      </div>
      <div className="aspect-video bg-navy-deep">
        {failed ? (
          <CaseStudyCover pillarId={pillarId} className="w-full h-full" />
        ) : (
          <img
            src={screenshot}
            alt={`Live preview of ${title}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover object-top group-hover:opacity-95 transition-opacity"
          />
        )}
      </div>
    </a>
  )
}
