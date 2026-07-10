import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CaseStudies from './CaseStudies.jsx'

describe('CaseStudies', () => {
  it('shows all 9 cards by default', () => {
    render(<MemoryRouter><CaseStudies /></MemoryRouter>)
    expect(screen.getAllByRole('link').filter(a => a.getAttribute('href')?.startsWith('/case-studies/'))).toHaveLength(9)
  })
  it('filters by pillar', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CaseStudies /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /Payment Switching/i }))
    const links = screen.getAllByRole('link').filter(a => a.getAttribute('href')?.startsWith('/case-studies/'))
    expect(links.length).toBeLessThan(9)
    expect(links.length).toBeGreaterThan(0)
  })
})
