import { describe, it, expect } from 'vitest'
import { caseStudies, getCaseStudy } from './caseStudies.js'
import { solutions } from './solutions.js'

describe('case studies data', () => {
  it('has 8 flagships', () => {
    expect(caseStudies).toHaveLength(8)
  })
  it('each has the required fields', () => {
    for (const c of caseStudies) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/)
      expect(c.title).toBeTruthy()
      expect(c.client).toBeTruthy()
      expect(c.pillarId).toBeTruthy()
      expect(c.hook).toBeTruthy()
      expect(c.problem && c.solution && c.impact).toBeTruthy()
      expect(Array.isArray(c.tech)).toBe(true)
      expect(c.tech.length).toBeGreaterThan(0)
    }
  })
  it('has unique slugs', () => {
    const slugs = caseStudies.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('looks up by slug', () => {
    expect(getCaseStudy('gwabs-business-suite').title).toMatch(/Business Suite/)
    expect(getCaseStudy('nope')).toBeUndefined()
  })
  it('every case study references a real pillar', () => {
    const pillarIds = new Set(solutions.map(s => s.id))
    for (const c of caseStudies) expect(pillarIds.has(c.pillarId)).toBe(true)
  })
  it('Reconcile and Gwabs Business Suite are live products with valid URLs', () => {
    const reconcile = getCaseStudy('reconcile')
    expect(reconcile.title).toMatch(/Reconcile/)
    expect(reconcile.liveUrl).toBe('https://reconcile.ng')
    expect(reconcile.isOwnProduct).toBe(true)
    expect(getCaseStudy('gwabs-business-suite').liveUrl).toBe('https://gbs.ng')
  })
  it('any liveUrl is an absolute https URL', () => {
    for (const c of caseStudies) {
      if (c.liveUrl) expect(c.liveUrl).toMatch(/^https:\/\//)
    }
  })
})
