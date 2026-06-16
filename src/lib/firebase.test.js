import { describe, it, expect } from 'vitest'
import { reviewsPath } from './firebase.js'

describe('reviewsPath', () => {
  it('builds the public reviews collection path', () => {
    expect(reviewsPath('my-portfolio-787cb')).toBe(
      '/artifacts/my-portfolio-787cb/public/data/reviews'
    )
  })
})
