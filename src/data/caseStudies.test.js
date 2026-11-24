import { describe, it, expect } from 'vitest'
import { caseStudies, getCaseStudy } from './caseStudies.js'
import { solutions } from './solutions.js'

describe('case studies data', () => {
  it('has 14 flagships', () => {
    expect(caseStudies).toHaveLength(14)
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
  it('Okada FleetOS is a live GWABS product in pilot', () => {
    const fleetos = getCaseStudy('okada-fleetos')
    expect(fleetos.title).toMatch(/Okada FleetOS/)
    expect(fleetos.isOwnProduct).toBe(true)
    expect(fleetos.liveUrl).toBe('https://okadaos.ng')
    expect(fleetos.status).toBeTruthy()
  })
  it('Regent MFB engagement is present and linked to the client site', () => {
    const regent = getCaseStudy('regent-mfb-merchant-platform')
    expect(regent.client).toBe('Regent MFB')
    expect(regent.clientUrl).toBe('https://www.regentmfb.com')
    expect(regent.liveUrl).toBeUndefined()
    expect(regent.status).toBeTruthy()
  })
  it('Otech MFB engagement is present and linked to the client site', () => {
    const otech = getCaseStudy('otech-mfb-pos-as-a-service')
    expect(otech.client).toBe('Otech MFB')
    expect(otech.clientUrl).toBe('https://www.otechbank.com')
    expect(otech.liveUrl).toBeUndefined()
    expect(otech.status).toBeTruthy()
  })
  it('includes GWABS SoftPOS, CPay, and OneClick flagship projects', () => {
    const softpos = getCaseStudy('gwabs-softpos-platform')
    expect(softpos.title).toMatch(/SoftPOS/)
    expect(softpos.isOwnProduct).toBe(true)
    expect(softpos.pillarId).toBe('sdks')

    const cpay = getCaseStudy('cpay-merchant-and-pos-switch')
    expect(cpay.title).toMatch(/CPay/)
    expect(cpay.clientUrl).toBe('https://cedricspay.com')
    expect(cpay.pillarId).toBe('switching')

    const oneclick = getCaseStudy('oneclick-commerce-and-payments')
    expect(oneclick.title).toMatch(/OneClick/)
    expect(oneclick.clientUrl).toBe('https://theoneclick.ng')
    expect(oneclick.pillarId).toBe('software')
  })
})
