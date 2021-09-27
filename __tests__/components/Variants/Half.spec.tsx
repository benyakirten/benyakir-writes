import * as React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { navigate } from "gatsby";

import Half from "@Variant/Author/Half/Half.component";
import BookCard from "@Variant/Author/BookCard/BookCard.component";
import StoryCard from "@Variant/Author/StoryCard/StoryCard.component";

import { FlattenedBook, FlattenedStory } from "@Types/posts";

import { cover } from "../../props";

describe("Half component", () => {
    jest.mock("gatsby");

    const testBooks: FlattenedBook[] = [
        {
            title: "Test book title A",
            content:
                "Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content A Test book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content ATest book content A",
            slug: "test-book-a",
            cover: null,
            meta: "2019 sep september test book content a test book title a",
            project: null,
            published: {
                date: new Date("2019/09/15"),
                full: "September",
                month: 9,
                short: "SEP",
                year: 2019,
            },
            purchaseLinks: [
                {
                    link: "https://www.a.com",
                    name: "A",
                },
                {
                    link: "https://www.b.com",
                    name: "B",
                },
            ],
            stories: null,
        },
        {
            title: "Test book title B",
            content:
                "Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B Test book content B ",
            slug: "test-book-b",
            cover,
            meta: "test story a test project desc a test project name a 2019 oct october test book content b test book title b",
            project: {
                description: "test project desc A",
                title: "test project name A",
                slug: "testprojectAslug",
            },
            published: {
                date: new Date("2019/10/15"),
                full: "October",
                month: 10,
                short: "OCT",
                year: 2019,
            },
            purchaseLinks: [
                {
                    link: "https://www.c.com",
                    name: "C",
                },
                {
                    link: "https://www.d.com",
                    name: "D",
                },
            ],
            stories: [
                {
                    title: "test story A",
                    slug: "teststorysluga",
                },
            ],
        }
    ];

    const testStories: FlattenedStory[] = [
        {
            title: "story A",
            content: `story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content story A content`,
            slug: "story-a",
            published: {
                date: new Date("09/15/2019"),
                short: "SEP",
                full: "September",
                month: 9,
                year: 2019,
            },
            book: null,
            meta: "2019 sep september story A content a story A title",
        },
        {
            title: "story B",
            content:
                "story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content story B content",
            slug: "story-b",
            published: {
                date: new Date("10/15/2019"),
                short: "OCT",
                full: "October",
                month: 10,
                year: 2019,
            },
            book: {
                title: "book A",
                slug: "book-a",
                content: "book A content",
                relationship: "Preamble",
                cover: null,
            },
            meta: "test story b test project desc b test project name b 2019 oct october test book content b test book title b",
        },
        {
            title: "story C",
            content:
                "story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content story C content",
            slug: "story-c",
            published: {
                date: new Date("11/15/2019"),
                short: "NOV",
                full: "November",
                month: 11,
                year: 2019,
            },
            book: {
                title: "book B",
                slug: "book-b",
                content: "book B content",
                relationship: "Forestory",
                cover,
            },
            meta: "test story b test project desc b test project name b 2019 oct october test book content b test book title b",
        },
    ];

    beforeEach((navigate as any).mockClear);

    afterEach(cleanup);

    it("should render correctly", () => {
        expect(() =>
            render(<Half items={testStories} El={StoryCard} />)
        ).not.toThrow();
        cleanup();
        expect(() =>
            render(<Half items={testBooks} El={BookCard} />)
        ).not.toThrow();
    });

    it("should render a StoryCard or BookCard for every one of them passed in as a prop", async () => {
        render(<Half items={testStories} El={StoryCard} />);
        const stories = await screen.findAllByRole("article");
        expect(stories.length).toEqual(3);

        cleanup();

        render(<Half items={testBooks} El={BookCard} />);
        const books = await screen.findAllByRole("article");
        expect(books.length).toEqual(2);
    });
});
