import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer.jsx'

describe('Footer', () => {
  it('shows company registration and contact facts', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    expect(screen.getByText(/RC 9482405/)).toBeInTheDocument()
    expect(screen.getByText(/info@gbs.ng/)).toBeInTheDocument()
    expect(screen.getByText(/Karu, Abuja/)).toBeInTheDocument()
  })
})
