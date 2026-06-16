import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CaseStudyDetail from './CaseStudyDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/case-studies/:slug" element={<CaseStudyDetail />} /></Routes>
    </MemoryRouter>
  )
}

describe('CaseStudyDetail', () => {
  it('renders problem/solution/impact for a known slug', () => {
    renderAt('/case-studies/teasypay-pos-sdk')
    expect(screen.getByText('TeasyPay POS SDK')).toBeInTheDocument()
    expect(screen.getByText(/The Problem/i)).toBeInTheDocument()
    expect(screen.getByText(/jPOS/)).toBeInTheDocument()
  })
  it('shows a not-found state for an unknown slug', () => {
    renderAt('/case-studies/does-not-exist')
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
