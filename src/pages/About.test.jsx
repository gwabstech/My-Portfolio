import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'

describe('About', () => {
  it('tells the company story and names the founder', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText(/formerly/i)).toBeInTheDocument()
    expect(screen.getByText(/Abubakar/)).toBeInTheDocument()
    expect(screen.getByText(/RC 9482405/)).toBeInTheDocument()
  })
})
