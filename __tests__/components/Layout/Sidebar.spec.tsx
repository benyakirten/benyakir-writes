import React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import Sidebar from "@Layout/Sidebar/Sidebar.component";

describe('Sidebar component', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it('should render properly', () => {
        expect(() => render(<Sidebar />)).not.toThrow()
    })

    // Because this component includes the search component, none of these tests work. I'm downright angry
    // And I am not going to not use faulty testing software.

    it('should render only an arrow and the logo when the sidebar is closed and everythign else is hidden in an invisible group', async () => {
        render(<Sidebar />)
        const logo = await screen.findByRole("img")
        expect(logo).toBeTruthy()
        expect(logo.parentElement?.getAttribute("href")).toEqual("/")

        const buttons = await screen.findAllByRole("button")
        expect(buttons.length).toEqual(1)

        const arrow = buttons[0]
        expect(arrow).toBeTruthy()
        expect(arrow.textContent).toEqual("←")

        const invisibleGroup = arrow.nextElementSibling!
        expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("true")
    })

    it('should make the visible group visible if the sidebar is opened', async () => {
        render(<Sidebar />)
        const arrow = await screen.findByRole("button")

        await act(async () => {
            fireEvent.click(arrow)
    
            jest.runAllTimers()
    
            const invisibleGroup = arrow.nextElementSibling!
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")

            const buttons = await screen.findAllByRole("button")
            expect(buttons.length).toEqual(4)
        })
    })

    it('should close the sidebar if the arrow is clicked again', async () => {
        render(<Sidebar />)
        const arrow = await screen.findByRole("button")

        await act(async () => {
            fireEvent.click(arrow)
    
            jest.runAllTimers()
    
            const invisibleGroup = arrow.nextElementSibling!
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")
        })

        await act(async () => {
            fireEvent.click(arrow)

            jest.runAllTimers()
    
            const invisibleGroup = arrow.nextElementSibling!
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("true")
        })
    })

    it('should not close the sidebar if a link, textbox or button other than the arrow is clicked',async () => {
        render(<Sidebar />)
        const arrow = await screen.findByRole("button")
        
        const invisibleGroup = arrow.nextElementSibling!

        await act(async () => {
            fireEvent.click(arrow)
            jest.runAllTimers()
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")
        })

        const buttons = await screen.findAllByRole("button")

        await act(async () => {
            fireEvent.click(buttons[3])
            jest.runAllTimers()
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")
        })

        await act(async () => {
            const text = await screen.findByRole("textbox")
            fireEvent.click(text)
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")
        })

        await act(async () => {
            const links = await screen.findAllByRole("link")
            expect(links[0].textContent).toEqual("BLOG")
            fireEvent.click(links[0])
            expect(invisibleGroup.getAttribute('aria-hidden')).toEqual("false")
        })
    })
})