import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
} from "@testing-library/react";

import ShortstoriesPage from "@/pages/author/short-stories";
import { WpAllStories } from "@Types/query";
import { cover } from "../../props";

describe("short-stories page", () => {
    const sampleData: WpAllStories = {
        data: {
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
                                title: "related book A",
                                slug: "related-book-a",
                                content: "related boom A content",
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
        expect(() => render(<ShortstoriesPage {...sampleData} />));
    });

    it("should render a main heading", async () => {
        render(<ShortstoriesPage {...sampleData} />);
        const title = await screen.getByText("Short Stories");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");
    });

    it("should render a story card for every short story", async () => {
        render(<ShortstoriesPage {...sampleData} />);
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(2);
    });

    it("should render only the filtered items if a filter is applied", async () => {
        render(<ShortstoriesPage {...sampleData} />);

        await act(async () => {
            const input = await screen.findByRole("textbox");
            fireEvent.change(input, { target: { value: "october" } });

            jest.runAllTimers();

            const cards = await screen.findAllByRole("article");
            expect(cards.length).toEqual(1);
        });
    });
});
