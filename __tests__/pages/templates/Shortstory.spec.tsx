import { navigate } from "gatsby";
import * as React from "react";

import Shortstory from "@/templates/Shortstory.template";
import { cover } from "@TestProps";
import { cleanup, fireEvent, render, screen } from "@TestUtils";
import type { WpStory } from "@Types/query";

describe("shortstory template", () => {
	const stories: WpStory[] = [
		{
			data: {
				wpShortstory: {
					title: "short story A",
					content: "short story A content",
					slug: "short-story-a",
					shortStory: {
						alternateLinks: null,
						alternateLinksNames: null,
						publishedOn: "09/15/2019",
						relatedBook: null,
					},
				},
				file: {
					publicURL: "fallback-cover",
				},
			},
		},
		{
			data: {
				wpShortstory: {
					title: "short story B",
					content: "short story B content",
					slug: "short-story-b",
					shortStory: {
						alternateLinks: "https://a.com, https://b.com",
						alternateLinksNames: "A, B",
						publishedOn: "10/15/2019",
						relationshipToBook: "Preamble",
						relatedBook: {
							title: "related book A",
							content: "related book A content",
							slug: "related-book-a",
							book: {
								relatedProjectDesc: "related project A description",
								relatedProject: {
									title: "related project A",
									slug: "related-project-a",
								},
								cover: {
									localFile: {
										childImageSharp: {
											gatsbyImageData: cover,
										},
									},
								},
							},
						},
					},
				},
				file: {
					publicURL: "fallback-cover",
				},
			},
		},
		{
			data: {
				wpShortstory: {
					title: "short story C",
					content: "short story C content",
					slug: "short-story-c",
					shortStory: {
						alternateLinks: "https://a.com, https://b.com",
						alternateLinksNames: "A, B",
						publishedOn: "10/15/2019",
						relationshipToBook: "Preamble",
						relatedBook: {
							title: "related book A",
							content: "related book A content",
							slug: "related-book-a",
							book: {
								relatedProjectDesc: "related project yo",
								relatedProject: {
									title: "something",
									slug: "something",
								},
								cover: null,
							},
						},
					},
				},
				file: {
					publicURL: "fallback-cover",
				},
			},
		},
	];

	afterEach(cleanup);

	beforeEach(() => {
		(navigate as any).mockClear();
	});

	it("should render correctly", () => {
		expect(() => render(<Shortstory data={stories[0].data} />)).not.toThrow();
	});

	it("should render a heading with the title of the story", async () => {
		render(<Shortstory data={stories[0].data} />);
		const titleOne = await screen.getByText("short story A");
		expect(titleOne).toBeTruthy();
		expect(titleOne.tagName).toEqual("H1");

		cleanup();

		render(<Shortstory data={stories[1].data} />);
		const titleTwo = await screen.getByText("short story B");
		expect(titleTwo).toBeTruthy();
		expect(titleTwo.tagName).toEqual("H1");
	});

	it("should render a list item with the published date", async () => {
		render(<Shortstory data={stories[0].data} />);
		const dateOne = await screen.getByText(
			`Published on: ${new Date("09/15/2019").toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
			})}`,
		);
		expect(dateOne).toBeTruthy();

		cleanup();

		render(<Shortstory data={stories[1].data} />);
		const dateTwo = await screen.getByText(
			`Published on: ${new Date("10/15/2019").toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
			})}`,
		);
		expect(dateTwo).toBeTruthy();
	});

	describe("book", () => {
		it("should render a link to the book with some details if it exists", async () => {
			render(<Shortstory data={stories[1].data} />);
			const date = await screen.getByText(
				`Published on: ${new Date("10/15/2019").toLocaleString("en-US", {
					year: "numeric",
					month: "long",
					day: "2-digit",
				})}`,
			);

			const book = date.nextElementSibling!;
			expect(book).toBeTruthy();
			expect(book.textContent).toEqual(
				"Preamble of related book A: related book A content",
			);
			expect(book.firstElementChild!.getAttribute("href")).toEqual(
				"/book/related-book-a",
			);
		});

		it("should render the book cover if it exists", async () => {
			render(<Shortstory data={stories[1].data} />);
			const images = await screen.getAllByRole("img");
			const image = images[1];
			expect(image.tagName).toEqual("IMG");
			expect(image.tagName).toEqual("IMG");
			expect(image.getAttribute("alt")).toEqual("related book A");
			expect(image.getAttribute("data-src")).toEqual(
				cover.images.fallback?.src,
			);
			expect(image.parentElement?.tagName).toEqual("PICTURE");
		});

		it("should render a fallback cover if the book exists but the cover doesn't", async () => {
			render(<Shortstory data={stories[2].data} />);
			const images = await screen.getAllByRole("img");
			const image = images[1];
			expect(image.tagName).toEqual("IMG");
			expect(image.getAttribute("src")).toEqual("fallback-cover");
			expect(image.nextElementSibling?.tagName).toEqual("FIGCAPTION");
			expect(image.nextElementSibling?.textContent).toEqual("related book A");
			expect(image.parentElement?.tagName).toEqual("FIGURE");
		});
	});

	describe("projects", () => {
		it("should render an item to describe the related project if it exists", async () => {
			render(<Shortstory data={stories[1].data} />);
			const date = await screen.getByText(
				`Published on: ${new Date("10/15/2019").toLocaleString("en-US", {
					year: "numeric",
					month: "long",
					day: "2-digit",
				})}`,
			);
			const project = date.parentElement!.children[2];
			expect(project).toBeTruthy();
			expect(project.textContent).toEqual(
				"Related Project: related project A. related project A description",
			);
			expect(project.firstElementChild?.getAttribute("href")).toEqual(
				"/project/related-project-a",
			);
		});
	});

	describe("alternate links", () => {
		it("should render a list of buttons that navigate to the alternate links for each one that exists", async () => {
			render(<Shortstory data={stories[1].data} />);
			const subtitle = await screen.getByText("Alternate Links");
			expect(subtitle).toBeTruthy();

			const buttons = subtitle.nextElementSibling!.children;
			expect(buttons.length).toEqual(2);

			const buttonOne = buttons[0].firstElementChild!;
			expect(buttonOne?.textContent).toEqual("On A");
			fireEvent.click(buttonOne);
			expect(navigate).toHaveBeenCalledTimes(1);
			expect(navigate).toHaveBeenCalledWith("https://a.com");

			const buttonTwo = buttons[1].firstElementChild!;
			expect(buttonTwo?.textContent).toEqual("On B");
			fireEvent.click(buttonTwo);
			expect(navigate).toHaveBeenCalledTimes(2);
			expect(navigate).toHaveBeenCalledWith("https://b.com");
		});
	});

	it("should not render the above lists if alternate links, book and project do not exist", async () => {
		render(<Shortstory data={stories[0].data} />);
		const date = await screen.getByText(
			`Published on: ${new Date("09/15/2019").toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
			})}`,
		);
		expect(date.nextElementSibling).toBeNull();
	});

	it("should render a div with the story's content", async () => {
		render(<Shortstory data={stories[0].data} />);
		const subtitleOne = await screen.getByText("The Story");
		const contentOne = subtitleOne.nextElementSibling!;
		expect(contentOne.tagName).toEqual("DIV");
		expect(contentOne.textContent).toEqual("short story A content");

		cleanup();

		render(<Shortstory data={stories[1].data} />);
		const subtitleTwo = await screen.getByText("The Story");
		const contentTwo = subtitleTwo.nextElementSibling!;
		expect(contentTwo.tagName).toEqual("DIV");
		expect(contentTwo.textContent).toEqual("short story B content");
	});
});
