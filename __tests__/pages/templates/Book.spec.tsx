import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { navigate } from 'gatsby'

import Book from "@/templates/Book.template";
import { WpBook } from "@Types/query";
import { cover } from "../../props";

describe("book template", () => {
    const testData: WpBook[] = [
        {
            data: {
                wpBook: {
                    title: "Test Book A",
                    content: "Test book A content",
                    book: {
                        coverDesigner: "Test book cover designer",
                        coverDesignerBio: "Test book cover designer bio",
                        coverDesignerLinks:
                            "https://bio-a.com, https://bio-b.com",
                        coverDesignerLinksNames: "Bio A, Bio B",
                        publishedOn: "09/15/2019",
                        purchaseLinks: "https://buy-a.com, https://buy-b.com",
                        purchaseLinksNames: "Buy A, Buy B",
                        relatedProject: {
                            title: "Related project A",
                            slug: "related-project-a-slug",
                        },
                        relatedProjectDesc: "Related project A description",
                        relatedStories: [
                            {
                                title: "Related story A",
                                slug: "related-story-a",
                                content: "Related story A content",
                            },
                        ],
                        cover: {
                            localFile: {
                                childImageSharp: {
                                    gatsbyImageData: cover,
                                },
                            },
                        },
                    },
                },
                file: {
                    publicURL: "fallbackCover",
                },
            },
        },
        {
            data: {
                wpBook: {
                    title: "Test Book B",
                    content: "Test book B content",
                    book: {
                        coverDesigner: null,
                        coverDesignerBio: null,
                        coverDesignerLinks: null,
                        coverDesignerLinksNames: null,
                        publishedOn: "10/15/2019",
                        purchaseLinks: "https://buy-a.com, https://buy-b.com",
                        purchaseLinksNames: "Buy A, Buy B",
                        relatedProject: null,
                        relatedStories: null,
                        cover: null,
                    },
                },
                file: {
                    publicURL: "fallbackCover",
                },
            },
        },
    ];

    jest.mock("gatsby");

    beforeEach(() => {
        (navigate as any).mockClear();
    })

    afterEach(cleanup);

    it("should render correctly", () => {
        render(<Book data={testData[0].data} />);
    });

    it("should render a heading element with the title of the book", async () => {
        render(<Book data={testData[0].data} />);
        const titleOne = await screen.findAllByText("Test Book A");
        expect(titleOne).toBeTruthy();
        expect(titleOne.length).toEqual(1);
        expect(titleOne[0].tagName).toEqual("H1");

        const cover = await screen.findByRole("img");
        expect(cover.getAttribute("alt")).toEqual("Test Book A");

        cleanup();

        render(<Book data={testData[1].data} />);
        const titlesTwo = await screen.findAllByText("Test Book B");
        expect(titlesTwo).toBeTruthy();
        expect(titlesTwo.length).toEqual(2);
        expect(titlesTwo[0].tagName).toEqual("H1");
        expect(titlesTwo[1].tagName).toEqual("FIGCAPTION");
    });

    describe("the cover", () => {
        it("should render a gatsby image with the book cover if the book has one", async () => {
            render(<Book data={testData[0].data} />);
            const coverOne = await screen.findByRole("img");
            expect(coverOne.tagName).toEqual("IMG");
            expect(coverOne.getAttribute("alt")).toEqual("Test Book A");
            expect(coverOne.getAttribute("data-src")).toEqual(
                cover.images.fallback?.src
            );
            expect(coverOne.parentElement?.tagName).toEqual("PICTURE");
        });

        it("should render a fallback image if the book has no cover", async () => {
            render(<Book data={testData[1].data} />);
            const coverTwo = await screen.findByRole("img");
            expect(coverTwo.tagName).toEqual("IMG");
            expect(coverTwo.getAttribute("src")).toEqual("fallbackCover");
            expect(coverTwo.nextElementSibling?.tagName).toEqual("FIGCAPTION");
            expect(coverTwo.nextElementSibling?.textContent).toEqual(
                "Test Book B"
            );
            expect(coverTwo.parentElement?.tagName).toEqual("FIGURE");
        });
    });

    it("should render the published on date", async () => {
        render(<Book data={testData[0].data} />);
        const dateOne = await screen.getByText(
            `Published on: ${new Date("09/15/2019").toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}`
        );
        expect(dateOne).toBeTruthy();

        cleanup();

        render(<Book data={testData[1].data} />);
        const dateTwo = await screen.getByText(
            `Published on: ${new Date("10/15/2019").toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}`
        );
        expect(dateTwo).toBeTruthy();
    });

    it("should render a list with the cover designer's name and info underneath the date if they are present", async () => {
        render(<Book data={testData[0].data} />);
        const date = await screen.getByText(
            `Published on: ${new Date("09/15/2019").toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}`
        );

        const siblingList = date.nextElementSibling!;
        expect(siblingList.tagName).toEqual("UL");
        expect(siblingList.firstChild?.firstChild?.textContent).toEqual(
            "Cover designer: Test book cover designer"
        );
        expect(siblingList.children[1].textContent).toEqual(
            "Test book cover designer bio"
        );

        const coverDesignerLinks = [
            siblingList.children[2],
            siblingList.children[3],
        ];
        expect(
            coverDesignerLinks[0].firstChild?.firstChild?.textContent
        ).toEqual("Bio A");
        expect(
            coverDesignerLinks[0].firstElementChild?.getAttribute("href")
        ).toEqual("https://bio-a.com");

        expect(
            coverDesignerLinks[1].firstChild?.firstChild?.textContent
        ).toEqual("Bio B");
        expect(
            coverDesignerLinks[1].firstElementChild?.getAttribute("href")
        ).toEqual("https://bio-b.com");
    });

    it("should render another list following the cover designer if there is a project with a link and its details", async () => {
        render(<Book data={testData[0].data} />);
        const date = await screen.getByText(
            `Published on: ${new Date("09/15/2019").toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}`
        );

        const projectList = date.parentElement?.children[2]!;
        expect(projectList).toBeTruthy();
        expect(projectList.tagName).toEqual("UL");

        const projectLink =
            projectList.firstElementChild?.firstElementChild
                ?.firstElementChild!;
        expect(projectLink.tagName).toEqual("A");
        expect(projectLink.textContent).toEqual(
            "Related Project: Related project A"
        );
        expect(projectLink?.getAttribute("href")).toEqual(
            "/project/related-project-a-slug"
        );

        expect(projectList.children[1].textContent).toEqual(
            "Related project A description"
        );
    });

    it("should not render either items of above lists if there is no cover designer nor any project", async () => {
        render(<Book data={testData[1].data} />);
        const date = await screen.getByText(
            `Published on: ${new Date("10/15/2019").toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            })}`
        );
        expect(date.nextElementSibling).toBeNull();
    });

    it("should render a list of purchase links", async () => {
        render(<Book data={testData[0].data} />);
        const purchaseLinks = await screen.getByText("Purchase Links")
        const buttons = purchaseLinks.nextElementSibling!.children
        
        expect(buttons[0].textContent).toEqual("On Buy A")
        fireEvent.click(buttons[0])
        expect(navigate).toHaveBeenCalledTimes(1)
        expect(navigate).toHaveBeenCalledWith("https://buy-a.com")

        expect(buttons[1].textContent).toEqual("On Buy B")
        fireEvent.click(buttons[1])
        expect(navigate).toHaveBeenCalledTimes(2)
        expect(navigate).toHaveBeenCalledWith("https://buy-b.com")
    });

    it('should render a list of stories that link to their slugs with a div under that explains their content if there are related stories', async () => {
        render(<Book data={testData[0].data} />);
        const storiesLead = await screen.getByText("Related Stories")
        expect(storiesLead.tagName).toEqual('H3')

        const storyLink = storiesLead.nextElementSibling?.firstElementChild!
        expect(storyLink.tagName).toEqual('A')
        expect(storyLink.getAttribute('href')).toEqual("/story/related-story-a")

        const storyContent = storiesLead.nextElementSibling?.nextElementSibling!

        expect(storyContent.tagName).toEqual("DIV")
        expect(storyContent.textContent).toEqual("Related story A content")
    })

    it('should not render any of the above content if there are no related stories', () => {
        render(<Book data={testData[1].data} />);
        expect(() => screen.getByText("Related Stories")).toThrow()
    })
});
