import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav.jsx'

describe('Nav', () => {
  it('renders the wordmark and all nav links', () => {
    render(<MemoryRouter><Nav /></MemoryRouter>)
    expect(screen.getByText('GWABS')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Solutions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })
})
