import * as React from "react";

import {
    cleanup,
    render,
    screen
} from "@TestUtils"
import CustomLink from '@Gen/CustomLink/CustomLink.component'

describe('CustomLink component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it('should render properly', () => {
        expect(() => render(<CustomLink to="dummyroute" />)).not.toThrow()
    })

    it('should pass the to property as an href to the link element', async () => {
        render(<CustomLink to="testroute" />)
        const links = await screen.getAllByRole("link")
        expect(links[1].getAttribute("href")).toEqual("testroute")
    })

    // This test does not work. I do not know why
    // The getComputedStyle gets the link's styles, not the :after element
    // it('should render the underbar when the link is hovered', async () => {
    //     render(<CustomLink to="testroute" />)
    //     const link = await screen.getByRole("link")
    //     expect(getComputedStyle(link, ':after').transform).toEqual("scale(0)")

    //     await act(() => {
    //         fireEvent.mouseOver(link)
    //         jest.runAllTimers()
    //         expect(getComputedStyle(link, ':after').transform).toEqual("scale(1)")
    //     })
    // })
})