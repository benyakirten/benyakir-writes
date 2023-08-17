import * as React from 'react'

import { render, screen, cleanup, fireEvent } from '@TestUtils'

import { IconButton } from '@Gen'

describe('IconButton component', () => {
  const clickSpy = jest.fn()

  const props: IconButtonProps = {
    iconSrc: 'test/path',
    alt: 'test alt',
    onClick: clickSpy,
  }

  beforeEach(cleanup)
  afterEach(clickSpy.mockClear)

  it('should render correctly', () => {
    expect(() => render(<IconButton {...props} />)).not.toThrow()
  })

  it('should call the onClick method if it is clicked', async () => {
    render(<IconButton {...props} />)

    const buttons = await screen.findAllByRole('button')
    const iconButton = buttons[buttons.length - 1]
    fireEvent.click(iconButton)

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('should not call the onClick method if the button is disabled even if it is clicked', async () => {
    render(<IconButton {...props} disabled />)

    const buttons = await screen.findAllByRole('button')
    const iconButton = buttons[buttons.length - 1]
    fireEvent.click(iconButton)

    expect(clickSpy).toHaveBeenCalledTimes(0)
  })
})
