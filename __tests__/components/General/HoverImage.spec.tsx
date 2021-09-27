import * as React from "react";
import {
    cleanup,
    render,
    screen,
} from "@testing-library/react";

import HoverImage from "@Gen/HoverImage/HoverImage.component"
import { allIcons } from "../../props"

describe('HoverImage component', () => {
    afterEach(cleanup)

    it('should render properly', () => {
        expect(() => render(<HoverImage {...allIcons[0]} />)).not.toThrow()
    })

    it('should wrap the image in a link if the url property is set', async () => {
        render(<HoverImage {...allIcons[0]} url="https://www.google.com" />)
        const link = await screen.findByRole('link')
        expect(link.getAttribute('href')).toEqual("https://www.google.com")
    })
})