import React from "react";
import { cleanup, fireEvent, render, screen, act } from "@testing-library/react";

import PaginateMenu from "@Layout/Paginate/PaginateMenu/PaginateMenu.component";

describe('PageinateMenu', () => {
    const leftSpy = jest.fn()
    const rightSpy = jest.fn()
    const limitSpy = jest.fn()

    const props = {
        currentPage: 0,
        maxPages: 5,
        onLeft: leftSpy,
        onRight: rightSpy,
        setLimit: limitSpy,
        limit: 4,
        disableRight: false
    }

    beforeEach(() => {
        leftSpy.mockClear()
        rightSpy.mockClear()
        limitSpy.mockClear()
    })

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<PaginateMenu {...props} />)).not.toThrow()
    })

    it('should render two buttons, a span with the current page + 1 and a textbox with the amount of items per page', async () => {
        render(<PaginateMenu {...props} />)

        const buttons = await screen.getAllByRole('button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].textContent).toEqual("➤")
        expect(buttons[1].textContent).toEqual("➤")

        const span = buttons[0].nextElementSibling!
        expect(span.textContent).toEqual("1")

        const input = await screen.getByRole("textbox") as HTMLInputElement
        expect(input.value).toEqual("4")
    })

    it('should disable the leftmost button if the current page number is zero', async () => {
        render(<PaginateMenu {...props} />)
        const buttons = await screen.getAllByRole('button')
        expect(buttons[0]).toBeDisabled()
    })

    it('should disable the rightmost button if the page number is >= the max pages prop or if the disableRight prop is true', async () => {
        const menu = render(<PaginateMenu {...props} currentPage={5} />)

        const buttons = await screen.getAllByRole('button')
        expect(buttons[1]).toBeDisabled()

        menu.rerender(<PaginateMenu {...props} currentPage={10} />)
        expect(buttons[1]).toBeDisabled()

        menu.rerender(<PaginateMenu {...props} currentPage={0} disableRight={true} />)
        expect(buttons[1]).toBeDisabled()
    })

    it('should call the onLeft function if the left arrow button is active and the onRight function if the right arrow button is active', async () => {
        render(<PaginateMenu {...props} currentPage={1} />)
        const buttons = await screen.getAllByRole('button')
        expect(buttons[0]).toBeEnabled()
        expect(buttons[1]).toBeEnabled()

        fireEvent.click(buttons[0])
        expect(leftSpy).toHaveBeenCalledTimes(1)

        fireEvent.click(buttons[1])
        expect(rightSpy).toHaveBeenCalledTimes(1)
    })

    it('should not call the onLeft or onRight functions if the buttons are disabled', async () => {
        const menu = render(<PaginateMenu {...props} currentPage={0} disableRight={true} />)
        const buttons = await screen.getAllByRole('button')
        expect(buttons[0]).toBeDisabled()
        expect(buttons[1]).toBeDisabled()

        fireEvent.click(buttons[0])
        expect(leftSpy).not.toHaveBeenCalled()

        fireEvent.click(buttons[1])
        expect(rightSpy).not.toHaveBeenCalled()

        menu.rerender(<PaginateMenu {...props} currentPage={2} maxPages={2} />)
        fireEvent.click(buttons[1])
        expect(rightSpy).not.toHaveBeenCalled()
    })

    it('should call the setLimit function if a new input value is set as long as it\'s a positive integer ', async () => {
        render(<PaginateMenu {...props} />)
        const input = await screen.getByRole("textbox") as HTMLInputElement

        fireEvent.change(input, { target: { value: '10' } })
        expect(limitSpy).toHaveBeenCalledTimes(1)
        expect(limitSpy).toHaveBeenCalledWith(10)

        fireEvent.change(input, { target: { value: 'hello' } })
        expect(limitSpy).not.toHaveBeenCalledTimes(2)

        fireEvent.change(input, { target: { value: '5.5' } })
        expect(limitSpy).not.toHaveBeenCalledTimes(2)

        fireEvent.change(input, { target: { value: '-3' } })
        expect(limitSpy).not.toHaveBeenCalledTimes(2)
    })
})