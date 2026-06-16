import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact.jsx'

describe('Contact', () => {
  it('shows the form and the company contact details', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    expect(screen.getByText(/info@gbs.ng/)).toBeInTheDocument()
    expect(screen.getByText(/\+234 903 086 3146/)).toBeInTheDocument()
  })
})
