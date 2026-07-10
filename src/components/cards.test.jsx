import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SolutionCard from './SolutionCard.jsx'
import CaseStudyCard from './CaseStudyCard.jsx'
import { solutions } from '../data/solutions.js'
import { getCaseStudy } from '../data/caseStudies.js'

describe('cards', () => {
  it('SolutionCard renders title and points', () => {
    render(<MemoryRouter><SolutionCard solution={solutions[0]} /></MemoryRouter>)
    expect(screen.getByText(solutions[0].title)).toBeInTheDocument()
  })
  it('CaseStudyCard links to the detail route and shows client', () => {
    render(<MemoryRouter><CaseStudyCard study={getCaseStudy('bellbank-cashout-middleware')} /></MemoryRouter>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/case-studies/bellbank-cashout-middleware')
    expect(screen.getByText('Bellbank MFB')).toBeInTheDocument()
  })
})
