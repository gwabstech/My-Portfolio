import { useEffect, useState } from 'react'
import { company } from '../data/company.js'

// Override in Vercel with VITE_FORMSPREE_ENDPOINT (set it to the form that
// delivers to info@gbs.ng) without touching code. Falls back to the existing form.
const DEFAULT_ACTION = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xzdqwwvb'

const QUICK_TOPICS = [
  'POS Terminal App & EMV',
  'ISO 8583 Switching & Middleware',
  'Unified Device HAL SDK',
  'Multi-Tenant SaaS / TMS',
]

export default function ContactForm({ action = DEFAULT_ACTION }) {
  const [status, setStatus] = useState(null)
  const [subject, setSubject] = useState('')
  const [messagePrefill, setMessagePrefill] = useState('')

  // Auto-populate Subject & Message if visitor arrived from a solution or estimator CTA (?topic=...&fleet=...&tx=...)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const topic = params.get('topic')
    const fleet = params.get('fleet')
    const tx = params.get('tx')

    if (topic) {
      setSubject(topic)
    }
    if (topic && (fleet || tx)) {
      setMessagePrefill(
        `We are interested in ${topic} for approximately ${
          fleet ? `${Number(fleet).toLocaleString()} POS terminals/endpoints` : 'our network'
        }${
          tx ? ` handling ~${Number(tx).toLocaleString()} daily transactions` : ''
        }. Please share an architecture roadmap and consultation slot.`
      )
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        setSubject('')
        setMessagePrefill('')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const cleanPhone = company.phone.replace(/\D/g, '')
  const whatsappHref = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello GWABS Engineering Team, I'd like to discuss: ${
      subject || 'a payment infrastructure / POS project'
    }. ${messagePrefill}`
  )}`

  return (
    <form
      onSubmit={submit}
      method="POST"
      action={action}
      className="glass-card rounded-3xl p-7 sm:p-9 max-w-2xl mx-auto space-y-5 border border-teal/35 shadow-2xl"
    >
      <div className="pb-3 border-b border-surface-border flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-teal block">
            ARCHITECTURE &amp; PROJECT BRIEF
          </span>
          <h2 className="text-2xl font-extrabold text-offwhite font-outfit mt-1">
            Initiate a technical discussion
          </h2>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-bold">
          ● Engineers Online
        </span>
      </div>

      {/* Formspree: sets the email subject and uses the sender's address as reply-to */}
      <input type="hidden" name="_subject" value="New enquiry from the GWABS website" />
      {/* Honeypot: bots fill this; humans never see it */}
      <input
        type="text"
        name="_gotcha"
        tabIndex="-1"
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Quick Topic Chips */}
      <div>
        <span className="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
          Select Project Scope (1-Click Prefill)
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSubject(topic)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                subject === topic
                  ? 'bg-teal text-teal-ink border-teal font-semibold shadow'
                  : 'bg-surface border-surface-border text-slate hover:border-teal/50 hover:text-offwhite'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="block text-slate text-sm font-medium mb-1.5">
            Name
          </label>
          <input
            id="c-name"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-2.5 bg-navy border border-surface-border focus:border-teal focus:outline-none rounded-xl text-offwhite text-sm"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-slate text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            name="email"
            required
            placeholder="you@institution.com"
            className="w-full px-4 py-2.5 bg-navy border border-surface-border focus:border-teal focus:outline-none rounded-xl text-offwhite text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-subject" className="block text-slate text-sm font-medium mb-1.5">
          Subject
        </label>
        <input
          id="c-subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Multi-processor ISO 8583 switch or Android POS SDK"
          className="w-full px-4 py-2.5 bg-navy border border-surface-border focus:border-teal focus:outline-none rounded-xl text-offwhite text-sm"
        />
      </div>

      <div>
        <label htmlFor="c-message" className="block text-slate text-sm font-medium mb-1.5">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          defaultValue={messagePrefill}
          placeholder="Tell us about your terminal fleet, target processors, timeline, or integration requirements..."
          className="w-full px-4 py-2.5 bg-navy border border-surface-border focus:border-teal focus:outline-none rounded-xl text-offwhite text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        <button
          type="submit"
          className="sm:col-span-7 btn-gradient font-extrabold py-3.5 px-8 rounded-full w-full text-sm sm:text-base shadow-lg"
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:col-span-5 py-3.5 px-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#032018] font-extrabold text-sm text-center flex items-center justify-center gap-1.5 shadow-lg transition-colors"
        >
          <span>Chat on WhatsApp</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {status === 'success' && (
        <p className="text-teal text-center text-sm font-medium">
          Message sent — our engineering lead will respond shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-center text-sm font-medium">
          Something went wrong. Try emailing or WhatsApping us directly.
        </p>
      )}
    </form>
  )
}
