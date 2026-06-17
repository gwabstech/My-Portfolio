import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LivePreview from './LivePreview.jsx'

describe('LivePreview', () => {
  it('links to the live site and shows the hostname', () => {
    render(<LivePreview url="https://reconcile.ng" pillarId="software" title="Reconcile" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://reconcile.ng')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getByText('reconcile.ng')).toBeInTheDocument()
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })
})
