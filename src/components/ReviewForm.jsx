import { useState } from 'react'
import { addReview } from '../lib/firebase.js'

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', rating: 0, message: '' })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message || form.rating === 0) { setStatus('error'); return }
    setStatus('sending')
    try {
      await addReview(form)
      setStatus('success'); setForm({ name: '', rating: 0, message: '' })
    } catch { setStatus('error') }
    finally { setTimeout(() => setStatus(null), 4000) }
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-offwhite font-outfit text-center mb-6">Leave a review</h3>
      <label htmlFor="rv-name" className="block text-slate font-medium mb-1">Your name</label>
      <input id="rv-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full mb-4 px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" placeholder="Enter your name" />
      <span className="block text-slate font-medium mb-1">Rating</span>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(n => (
          <button type="button" key={n} aria-label={`★ ${n}`} onClick={() => setForm({ ...form, rating: n })}
            className={`text-2xl ${n <= form.rating ? 'text-teal' : 'text-surface-border'}`}>★</button>
        ))}
      </div>
      <label htmlFor="rv-msg" className="block text-slate font-medium mb-1">Your review</label>
      <textarea id="rv-msg" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        rows={4} className="w-full mb-4 px-4 py-2 bg-navy border border-surface-border rounded-lg text-offwhite" placeholder="Share your experience" />
      <button type="submit" className="btn-gradient font-semibold py-3 px-8 rounded-full w-full">Submit review</button>
      {status === 'success' && <p className="text-teal text-center mt-3">Thank you for your review!</p>}
      {status === 'error' && <p className="text-red-400 text-center mt-3">Please fill all fields and try again.</p>}
    </form>
  )
}
