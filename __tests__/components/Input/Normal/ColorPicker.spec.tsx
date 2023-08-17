import * as React from 'react'

import { render, cleanup, screen, fireEvent } from '@TestUtils'
import { ColorPicker } from '@Input'

describe('ColorPicker component', () => {
  const changeSpy = jest.fn()
  const props: ColorPickerProps = {
    value: 'test value',
    label: 'test color',
    name: 'test-color-picker',
    onChange: changeSpy,
  }

  beforeEach(cleanup)
  afterEach(changeSpy.mockClear)

  it('should render correctly', () => {
    expect(() => render(<ColorPicker {...props} />)).not.toThrow()
  })

  it('should call on the onChange prop if the color is changed to a valid value', async () => {
    render(<ColorPicker {...props} />)

    const input = await screen.findByLabelText('test color')
    fireEvent.change(input, {
      target: {
        value: '#abcdef',
      },
    })

    expect(changeSpy).toHaveBeenCalledTimes(1)
    expect(changeSpy).toHaveBeenCalledWith('#abcdef')
  })
})
