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
})
