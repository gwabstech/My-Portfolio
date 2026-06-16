import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactForm from './ContactForm.jsx'

describe('ContactForm', () => {
  it('renders all fields and a submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
