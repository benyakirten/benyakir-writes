import * as React from 'react'

import { render, cleanup } from '@TestUtils'
import { SkewRow } from '@Gen'

describe('SkewRow component', () => {
  afterEach(cleanup)

  it('should render properly', () => {
    expect(() => render(<SkewRow />)).not.toThrow()
  })
})
