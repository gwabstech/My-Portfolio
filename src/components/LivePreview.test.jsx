import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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

  it('prefers local previewImage and never uses api.microlink.io', () => {
    render(
      <LivePreview
        url="https://reconcile.ng"
        previewImage="/images/previews/reconcile.jpg"
        pillarId="software"
        title="Reconcile"
      />
    )
    const img = screen.getByRole('img', { name: /Reconcile/i })
    expect(img).toHaveAttribute('src', '/images/previews/reconcile.jpg')
    expect(img.getAttribute('src')).not.toMatch(/microlink/)
  })

  it('renders a framed non-link preview when url is omitted', () => {
    render(
      <LivePreview
        previewImage="/images/previews/cpay-merchant-and-pos-switch.jpg"
        pillarId="switching"
        title="CPay"
        subtitle="cedricspay.com"
        badgeText="Production Pilot"
        isLive={false}
      />
    )
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('cedricspay.com')).toBeInTheDocument()
    expect(screen.getByText('Production Pilot')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /CPay/i })).toHaveAttribute(
      'src',
      '/images/previews/cpay-merchant-and-pos-switch.jpg'
    )
  })

  it('resets image fallback state when url or previewImage changes', () => {
    const { rerender } = render(
      <LivePreview
        url="https://example.org"
        previewImage="/missing-a.jpg"
        pillarId="software"
        title="Product A"
      />
    )
    // Exhaust both previewImage and mshots fallback
    fireEvent.error(screen.getByRole('img', { name: /Product A/i }))
    fireEvent.error(screen.getByRole('img', { name: /Product A/i }))
    expect(screen.queryByRole('img', { name: /Product A/i })).toBeNull()

    rerender(
      <LivePreview
        url="https://example.com"
        previewImage="/images/previews/gbs.jpg"
        pillarId="software"
        title="Product B"
      />
    )
    expect(screen.getByRole('img', { name: /Product B/i })).toHaveAttribute(
      'src',
      '/images/previews/gbs.jpg'
    )
  })
})
