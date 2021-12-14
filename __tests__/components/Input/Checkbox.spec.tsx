import * as React from "react";

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import Checkbox from "@Input/Checkbox/Checkbox.component"

describe('Checkbox component', () => {
    const toggleSpy = jest.fn()

    beforeEach(() => {
        toggleSpy.mockClear()
    })

    afterEach(cleanup)

    it('should render properly', () => {
        expect(() => render(<Checkbox value={false} onToggle={toggleSpy} label="test-label" name="test name" />)).not.toThrow()
    })

    it('should render a checkbox with its checked value equal to the value prop', async () => {
        render(<Checkbox value={false} onToggle={toggleSpy} label="test label" name="test-name" />)
        const labelOne = await screen.getByText("test label")
        const inputOne = labelOne.parentElement?.firstElementChild! as HTMLInputElement
        expect(inputOne.checked).toEqual(false)

        cleanup()

        render(<Checkbox value={true} onToggle={toggleSpy} label="test label" name="test-name" />)
        const labelTwo = await screen.getByText("test label")
        const inputTwo = labelTwo.parentElement?.firstElementChild! as HTMLInputElement
        expect(inputTwo.checked).toEqual(true)
    })

    it('should render a checkbox that is labelled by a span', async () => {
        render(<Checkbox value={false} onToggle={toggleSpy} label="test label" name="test-name" />)
        const label = await screen.getByText("test label")
        expect(label.id).toEqual("label-test-name")
        const input = label.parentElement?.firstElementChild!
        expect(input.getAttribute("aria-labelledby")).toEqual("label-test-name")
    })

    it('should trigger the the onToggle function with the opposite of value if the label or span is clicked on', async () => {
        render(<Checkbox value={false} onToggle={toggleSpy} label="test label" name="test-name" />)
        const label = await screen.getByText("test label")
        const span = label.parentElement?.firstElementChild!

        fireEvent.click(label)
        expect(toggleSpy).toHaveBeenCalledTimes(1)
        expect(toggleSpy).toHaveBeenCalledWith(true)

        fireEvent.click(span)
        expect(toggleSpy).toHaveBeenCalledTimes(2)
        expect(toggleSpy).toHaveBeenCalledWith(true)
    })
})