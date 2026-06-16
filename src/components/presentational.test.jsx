import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero.jsx'
import TrustBar from './TrustBar.jsx'
import StatsBand from './StatsBand.jsx'
import CTASection from './CTASection.jsx'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('presentational components', () => {
  it('Hero shows the tagline and CTAs', () => {
    wrap(<Hero />)
    expect(screen.getByText(/engineered to settle/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore solutions/i })).toBeInTheDocument()
  })
  it('TrustBar lists badges', () => {
    wrap(<TrustBar />)
    expect(screen.getByText('ISO 8583')).toBeInTheDocument()
  })
  it('StatsBand renders stat values', () => {
    wrap(<StatsBand />)
    expect(screen.getByText('PCI DSS')).toBeInTheDocument()
  })
  it('CTASection has a consultation link', () => {
    wrap(<CTASection />)
    expect(screen.getByRole('link', { name: /consultation/i })).toBeInTheDocument()
  })
})
