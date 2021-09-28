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
        expect(para?.textContent).toEqual("Hello stranger or welcome back. Struggling to find a better term, I call this a portal into my mind. As an author, I write about the oncoming future and how us humans face the chaos of our own making. As a programmer, I participate in it and embrace the wonders that our modernity can provide. Plus, it's not that hard to make something that looks halfway decent--let's not talk about mobile right now, okay? Sidebars are great on a tablet or desktop, but they are dangerous and need to be carefully managed on mobile.")
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
        expect(para.textContent).toEqual("If you want to learn about what I can offer you (in terms of web design or programming), you can look at my portfolio. Or you can send me an email at ben@benyakiredits.com.")

        const links = para.children
        expect(links[0].getAttribute('href')).toEqual("/portfolio")
        expect(links[1].getAttribute('href')).toEqual("mailto:ben@benyakiredits.com")
    })
})