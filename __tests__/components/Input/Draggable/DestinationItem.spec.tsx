import React from 'react'

import { cleanup, render, screen, fireEvent } from '@TestUtils'
import { DestinationItem } from '@Draggable'

describe('DestinationItem component', () => {
  const dropSpy = jest.fn()

  beforeEach(cleanup)
  afterEach(dropSpy.mockClear)

  const props = {
    title: 'test title',
    onDrop: dropSpy,
  }

  it('should render correctly', () => {
    expect(() => render(<DestinationItem {...props} />)).not.toThrow()
  })

  it('should call the onDrop method with the data-value attribute of the dropped item when it receives a drop event', async () => {
    render(<DestinationItem {...props} />)
    const item = await screen.findByRole('listitem')
    fireEvent.drop(item, {
      dataTransfer: {
        getData: jest.fn((_) => 'test-value'),
      },
    })

    expect(dropSpy).toHaveBeenCalled()
    expect(dropSpy).toHaveBeenCalledWith('test-value')
  })
})
