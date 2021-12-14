import * as React from "react";

import { cleanup, render, screen, act, fireEvent } from "@TestUtils";
import ProjectsPage from "@/pages/portfolio";

describe("portfolio page", () => {

    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
        cleanup()
    })

    it("should render correctly", () => {
        expect(() => render(<ProjectsPage />))
    });

    it('should render a main heading', async () => {
        render(<ProjectsPage />)
        const title = await screen.getByText("Projects")
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual("H1")
    })

    it('should render a project card for every project in the query', async () => {
        render(<ProjectsPage />)
        const cards = await screen.findAllByRole("article")
        expect(cards.length).toEqual(2)
    })

    it('should render only the filtered items if a filter is applied', async () => {
        render(<ProjectsPage />)

        await act(async () => {
            const input = await screen.findAllByRole("textbox")
            fireEvent.change(input[0], { target: { value: 'svelte'} })

            jest.runAllTimers()
            
            const projects = await screen.findAllByRole('article')
            expect(projects.length).toEqual(1)
        })
    })
});
