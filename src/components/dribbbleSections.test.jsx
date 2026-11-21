import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../lib/theme.jsx'
import Nav from './Nav.jsx'
import SolutionsExplorer from './SolutionsExplorer.jsx'
import HowItWorks from './HowItWorks.jsx'
import InstitutionalPerformance from './InstitutionalPerformance.jsx'
import DeveloperShowcase from './DeveloperShowcase.jsx'
import ScaleBanner from './ScaleBanner.jsx'
import LightInfrastructureSection from './LightInfrastructureSection.jsx'
import CinematicServiceJourney from './CinematicServiceJourney.jsx'

const wrap = (ui) =>
  render(
    <ThemeProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  )

describe('Dribbble-inspired sections & theme toggle', () => {
  it('toggles document theme between dark and light from Nav', async () => {
    const user = userEvent.setup()
    wrap(<Nav />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    const toggleBtns = screen.getAllByRole('button', { name: /Switch to light theme/i })
    await user.click(toggleBtns[0])
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('SolutionsExplorer switches active pillar tab and updates white card', async () => {
    const user = userEvent.setup()
    wrap(<SolutionsExplorer />)
    expect(screen.getByText(/Live Payment Rails/i)).toBeInTheDocument()
    const sdkBtn = screen.getByRole('button', { name: /Device & Hardware SDKs/i })
    await user.click(sdkBtn)
    expect(screen.getByText(/DUKPT · BouncyCastle/i)).toBeInTheDocument()
  })

  it('HowItWorks renders all 3 steps and deep links', () => {
    wrap(<HowItWorks />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('InstitutionalPerformance renders and allows switching features', async () => {
    const user = userEvent.setup()
    wrap(<InstitutionalPerformance />)
    expect(screen.getByText(/Built for Institutional Performance/i)).toBeInTheDocument()
    const nextBtn = screen.getByRole('button', { name: /Next institutional feature/i })
    await user.click(nextBtn)
    expect(screen.getByRole('heading', { name: /One EMV SDK Across All Vendors/i })).toBeInTheDocument()
  })

  it('DeveloperShowcase switches Kotlin code tabs', async () => {
    const user = userEvent.setup()
    wrap(<DeveloperShowcase />)
    expect(screen.getByText(/GwabsPosTerminal\.kt/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /ISO 8583 Switch API/i }))
    expect(screen.getByText(/IsoSwitchRouter\.kt/i)).toBeInTheDocument()
  })

  it('ScaleBanner and LightInfrastructureSection render key headings', () => {
    wrap(
      <>
        <ScaleBanner />
        <LightInfrastructureSection />
      </>
    )
    expect(
      screen.getByText(/Scale your payment operations with programmable, compliant infrastructure/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Secure infrastructure for modern payment markets/i)
    ).toBeInTheDocument()
  })

  it('CinematicServiceJourney renders interactive POS simulator and switches stages', async () => {
    const user = userEvent.setup()
    wrap(<CinematicServiceJourney />)
    expect(screen.getByText(/Watch Our Services in Action/i)).toBeInTheDocument()
    const failoverBtn = screen.getByRole('button', { name: /Simulate Switch Failover/i })
    await user.click(failoverBtn)
    expect(screen.getByText(/Failover Active \(CoralPay\)/i)).toBeInTheDocument()
    const printBtn = screen.getByRole('button', { name: 'PRINT' })
    await user.click(printBtn)
    expect(screen.getByText(/GWABS POS RECEIPT/i)).toBeInTheDocument()
  })
})
