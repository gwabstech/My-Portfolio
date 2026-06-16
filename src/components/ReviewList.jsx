import { useEffect, useState } from 'react'
import { subscribeToReviews } from '../lib/firebase.js'

export default function ReviewList() {
  const [reviews, setReviews] = useState([])
  useEffect(() => subscribeToReviews(setReviews, 6), [])

  if (reviews.length === 0) {
    return <p className="text-center text-slate">No reviews yet. Be the first to leave one!</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map(r => (
        <div key={r.id} className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-teal text-teal-ink flex items-center justify-center font-bold">{r.name?.charAt(0)}</div>
            <div>
              <p className="font-bold text-offwhite">{r.name}</p>
              {(() => { const n = Math.max(0, Math.min(5, Number(r.rating) || 0)); return (
                <div className="text-teal text-sm">{'★'.repeat(n)}<span className="text-surface-border">{'★'.repeat(5 - n)}</span></div>
              )})()}
            </div>
          </div>
          <p className="text-slate italic">"{r.message}"</p>
        </div>
      ))}
    </div>
  )
}
