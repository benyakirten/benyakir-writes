import * as React from 'react'
import 'jest-styled-components'

import { cleanup, render } from '@TestUtils'
import { AlertBox } from '@Gen'

describe('AlertBox component', () => {
  it('should render successfully', () => {
    expect(() => render(<AlertBox />)).not.toThrow()
    cleanup()
  })
})
