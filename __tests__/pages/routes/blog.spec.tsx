import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import BlogPage from "@/pages/blog";
import { cover } from "../../props";
import { AllWpPost } from "@Types/query";

describe("blog page", () => {
    const sampleData: AllWpPost = {
        data: {
            allWpPost: {
                nodes: [
                    {
                        title: 'blog post title A',
                        slug: 'blogpostaslug',
                        date: '2019/09/15',
                        excerpt: "blog post title A excerpt",
                        content: "blog post title A content",
                        categories: {
                            nodes: null
                        },
                        tags: {
                            nodes: null
                        }
                    },
                    {
                        title: 'blog post title B',
                        slug: 'blogpostbslug',
                        excerpt: "blog post title B excerpt",
                        content: "blog post title B content",
                        date: '2019/10/15',
                        categories: {
                            nodes: [
                                {
                                    name: 'cat A'
                                },
                                {
                                    name: 'cat B'
                                }
                            ]
                        },
                        tags: {
                            nodes: [
                                {
                                    name: 'tag A'
                                },
                                {
                                    name: 'tag B'
                                }
                            ]
                        }
                    }
                ]
            },
        },
    };

    jest.mock("gatsby")

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it("should render correctly", () => {
        expect(() => render(<BlogPage {...sampleData} />));
    });

    it("should render a main heading", async () => {
        render(<BlogPage {...sampleData} />);
        const title = await screen.getByText("Blog Posts");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<BlogPage {...sampleData} />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(2);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<BlogPage {...sampleData} />);

        await act(async () => {
            const input = await screen.findByRole("textbox");
            fireEvent.change(input, { target: { value: "october" } });

            jest.runAllTimers();

            const posts = await screen.findAllByRole("article");
            expect(posts.length).toEqual(1);
        });
    });
});
