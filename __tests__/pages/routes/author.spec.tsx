import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
    waitFor
} from "@testing-library/react";

import AuthorPage from "@/pages/author";
import { WpAuthor } from "@Types/query";
import { cover } from "../../props";

describe("blog page", () => {
    const sampleData: WpAuthor = {
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
            allWpShortstory: {
                nodes: [
                    {
                        title: "short story A",
                        content: "short story A content",
                        shortStory: {
                            publishedOn: "09/15/2019",
                            relatedBook: null,
                            relationshipToBook: null,
                        },
                    },
                    {
                        title: "short story B",
                        content: "short story B content",
                        shortStory: {
                            publishedOn: "10/15/2019",
                            relatedBook: {
                                title: "test book A",
                                slug: "test-book-a",
                                content: "test book A content",
                                book: {
                                    cover: {
                                        localFile: {
                                            childImageSharp: {
                                                gatsbyImageData: cover
                                            }
                                        }
                                    }
                                }
                            },
                            relationshipToBook: 'Preamble',
                        },
                    },
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
        expect(() => render(<AuthorPage {...sampleData} />));
    });

    it("should render a main heading", async () => {
        render(<AuthorPage {...sampleData} />);
        const title = await screen.getByText("Author");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<AuthorPage {...sampleData} />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(4);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<AuthorPage {...sampleData} />);
        const input = await screen.findByRole("textbox");

        await act(async () => {
            fireEvent.change(input, { target: { value: "test book A" } });

            jest.runAllTimers();

            const items = await screen.findAllByRole("article");
            expect(items.length).toEqual(2);

            fireEvent.change(input, { target: { value: "oct" } });
            jest.runAllTimers();
            expect(items.length).toEqual(2);
        });

        await act(async () => {
            fireEvent.change(input, { target: { value: "" } });

            jest.runAllTimers();

            const items = await screen.findAllByRole("article");
            expect(items.length).toEqual(4);
        });

        await act(async () => {
            fireEvent.change(input, { target: { value: "oct" } });

            jest.runAllTimers();

            const items = await screen.findAllByRole("article");
            expect(items.length).toEqual(2);
        });
    });
});
