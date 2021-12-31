import React from "react";

import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { useToggle } from "@Hooks";

const Wrapper: React.FC<{ initialValue?: boolean }> = ({ initialValue }) => {
  const [value, toggleValue] = useToggle(initialValue)
  return (
    <div>
      <article>{value ? 'true' : 'false'}</article>
      <button onClick={toggleValue} />
    </div>
  )
}

describe('useToggle hook', () => {
  it('should display a false value if the initialValue is undefined', async () => {
    render(<Wrapper />)
    const output = await screen.getByRole("article")
    expect(output.textContent).toEqual('false')
  });

  it('should display the initial value if it is specified', async () => {
    render(<Wrapper initialValue={true} />)
    const output = await screen.getByRole("article")
    expect(output.textContent).toEqual('true')
  })

  it('should allow the value to be toggled by clicking on the button', async () => {
    render(<Wrapper />)
    const output = await screen.getByRole("article")
    const button = await screen.getByRole("button")

    expect(output.textContent).toEqual('false')
    fireEvent.click(button)

    expect(output.textContent).toEqual('true')
    fireEvent.click(button)

    expect(output.textContent).toEqual('false')
  })
})