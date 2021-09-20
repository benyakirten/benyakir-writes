import * as React from "react";
import {
    cleanup,
    render,
    screen
} from "@testing-library/react";

import CustomLink from '@Gen/CustomLink/CustomLink.component'

describe('CustomLink component', () => {
    afterEach(cleanup)

    it('should render properly', () => {
        expect(() => render(<CustomLink to="dummyroute" />)).not.toThrow()
    })

    it('should pass the to property as an href to the link element', async () => {
        render(<CustomLink to="testroute" />)
        const link = await screen.getByRole("link")
        expect(link.getAttribute("href")).toEqual("testroute")
    })

    // I'm not going to test styles here, mostly because I could not get the renderer to
    // appropriately detect the after pseudoelement.
})