import * as React from "react";
import 'jest-styled-components'

import { render, cleanup, screen, fireEvent } from "@TestUtils";
import MultipleChoice from "@Input/MultipleChoice/MultipleChoice.component"

describe('MultipleChoice component', () => {
    const testChoices: PotentialChoice[] = [
        {
            value: "test val A",
            selected: true
        },
        {
            value: "test val B",
            selected: true
        },
        {
            value: "test val C",
            selected: true
        },
        {
            value: "test val D",
            selected: true
        },
    ]
    const selectSpy = jest.fn()

    beforeEach(selectSpy.mockClear)

    afterEach(cleanup)
    
    it('should render propertly', () => {
        expect(() => render(<MultipleChoice choices={testChoices} onSelect={selectSpy} />))
    })

    it('should render a choice for every item in the choices prop', async () => {
        render(<MultipleChoice choices={testChoices} onSelect={selectSpy} />)
        const choices = await screen.findAllByRole('checkbox')
        expect(choices.length).toEqual(4)

        fireEvent.click(choices[0])

        expect(selectSpy).toHaveBeenCalledTimes(1)
        expect(selectSpy).toHaveBeenCalledWith([
            {
                value: "test val A",
                selected: false
            },
            {
                value: "test val B",
                selected: true
            },
            {
                value: "test val C",
                selected: true
            },
            {
                value: "test val D",
                selected: true
            }
        ])

        fireEvent.click(choices[1])
        expect(selectSpy).toHaveBeenCalledTimes(2)
        expect(selectSpy).toHaveBeenCalledWith([
            {
                value: "test val A",
                selected: true
            },
            {
                value: "test val B",
                selected: false
            },
            {
                value: "test val C",
                selected: true
            },
            {
                value: "test val D",
                selected: true
            }
        ])

        fireEvent.click(choices[2])
        expect(selectSpy).toHaveBeenCalledTimes(3)
        expect(selectSpy).toHaveBeenCalledWith([
            {
                value: "test val A",
                selected: true
            },
            {
                value: "test val B",
                selected: true
            },
            {
                value: "test val C",
                selected: false
            },
            {
                value: "test val D",
                selected: true
            }
        ])

        fireEvent.click(choices[3])
        expect(selectSpy).toHaveBeenCalledTimes(4)
        expect(selectSpy).toHaveBeenCalledWith([
            {
                value: "test val A",
                selected: true
            },
            {
                value: "test val B",
                selected: true
            },
            {
                value: "test val C",
                selected: true
            },
            {
                value: "test val D",
                selected: false
            }
        ])
    })
})