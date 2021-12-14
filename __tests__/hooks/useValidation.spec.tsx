import React from "react";

import { render, fireEvent, screen, cleanup } from "@testing-library/react"
import useValidation from "@Hooks/useValidation.hook"
import { validateLength } from "@/utils/validation";

const Wrapper: React.FC = () => {
  const [val, setValue, valid] = useValidation([validateLength({ min: 2, max: 5 })])
  return (
    <div>
      <input type="text" onChange={e => setValue(e.target.value)} />
      <article>{val}</article>
      <article>{valid.toString()}</article>
    </div>
  )
}

describe('useValidation hook', () => {
  let input: HTMLInputElement
  let value: HTMLElement
  let valid: HTMLElement

  afterEach(cleanup)

  beforeEach(async () => {
    render(<Wrapper />)
    input = await screen.findByRole('textbox') as HTMLInputElement
    const articles = await screen.findAllByRole('article')
    value = articles[0]
    valid = articles[1]
  })

  it('should render what the user has input, whether or not it\'s valid', () => {
    expect(value.textContent).toEqual('')
    expect(valid.textContent).toEqual('false')

    fireEvent.change(input, { target: { value: 'abcdefgh' }})
    expect(value.textContent).toEqual('abcdefgh')
    expect(valid.textContent).toEqual('false')
  })

  it('should output true if the input is valid', () => {
    expect(value.textContent).toEqual('')
    expect(valid.textContent).toEqual('false')

    fireEvent.change(input, { target: { value: 'abcde' }})
    expect(value.textContent).toEqual('abcde')
    expect(valid.textContent).toEqual('true')
  })
})