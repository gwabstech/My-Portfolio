import { describe, it, expect } from 'vitest'
import { solutions } from './solutions.js'

describe('solutions data', () => {
  it('has exactly four pillars with required fields', () => {
    expect(solutions).toHaveLength(4)
    for (const s of solutions) {
      expect(s.id).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(Array.isArray(s.points)).toBe(true)
      expect(s.points.length).toBeGreaterThan(0)
    }
  })
  it('has unique ids', () => {
    const ids = solutions.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
