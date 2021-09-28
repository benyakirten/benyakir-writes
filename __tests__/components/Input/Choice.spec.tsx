import * as React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer'
import 'jest-styled-components'

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

    it('should change the background and text color based on the value prop', () => {
        const comp = renderer.create(<Choice label="test label" value={false} onSelect={selectSpy} />)
        const snapOne = comp.toJSON()
        expect(snapOne).toMatchSnapshot()
        expect(snapOne).toHaveStyleRule("background-color", "#343a40")
        expect(snapOne).toHaveStyleRule("color", "#FDF3D8")
        
        comp.update(<Choice label="test label" value={true} onSelect={selectSpy} />)
        const snapTwo = comp.toJSON()
        expect(snapTwo).toMatchSnapshot()
        expect(snapTwo).toHaveStyleRule("background-color", "#FDF3D8")
        expect(snapTwo).toHaveStyleRule("color", "#343a40")
    })

    it('should emit the onSelect function when it is clicked', async () => {
        render(<Choice label="test label" value={false} onSelect={selectSpy} />)
        const checkbox = await screen.findByRole("checkbox")
        fireEvent.click(checkbox)
        expect(selectSpy).toHaveBeenCalledTimes(1)
        expect(selectSpy).toHaveBeenCalledWith("test label")
    })
})