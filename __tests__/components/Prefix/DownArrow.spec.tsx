import * as React from 'react'
import renderer, { act } from 'react-test-renderer'
import 'jest-styled-components'

import { DownArrow } from '@Pre'

describe('DownArrow component', () => {
  it('should render properly', () => {
    expect(() => renderer.create(<DownArrow />)).not.toThrow()
  })

  it('should rotate the arrow based on the open prop', async () => {
    const container = renderer.create(<DownArrow />)
    expect(container.toJSON()).toMatchSnapshot()
    expect(container.toJSON()).toHaveStyleRule('transform', 'rotate(0deg)')

    renderer.act(() => {
      container.update(<DownArrow open={true} />)
    })
    expect(container.toJSON()).toHaveStyleRule('transform', 'rotate(180deg)')
  })

  it('should render a span with the same tabIndex as the prop', () => {
    const container = renderer.create(<DownArrow />)
    expect(container.toJSON()).toMatchSnapshot()
    expect((container.toJSON() as any).props.tabIndex).toEqual(-1)

    renderer.act(() => {
      container.update(<DownArrow tabIndex={0} />)
    })
    expect((container.toJSON() as any).props.tabIndex).toEqual(0)
  })

  it('should render a span with the same onClick as the prop', () => {
    const container = renderer.create(<DownArrow />)
    expect(container.toJSON()).toMatchSnapshot()
    expect((container.toJSON() as any).props.onClick).toBeUndefined()

    const testClick = () => 1 + 1
    act(() => {
      container.update(<DownArrow onClick={testClick} />)
    })
    expect((container.toJSON() as any).props.onClick).toEqual(testClick)
  })
})
