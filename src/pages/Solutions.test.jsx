import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Solutions from './Solutions.jsx'

describe('Solutions', () => {
  it('renders all four pillar titles', () => {
    render(<MemoryRouter><Solutions /></MemoryRouter>)
    expect(screen.getByText('Payment Switching & Middleware')).toBeInTheDocument()
    expect(screen.getByText('Device & Hardware SDKs')).toBeInTheDocument()
  })
})
