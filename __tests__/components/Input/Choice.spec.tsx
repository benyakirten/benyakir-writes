import * as React from "react";
import 'jest-styled-components'

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import Choice from "@Input/MultipleChoice/Choice/Choice.component"

describe('Choice component', () => {
    const selectSpy = jest.fn()

    beforeEach(() => {
        selectSpy.mockClear()
    })

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<Choice label="test label" value={false} onSelect={selectSpy} />)).not.toThrow()
    })

    it('should render a div with a role of checkbox that\'s labelled by a span', async () => {
        render(<Choice label="test label" value={false} onSelect={selectSpy} />)
        const checkbox = await screen.findByRole("checkbox")
        expect(checkbox.getAttribute("aria-labelledby")).toEqual("test label-label")
        const label = checkbox.firstElementChild!
        expect(label.id).toEqual("test label-label")
    })

    it('should emit the onSelect function when it is clicked', async () => {
        render(<Choice label="test label" value={false} onSelect={selectSpy} />)
        const checkbox = await screen.findByRole("checkbox")
        fireEvent.click(checkbox)
        expect(selectSpy).toHaveBeenCalledTimes(1)
        expect(selectSpy).toHaveBeenCalledWith("test label")
    })
})