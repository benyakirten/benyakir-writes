import * as React from 'react'

import { cleanup, render } from '@TestUtils'
import { LeadPage } from '@Layout'

describe('LeadPage component', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    expect(() =>
      render(<LeadPage title="test title" filter={<div />} />)
    ).not.toThrow()
  })
})
