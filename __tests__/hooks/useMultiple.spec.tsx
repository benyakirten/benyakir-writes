import React from 'react'

import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import { useMultiple } from '@Hooks'

const Wrapper: React.FC<{
  possibilities: string[]
  defaultTrue?: string[]
}> = ({ possibilities, defaultTrue }) => {
  const [allPossibilities, setAllPossibilities] = useMultiple(
    possibilities,
    defaultTrue
  )
  const [text, setText] = React.useState('')
  const handleClick = () => {
    setAllPossibilities(...text.split(' '))
    setText('')
  }
  return (
    <div>
      <ul>
        {Object.keys(allPossibilities)
          .filter((possibility) => allPossibilities[possibility])
          .map((trueItem) => (
            <li key={trueItem}>{trueItem}</li>
          ))}
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Alternate</button>
    </div>
  )
}

describe('useMultiple hook', () => {
  afterEach(cleanup)

  it('should display a list item for all possibilities if none are specified as open by default', async () => {
    render(<Wrapper possibilities={['first', 'second', 'third']} />)
    const ul = await screen.getByRole('list')
    expect(ul.children.length).toEqual(3)
    expect(ul.children[0].textContent).toEqual('third')
    expect(ul.children[1].textContent).toEqual('second')
    expect(ul.children[2].textContent).toEqual('first')
  })

  it('should only display a list item for those that are defaulted to true', async () => {
    render(
      <Wrapper
        possibilities={['first', 'second', 'third']}
        defaultTrue={['first', 'second']}
      />
    )
    const ul = await screen.getByRole('list')
    expect(ul.children.length).toEqual(2)
    expect(ul.children[0].textContent).toEqual('second')
    expect(ul.children[1].textContent).toEqual('first')
  })

  it('should toggle the appearance of list items for each toggled', async () => {
    render(<Wrapper possibilities={['first', 'second', 'third']} />)
    const ul = await screen.getByRole('list')
    const input = await screen.getByRole('textbox')
    const button = await screen.getByRole('button')

    expect(ul.children.length).toEqual(3)

    fireEvent.change(input, { target: { value: 'first' } })
    fireEvent.click(button)

    expect(ul.children.length).toEqual(2)
    expect(ul.children[0].textContent).toEqual('third')
    expect(ul.children[1].textContent).toEqual('second')

    fireEvent.change(input, { target: { value: 'first' } })
    fireEvent.click(button)

    expect(ul.children.length).toEqual(3)
    expect(ul.children[0].textContent).toEqual('third')
    expect(ul.children[1].textContent).toEqual('second')
    expect(ul.children[2].textContent).toEqual('first')
  })

  it('should allow multiple items to be toggled on/off', async () => {
    render(<Wrapper possibilities={['first', 'second', 'third']} />)
    const ul = await screen.getByRole('list')
    const input = await screen.getByRole('textbox')
    const button = await screen.getByRole('button')
    expect(ul.children.length).toEqual(3)

    fireEvent.change(input, { target: { value: 'first second' } })
    fireEvent.click(button)

    expect(ul.children.length).toEqual(1)
    expect(ul.children[0].textContent).toEqual('third')

    fireEvent.change(input, { target: { value: 'first third' } })
    fireEvent.click(button)

    expect(ul.children.length).toEqual(1)
    expect(ul.children[0].textContent).toEqual('first')

    fireEvent.change(input, { target: { value: 'second third' } })
    fireEvent.click(button)
    expect(ul.children.length).toEqual(3)
    expect(ul.children[0].textContent).toEqual('third')
    expect(ul.children[1].textContent).toEqual('second')
    expect(ul.children[2].textContent).toEqual('first')
  })
})
