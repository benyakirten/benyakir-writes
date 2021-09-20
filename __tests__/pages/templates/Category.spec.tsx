import React from "react";
import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";

import CategoryTemplate from "@/templates/Category.template";
import { WpPostByCategory } from "@Types/query";

describe("category template", () => {
    const testData: WpPostByCategory[] = [
        {
            data: {
                allWpPost: {
                    nodes: [],
                },
            },
            pageContext: {
                name: "category A",
            },
        },
        {
            data: {
                allWpPost: {
                    nodes: [
                        {
                            title: "blog post A",
                            slug: "blog-post-a",
                            excerpt: "blog post A excerpt",
                            date: "2019/09/15",
                            content: "blog post A content",
                            categories: { nodes: null },
                            tags: { nodes: null },
                        },
                        {
                            title: "blog post B",
                            slug: "blog-post-b",
                            excerpt: "blog post B excerpt",
                            date: "2019/10/15",
                            content: "blog post B content",
                            categories: { nodes: null },
                            tags: { nodes: null },
                        },
                    ],
                },
            },
            pageContext: {
                name: "category B",
            },
        },
    ];

    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
        cleanup()
    })

    it("should render correctly", () => {
        expect(() => render(<CategoryTemplate {...testData[0]} />)).not.toThrow()
        cleanup()
        expect(() => render(<CategoryTemplate {...testData[1]} />)).not.toThrow()
    });

    it('should render a boilerplate if there are no blog posts for the category', async () => {
        render(<CategoryTemplate {...testData[0]} />)

        const title = await screen.findByText('No posts exist')
        expect(title).toBeTruthy()
        expect(title.tagName).toEqual('H1')

        const para = title.nextElementSibling!
        expect(para.tagName).toEqual("P")
        expect(para.textContent).toEqual("For the category category A, at least. Maybe you want to check out the general blog page instead?")

        expect(para.firstElementChild?.getAttribute('href')).toEqual("/blog")
    })

    it('should render a header with the category name if it exists', async () => {
        render(<CategoryTemplate {...testData[1]} />)

        const title = await screen.findByText('category B')
        expect(title.tagName).toEqual('H1')

        const posts = await screen.findAllByRole('article')
        expect(posts.length).toEqual(2)
    })

    it('should render only the filtered items if there is a filter applied', async () => {
        render(<CategoryTemplate {...testData[1]} />)

        await act(async () => {
            const input = await screen.findByRole("textbox")
            fireEvent.change(input, { target: { value: 'september'} })

            jest.runAllTimers()
            
            const posts = await screen.findAllByRole('article')
            expect(posts.length).toEqual(1)
        })
    })
});
