import * as React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { navigate } from "gatsby";

import BookCard from "@Variant/Author/BookCard/BookCard.component";
import { FlattenedBook } from "@Types/posts";

import { cover } from "../../props";

describe('BookCard component', () => {
    jest.mock("gatsby");

    const testBooks: FlattenedBook[] = [
        {
            title: "Test book title A",
            content: "Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content A",
            slug: 'test-book-a',
            cover: null,
            meta: "2019 sep september test book content a test book title a",
            project: null,
            published: {
                date: new Date('2019/09/15'),
                full: "September",
                month: 9,
                short: "SEP",
                year: 2019
            },
            purchaseLinks: [
                {
                    link: "https://www.a.com",
                    name: "A"
                },
                {
                    link: "https://www.b.com",
                    name: "B"
                }
            ],
            stories: null,
        },
        {
            title: "Test book title B",
            content: "Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B ",
            slug: 'test-book-b',
            cover,
            meta: "test story a test project desc a test project name a 2019 oct october test book content b test book title b",
            project: {
                description: 'test project desc A',
                title: 'test project name A',
                slug: 'testprojectAslug'
            },
            published: {
                date: new Date('2019/10/15'),
                full: "October",
                month: 10,
                short: "OCT",
                year: 2019
            },
            purchaseLinks: [
                {
                    link: "https://www.c.com",
                    name: "C"
                },
                {
                    link: "https://www.d.com",
                    name: "D"
                }
            ],
            stories: [
                {
                    title: 'test story A',
                    slug: 'teststorysluga'
                }
            ]
        },
        {
            title: "Test book title C",
            content: "test book C content",
            slug: 'test-book-c',
            cover: null,
            meta: "test story c test project desc c test project name c 2019 oct october test book content b test book title b",
            project: {
                description: 'test project desc B',
                title: 'test project name B',
                slug: 'testprojectaslug'
            },
            published: {
                date: new Date('2019/11/15'),
                full: "November",
                month: 11,
                short: "NOV",
                year: 2019
            },
            purchaseLinks: [
                {
                    link: "https://www.c.com",
                    name: "C"
                },
                {
                    link: "https://www.d.com",
                    name: "D"
                }
            ],
            stories: [
                {
                    title: 'test story A',
                    slug: 'teststorysluga'
                }
            ]
        }
    ]
    
    beforeEach((navigate as any).mockClear)

    afterEach(cleanup)

    it('should render correctly', () => {
        expect(() => render(<BookCard item={testBooks[0]} />)).not.toThrow()
        cleanup()
        expect(() => render(<BookCard item={testBooks[1]} />)).not.toThrow()
        cleanup()
        expect(() => render(<BookCard item={testBooks[2]} />)).not.toThrow()
    })

    it('should render a title that is a link to the slug', async () => {
        render(<BookCard item={testBooks[0]} />)
        const titleOne = await screen.getByText("Test book title A") 
        expect(titleOne.getAttribute("href")).toEqual("/book/test-book-a")

        cleanup()
        
        render(<BookCard item={testBooks[1]} />)
        const titleTwo = await screen.getByText("Test book title B") 
        expect(titleTwo.getAttribute("href")).toEqual("/book/test-book-b")
    })

    it('should render a div with the content, limited to 200 or 600 words if there is a book cover or related stories', async () => {
        render(<BookCard item={testBooks[0]} />)
        const titleOne = await screen.getByText("Test book title A") 
        const contentOne = titleOne.parentElement?.nextElementSibling!

        expect(contentOne.textContent?.indexOf("Test book content A")).not.toBe(-1)
        expect(contentOne.textContent?.length).toBeGreaterThanOrEqual(550)
        expect(contentOne.textContent?.length).toBeLessThanOrEqual(610)

        cleanup()

        render(<BookCard item={testBooks[1]} />)
        const titleTwo = await screen.getByText("Test book title B") 
        const contentTwo = titleTwo.parentElement?.nextElementSibling!

        expect(contentTwo.textContent?.indexOf("Test book content B")).not.toBe(-1)
        expect(contentTwo.textContent?.length).toBeGreaterThanOrEqual(150)
        expect(contentTwo.textContent?.length).toBeLessThanOrEqual(210)
    })

    describe("buttons", () => {
        it('should render a more information button that navigates to the book link', async () => {
            render(<BookCard item={testBooks[0]} />)
            const buttonOne = await screen.getByText("Read More")
            fireEvent.click(buttonOne)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('/book/test-book-a')

            cleanup()

            render(<BookCard item={testBooks[1]} />)
            const buttonTwo = await screen.getByText("Read More")
            fireEvent.click(buttonTwo)
            expect(navigate).toHaveBeenCalledTimes(2)
            expect(navigate).toHaveBeenCalledWith('/book/test-book-b')
        })

        it('should render a button that navigates to each purchase link', async () => {
            render(<BookCard item={testBooks[0]} />)
            const buttonOne = await screen.getByText("Read More")
            const buttonTwo = buttonOne.parentElement!.nextElementSibling!
            const buttonThree = buttonTwo.nextElementSibling!
            
            expect(buttonTwo.textContent).toEqual("On A")
            fireEvent.click(buttonTwo)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('https://www.a.com')

            expect(buttonThree.textContent).toEqual("On B")
            fireEvent.click(buttonThree)
            expect(navigate).toHaveBeenCalledTimes(2)
            expect(navigate).toHaveBeenCalledWith('https://www.b.com')
            cleanup()

            render(<BookCard item={testBooks[1]} />)
            const buttonFour = await screen.getByText("Read More")
            const buttonFive = buttonFour.parentElement!.nextElementSibling!
            const buttonSix = buttonFive.nextElementSibling!
            
            expect(buttonFive.textContent).toEqual("On C")
            fireEvent.click(buttonFive)
            expect(navigate).toHaveBeenCalledTimes(3)
            expect(navigate).toHaveBeenCalledWith('https://www.c.com')

            expect(buttonSix.textContent).toEqual("On D")
            fireEvent.click(buttonSix)
            expect(navigate).toHaveBeenCalledTimes(4)
            expect(navigate).toHaveBeenCalledWith('https://www.d.com')
        })
    })

    describe('cover or stories', () => {
        it('should render two descendents of the article row if there is a book or related stories', async () => {
            render(<BookCard item={testBooks[1]} />)
            const articleOne = await screen.getByRole("article")
            expect(articleOne.firstElementChild!.children.length).toEqual(2)

            cleanup()

            render(<BookCard item={testBooks[2]} />)
            const articleTwo = await screen.getByRole("article")
            expect(articleTwo.firstElementChild!.children.length).toEqual(2)
        })

        it('should render an image of the book cover if it exists', async () => {
            render(<BookCard item={testBooks[1]} />)
            const cover = await screen.findByRole('img')
            expect(cover.getAttribute('alt')).toEqual("Test book title B")
            const link = cover.parentElement?.parentElement?.parentElement?.parentElement!
            expect(link.getAttribute('href')).toEqual('/book/test-book-b')
        })

        it('should render a list of related stories if they do exist but the book cover doesn\'t', async () => {
            render(<BookCard item={testBooks[2]} />)
            const title = await screen.findByText("Related Short Story")

            const story = title.nextElementSibling?.firstElementChild!
            expect(story.textContent).toEqual("test story A")
            expect(story.getAttribute('href')).toEqual("/story/teststorysluga")
        })

        it('should not render any of the above if there is no cover nor related story', async () => {
            render(<BookCard item={testBooks[0]} />)
            const article = await screen.getByRole("article")
            expect(article.firstElementChild!.children.length).toEqual(1)
        })
    })
})