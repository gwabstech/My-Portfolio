import { useState } from 'react'

const DEFAULT_ACTION = 'https://formspree.io/f/xdklbzok'

export default function ContactForm({ action = DEFAULT_ACTION }) {
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('success'); e.target.reset() } else setStatus('error')
    } catch { setStatus('error') }
    finally { setTimeout(() => setStatus(null), 5000) }
  }

  return (
    <form onSubmit={submit} method="POST" action={action} className="glass-card rounded-2xl p-8 max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="c-name" className="block text-slate font-medium mb-1">Name</label>
        <input id="c-name" name="name" required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-email" className="block text-slate font-medium mb-1">Email</label>
        <input id="c-email" type="email" name="email" required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-subject" className="block text-slate font-medium mb-1">Subject</label>
        <input id="c-subject" name="subject" className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <div>
        <label htmlFor="c-message" className="block text-slate font-medium mb-1">Message</label>
        <textarea id="c-message" name="message" rows={5} required className="w-full px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" />
      </div>
      <button type="submit" className="btn-gradient font-semibold py-3 px-8 rounded-full w-full">Send message</button>
      {status === 'success' && <p className="text-teal text-center">Message sent — we'll be in touch.</p>}
      {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Try emailing us directly.</p>}
    </form>
  )
}
