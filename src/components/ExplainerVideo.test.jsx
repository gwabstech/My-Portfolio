import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExplainerVideo from './ExplainerVideo.jsx'
import { media } from '../data/company.js'

describe('ExplainerVideo', () => {
  it('renders the heading and a capability-statement download link', () => {
    render(<ExplainerVideo />)
    expect(screen.getByText(/See how GWABS works/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /capability statement/i })
    expect(link).toHaveAttribute('href', media.capabilityStatement)
  })
})
