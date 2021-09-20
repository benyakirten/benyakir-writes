import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import BooksPage from "@/pages/author/books";
import { cover } from "../../props";
import { WpAllBooks } from "@Types/query";

describe("books page", () => {
    const sampleData: WpAllBooks = {
        data: {
            allWpBook: {
                nodes: [
                    {
                        title: "test book A",
                        slug: "test-book-a",
                        content: "test book A content",
                        book: {
                            purchaseLinks: "https://a.com, https://b.com",
                            purchaseLinksNames: "A, B",
                            publishedOn: "09/15/2019",
                            cover: {
                                localFile: {
                                    childImageSharp: {
                                        gatsbyImageData: cover
                                    }
                                }
                            },
                            relatedStories: [
                                {
                                    title: "related story A",
                                    slug: "related-story-a"
                                }
                            ],
                            relatedProjectDesc: "related project A relation",
                            relatedProject: {
                                title: "related project A",
                                slug: "related-project-a"
                            }

                        }
                    },
                    {
                        title: "test book B",
                        slug: "test-book-b",
                        content: "test book B content",
                        book: {
                            purchaseLinks: "https://c.com, https://d.com",
                            purchaseLinksNames: "C, D",
                            publishedOn: "10/15/2019",
                            cover: null,
                            relatedStories: null,
                            relatedProject: null
                        }
                    }
                ],
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
        expect(() => render(<BooksPage {...sampleData} />));
    });

    it("should render a main heading", async () => {
        render(<BooksPage {...sampleData} />);
        const title = await screen.getByText("Books");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<BooksPage {...sampleData} />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(2);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<BooksPage {...sampleData} />);

        await act(async () => {
            const input = await screen.findByRole("textbox");
            fireEvent.change(input, { target: { value: "october" } });

            jest.runAllTimers();

            const cards = await screen.findAllByRole("article");
            expect(cards.length).toEqual(1);
        });
    });
});
