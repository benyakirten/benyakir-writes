import * as React from 'react'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'

import { useLookup } from '@Hooks'

const LookupTest: React.FC = () => {
  const [state, dispatch] = useLookup({
    item: true,
  })

  function deactivate() {
    dispatch({ type: 'DEACTIVATE', payload: 'item' })
  }
  function activate() {
    dispatch({ type: 'ACTIVATE', payload: 'item' })
  }
  function toggle() {
    dispatch({ type: 'TOGGLE', payload: 'item' })
  }

  return (
    <>
      <button title="deactivate" onClick={deactivate}>
        Deactivate Item
      </button>
      <button title="activate" onClick={activate}>
        Activate Item
      </button>
      <button title="toggle" onClick={toggle}>
        Toggle
      </button>
      <div title="output">{state['item'].toString()}</div>
    </>
  )
}

describe('useLookup hook', () => {
  let deactivateButton: HTMLButtonElement
  let activateButton: HTMLButtonElement
  let toggleButton: HTMLButtonElement
  let output: HTMLDivElement

  beforeEach(async () => {
    render(<LookupTest />)
    deactivateButton = (await screen.findByTitle(
      'deactivate'
    )) as HTMLButtonElement
    activateButton = (await screen.findByTitle('activate')) as HTMLButtonElement
    toggleButton = (await screen.findByTitle('toggle')) as HTMLButtonElement
    output = (await screen.findByTitle('output')) as HTMLDivElement
  })

  afterEach(cleanup)

  it('should render the designated item false if the deactivated dispatch type is called', () => {
    expect(output).toHaveTextContent('true')
    fireEvent.click(deactivateButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(deactivateButton)
    expect(output).toHaveTextContent('false')
  })

  it('should render the designated item true if it is first false then the activate dispatch type is called', () => {
    expect(output).toHaveTextContent('true')
    fireEvent.click(deactivateButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(activateButton)
    expect(output).toHaveTextContent('true')
    fireEvent.click(activateButton)
    expect(output).toHaveTextContent('true')
  })

  it('should toggle the value of the designated item if the toggle method dispatch type is called', () => {
    expect(output).toHaveTextContent('true')
    fireEvent.click(toggleButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(toggleButton)
    expect(output).toHaveTextContent('true')
    fireEvent.click(toggleButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(toggleButton)
    expect(output).toHaveTextContent('true')
  })

  it('should allow all three functionalities if they are used intermittently', () => {
    expect(output).toHaveTextContent('true')
    fireEvent.click(deactivateButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(activateButton)
    expect(output).toHaveTextContent('true')
    fireEvent.click(toggleButton)
    expect(output).toHaveTextContent('false')
    fireEvent.click(activateButton)
    expect(output).toHaveTextContent('true')
    fireEvent.click(deactivateButton)
    expect(output).toHaveTextContent('false')
  })
})
