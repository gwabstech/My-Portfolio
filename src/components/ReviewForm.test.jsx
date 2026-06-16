import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const addReview = vi.fn().mockResolvedValue(undefined)
vi.mock('../lib/firebase.js', () => ({ addReview: (...a) => addReview(...a) }))

import ReviewForm from './ReviewForm.jsx'

beforeEach(() => addReview.mockClear())

describe('ReviewForm', () => {
  it('submits name, rating, and message', async () => {
    const user = userEvent.setup()
    render(<ReviewForm />)
    await user.type(screen.getByLabelText(/name/i), 'Ada')
    await user.click(screen.getByRole('button', { name: '★ 5' }))
    await user.type(screen.getByLabelText(/review/i), 'Excellent work')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(addReview).toHaveBeenCalledWith({ name: 'Ada', rating: 5, message: 'Excellent work' })
  })
})
