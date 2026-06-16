import { describe, it, expect } from 'vitest'
import { company, navLinks } from './company.js'

describe('company data', () => {
  it('exposes the legal identity', () => {
    expect(company.legalName).toBe('GWABS TECHNOLOGY LIMITED')
    expect(company.formerName).toMatch(/Gwabstech/i)
    expect(company.rc).toBe('9482405')
    expect(company.tin).toBe('2623758929985')
  })
  it('exposes contact details', () => {
    expect(company.email).toBe('info@gbs.ng')
    expect(company.phone).toBe('+234 903 086 3146')
    expect(company.address).toMatch(/Karu, Abuja/)
  })
  it('lists the five primary nav links', () => {
    expect(navLinks.map(l => l.to)).toEqual(['/', '/solutions', '/case-studies', '/about', '/contact'])
  })
})
