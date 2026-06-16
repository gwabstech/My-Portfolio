import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

describe('Home', () => {
  it('shows hero, what-we-do, featured work and a view-all link', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/engineered to settle/i)).toBeInTheDocument()
    expect(screen.getByText(/What we do/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view all/i })).toHaveAttribute('href', '/case-studies')
  })
})
