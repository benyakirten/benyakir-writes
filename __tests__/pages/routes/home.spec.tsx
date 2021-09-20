import * as React from 'react'
import { cleanup, render, screen } from "@testing-library/react";

import IndexPage from '@/pages';

describe('home page', () => {

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<IndexPage />)).not.toThrow()
    })

    it('should render a heading', async () => {
        render(<IndexPage />)
        const title = await screen.findByText("Welcome to Benyakir Writes")
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual('H1')
    })

    it('should render a following paragraph', async () => {
        render(<IndexPage />)
        const title = await screen.findByText("Welcome to Benyakir Writes")
        const para = title.nextElementSibling
        expect(para?.tagName).toEqual("P")
        expect(para?.textContent).toEqual("A portal into my mind: as an author, I write about the oncoming future and the way our world leads into it. As a programmer, I participate in it and embrace the wonders that our modernity can provide.")
    })

    it('should render a subtitle with another following paragraph', async () => {
        render(<IndexPage />)
        const title = await screen.findByText("To get started, click on the bar to the left.")
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual('H2')

        const para = title.nextElementSibling
        expect(para?.tagName).toEqual("P")
        expect(para?.textContent).toEqual("Inside you'll find the nav menu. From there you can read articles from my blog, about me as an author or as a programmer and web designer. Also you can unfold each subsection and directly access what you want to see.")
    })

    it('should render a final paragraph with links', async () => {
        render(<IndexPage />)
        const title = await screen.findByText("Need to contact me?")
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual('H2')

        const para = title.nextElementSibling!
        expect(para.tagName).toEqual("P")
        expect(para.textContent).toEqual("If you want to learn about what I can offer you, you can visit the contact page. Or you can send me an email at ben@benyakiredits.com.")

        const links = para.children
        expect(links[0].getAttribute('href')).toEqual("/contact")
        expect(links[1].getAttribute('href')).toEqual("mailto:ben@benyakiredits.com")
    })
})