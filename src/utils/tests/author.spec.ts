import { describe, it, expect } from "vitest";

import * as author from "@/utils/author";
import type {
	BookType,
	FlattenedBook,
	FlattenedStory,
	SingleBook,
	SingleStory,
	StoryType,
} from "@Types/posts";

describe("author util", () => {
	describe("books", () => {
		const dummyQueryBooks: BookType[] = [
			{
				title: "Test book title A",
				content: "Test book content A",
				book: {
					purchaseLinks: "https://www.a.com, https://www.b.com",
					purchaseLinksNames: "A, B",
					publishedOn: "09/15/2019",
					cover: null,
					relatedStories: null,
					relatedProject: null,
				},
			},
			{
				title: "Test book title B",
				content: "Test book content B",
				book: {
					relatedProjectDesc: "test project desc A",
					purchaseLinks: "https://www.c.com, https://www.d.com",
					purchaseLinksNames: "C, D",
					publishedOn: "10/15/2019",
					cover: {
						localFile: {
							childImageSharp: {
								// biome-ignore lint/suspicious/noExplicitAny: <explanation>
								gatsbyImageData: { test: "test" } as any,
							},
						},
					},
					relatedStories: [
						{
							title: "test story A",
							slug: "teststorysluga",
						},
					],
					relatedProject: {
						slug: "testprojectAslug",
						title: "test project name A",
					},
				},
				slug: "testslug",
			},
		];

		const formattedBooks: FlattenedBook[] = [
			{
				content: "Test book content A",
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
				slug: undefined,
				stories: null,
				title: "Test book title A",
			},
			{
				content: "Test book content B",
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				cover: { test: "test" } as any,
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
				slug: "testslug",
				stories: [
					{
						title: "test story A",
						slug: "teststorysluga",
					},
				],
				title: "Test book title B",
			},
		];

		describe("createMetaforBook", () => {
			it("should give known results for known inputs", () => {
				const bookOne = formattedBooks[0];
				const resultOne = author.createMetaForBook(bookOne).split(" ");
				expect(resultOne.length).toEqual(11);
				expect(resultOne[0]).toEqual(bookOne.published.year.toString());
				expect(resultOne[1]).toEqual(bookOne.published.short.toLowerCase());
				expect(resultOne[2]).toEqual(bookOne.published.full.toLowerCase());
				expect(resultOne.slice(3, 7).join(" ")).toEqual(
					bookOne.content.toLowerCase(),
				);
				expect(resultOne.slice(7, 11).join(" ")).toEqual(
					bookOne.title.toLowerCase(),
				);

				const bookTwo = formattedBooks[1];
				const resultTwo = author.createMetaForBook(bookTwo).split(" ");
				expect(resultTwo.length).toEqual(22);
				expect(resultTwo.slice(0, 3).join(" ")).toEqual(
					// @ts-ignore
					bookTwo.stories[0].title.toLowerCase(),
				);
				expect(resultTwo.slice(3, 7).join(" ")).toEqual(
					// @ts-ignore
					bookTwo.project?.description.toLowerCase(),
				);
				expect(resultTwo.slice(7, 11).join(" ")).toEqual(
					// @ts-ignore
					bookTwo.project.title.toLowerCase(),
				);
				expect(resultTwo[11]).toEqual(bookTwo.published.year.toString());
				expect(resultTwo[12]).toEqual(bookTwo.published.short.toLowerCase());
				expect(resultTwo[13]).toEqual(bookTwo.published.full.toLowerCase());
				expect(resultTwo.slice(14, 18).join(" ")).toEqual(
					bookTwo.content.toLowerCase(),
				);
				expect(resultTwo.slice(18, 22).join(" ")).toEqual(
					bookTwo.title.toLowerCase(),
				);
			});
		});

		describe("formatBook", () => {
			it("should process the book in a particular way", () => {
				const bookOne = dummyQueryBooks[0];
				const resultOne = author.formatBook(bookOne);
				expect(resultOne.content).toEqual(bookOne.content);
				expect(resultOne.title).toEqual(bookOne.title);
				expect(resultOne.published).toEqual({
					date: new Date("2019/09/15"),
					full: "September",
					month: 9,
					short: "SEP",
					year: 2019,
				});
				expect(resultOne.cover).toEqual(null);
				expect(resultOne.project).toEqual(null);
				expect(resultOne.stories).toEqual(null);
				expect(resultOne.meta).toEqual(
					"2019 sep september test book content a test book title a",
				);
				expect(resultOne.purchaseLinks).toEqual([
					{
						link: "https://www.a.com",
						name: "A",
					},
					{
						link: "https://www.b.com",
						name: "B",
					},
				]);

				const bookTwo = dummyQueryBooks[1];
				const resultTwo = author.formatBook(bookTwo);
				expect(resultTwo.content).toEqual(bookTwo.content);
				expect(resultTwo.title).toEqual(bookTwo.title);
				expect(resultTwo.published).toEqual({
					date: new Date("2019/10/15"),
					full: "October",
					short: "OCT",
					year: 2019,
					month: 10,
				});
				expect(resultTwo.cover).toEqual(
					bookTwo.book.cover?.localFile.childImageSharp.gatsbyImageData,
				);
				expect(resultTwo.slug).toEqual(bookTwo.slug);

				const names = bookTwo.book.purchaseLinksNames.split(", ");
				const links = bookTwo.book.purchaseLinks.split(", ");
				const purchaseLinks = links.map((l, idx) => ({
					link: l,
					name: names && names.length > idx ? names[idx] : l,
				}));
				expect(resultTwo.purchaseLinks).toEqual(purchaseLinks);
				expect(resultTwo.project).toEqual({
					title: bookTwo.book.relatedProject?.title,
					slug: bookTwo.book.relatedProject?.slug,
					description: bookTwo.book.relatedProjectDesc,
				});
				expect(resultTwo.meta).toEqual(
					"test story a test project desc a test project name a 2019 oct october test book content b test book title b",
				);
			});

			it("should give known results for known inputs", () => {
				const resultOne = author.formatBook(dummyQueryBooks[0]);
				const resultTwo = author.formatBook(dummyQueryBooks[1]);

				expect(resultOne).toEqual(formattedBooks[0]);
				expect(resultTwo).toEqual(formattedBooks[1]);
			});
		});

		describe("formatAllBooks", () => {
			it("should give known results for known inputs and organize them by the most recent date", () => {
				const results = author.formatAllBooks(dummyQueryBooks);
				expect(results[0]).toEqual(formattedBooks[1]);
				expect(results[1]).toEqual(formattedBooks[0]);
			});
		});

		describe("flattenBook", () => {
			const singleBooks: SingleBook[] = [
				{
					title: "Test book title A",
					content: "Test book content A",
					book: {
						coverDesigner: null,
						coverDesignerBio: null,
						coverDesignerLinks: null,
						coverDesignerLinksNames: null,
						purchaseLinks: "https://www.a.com, https://www.b.com",
						purchaseLinksNames: "A, B",
						publishedOn: "09/15/2019",
						cover: null,
						relatedStories: null,
						relatedProject: null,
					},
				},
				{
					title: "Test book title B",
					content: "Test book content B",
					book: {
						coverDesigner: "designer a",
						coverDesignerBio: "designer bio a",
						coverDesignerLinks: "https://link1.com, https://link2.com",
						coverDesignerLinksNames: "Link 1, Link 2",
						relatedProjectDesc: "test project desc A",
						purchaseLinks: "https://www.c.com, https://www.d.com",
						purchaseLinksNames: "C, D",
						publishedOn: "10/15/2019",
						cover: {
							localFile: {
								childImageSharp: {
									// @ts-ignore
									gatsbyImageData: { test: "test" },
								},
							},
						},
						relatedStories: [
							{
								title: "test story A",
								slug: "teststorysluga",
								content: "test story content A",
							},
						],
						relatedProject: {
							slug: "testprojectAslug",
							title: "test project name A",
						},
					},
				},
			];
			it("should give known results for known inputs", () => {
				const bookOne = singleBooks[0];
				const resultOne = author.flattenBook(bookOne, "fallbackcover1");
				expect(resultOne.content).toEqual(bookOne.content);
				expect(resultOne.title).toEqual(bookOne.title);
				expect(resultOne.coverDesigner).toEqual(undefined);
				expect(resultOne.project).toEqual(null);
				expect(resultOne.published).toEqual<DateInformation>({
					full: "September",
					short: "SEP",
					date: new Date("2019/09/15"),
					month: 9,
					year: 2019,
				});
				expect(resultOne.purchaseLinks).toEqual([
					{
						link: "https://www.a.com",
						name: "A",
					},
					{
						link: "https://www.b.com",
						name: "B",
					},
				]);
				expect(resultOne.fallbackCover).toEqual("fallbackcover1");
				expect(resultOne.project).toEqual(null);
				expect(resultOne.stories).toEqual(null);

				const bookTwo = singleBooks[1];
				const resultTwo = author.flattenBook(bookTwo, "fallbackcover2");
				expect(resultTwo.content).toEqual(bookTwo.content);
				expect(resultTwo.title).toEqual(bookTwo.title);
				expect(resultTwo.coverDesigner).toEqual({
					name: "designer a",
					bio: "designer bio a",
					links: [
						{
							name: "Link 1",
							link: "https://link1.com",
						},
						{
							name: "Link 2",
							link: "https://link2.com",
						},
					],
				});
				expect(resultTwo.published).toEqual<DateInformation>({
					full: "October",
					short: "OCT",
					date: new Date("2019/10/15"),
					month: 10,
					year: 2019,
				});
				expect(resultTwo.purchaseLinks).toEqual([
					{
						link: "https://www.c.com",
						name: "C",
					},
					{
						link: "https://www.d.com",
						name: "D",
					},
				]);
				expect(resultTwo.fallbackCover).toEqual("fallbackcover2");
				expect(resultTwo.project).toEqual({
					slug: "testprojectAslug",
					title: "test project name A",
					description: "test project desc A",
				});
				expect(resultTwo.stories).toEqual([
					{
						title: "test story A",
						slug: "teststorysluga",
						content: "test story content A",
					},
				]);
			});
		});
	});

	describe("stories", () => {
		const dummyQueryStories: StoryType[] = [
			{
				title: "Test story title A",
				content: "Test story content A",
				shortStory: {
					publishedOn: "09/15/2019",
					relatedBook: null,
					relationshipToBook: null,
				},
			},
			{
				title: "Test story title B",
				content: "Test story content B",
				shortStory: {
					relationshipToBook: "test related book A",
					relatedBook: {
						title: "related book title A",
						content: "related book content A",
						slug: "relatedbooksluga",
						book: {
							cover: {
								localFile: {
									childImageSharp: {
										// @ts-ignore
										gatsbyImageData: { test: "test" },
									},
								},
							},
						},
					},
					publishedOn: "10/15/2019",
				},
				slug: "teststoryslug",
			},
		];

		const formattedStories: FlattenedStory[] = [
			{
				content: "Test story content A",
				slug: undefined,
				title: "Test story title A",
				meta: "2019 sep september test story content a test story title a",
				published: {
					date: new Date("2019/09/15"),
					full: "September",
					month: 9,
					short: "SEP",
					year: 2019,
				},
				book: null,
			},
			{
				content: "Test story content B",
				slug: "teststoryslug",
				title: "Test story title B",
				meta: "test related book a related book title a 2019 oct october test story content b test story title b",
				published: {
					date: new Date("2019/10/15"),
					full: "October",
					month: 10,
					short: "OCT",
					year: 2019,
				},
				book: {
					title: "related book title A",
					content: "related book content A",
					relationship: "test related book A",
					slug: "relatedbooksluga",
					// @ts-ignore
					cover: { test: "test" },
				},
			},
		];

		describe("createMetaforStory", () => {
			it("should give known results for known inputs", () => {
				const storyOne = formattedStories[0];
				const resultOne = author.createMetaForStory(storyOne).split(" ");
				expect(resultOne.length).toEqual(11);
				expect(resultOne[0]).toEqual(storyOne.published.year.toString());
				expect(resultOne[1]).toEqual(storyOne.published.short.toLowerCase());
				expect(resultOne[2]).toEqual(storyOne.published.full.toLowerCase());
				expect(resultOne.slice(3, 7).join(" ")).toEqual(
					storyOne.content.toLowerCase(),
				);
				expect(resultOne.slice(7, 11).join(" ")).toEqual(
					storyOne.title.toLowerCase(),
				);

				const storyTwo = formattedStories[1];
				const resultTwo = author.createMetaForStory(storyTwo).split(" ");
				expect(resultTwo.length).toEqual(19);
				expect(resultTwo.slice(0, 4).join(" ")).toEqual(
					storyTwo.book?.relationship.toLowerCase(),
				);
				expect(resultTwo.slice(4, 8).join(" ")).toEqual(
					storyTwo.book?.title.toLowerCase(),
				);
				expect(resultTwo[8]).toEqual(storyTwo.published.year.toString());
				expect(resultTwo[9]).toEqual(storyTwo.published.short.toLowerCase());
				expect(resultTwo[10]).toEqual(storyTwo.published.full.toLowerCase());
				expect(resultTwo.slice(11, 15).join(" ")).toEqual(
					storyTwo.content.toLowerCase(),
				);
				expect(resultTwo.slice(15, 19).join(" ")).toEqual(
					storyTwo.title.toLowerCase(),
				);
			});
		});

		describe("formatStory", () => {
			it("should process the book in a particular way", () => {
				const storyOne = dummyQueryStories[0];
				const resultOne = author.formatStory(storyOne);
				expect(resultOne.content).toEqual(storyOne.content);
				expect(resultOne.title).toEqual(storyOne.title);
				expect(resultOne.slug).toEqual(storyOne.slug);
				expect(resultOne.published).toEqual({
					date: new Date("2019/09/15"),
					full: "September",
					month: 9,
					short: "SEP",
					year: 2019,
				});
				expect(resultOne.book).toEqual(null);
				expect(resultOne.meta).toEqual(
					"2019 sep september test story content a test story title a",
				);

				const storyTwo = dummyQueryStories[1];
				const resultTwo = author.formatStory(storyTwo);
				expect(resultTwo.content).toEqual(storyTwo.content);
				expect(resultTwo.title).toEqual(storyTwo.title);
				expect(resultTwo.slug).toEqual(storyTwo.slug);
				expect(resultTwo.published).toEqual({
					date: new Date("2019/10/15"),
					full: "October",
					short: "OCT",
					year: 2019,
					month: 10,
				});
				expect(resultTwo.book).toEqual({
					title: storyTwo.shortStory.relatedBook?.title,
					relationship: storyTwo.shortStory.relationshipToBook,
					slug: storyTwo.shortStory.relatedBook?.slug,
					cover:
						storyTwo.shortStory.relatedBook?.book.cover?.localFile
							.childImageSharp.gatsbyImageData,
					content: storyTwo.shortStory.relatedBook?.content,
				});
				expect(resultTwo.meta).toEqual(
					"test related book a related book title a 2019 oct october test story content b test story title b",
				);
			});

			it("should give known results for known inputs", () => {
				const resultOne = author.formatStory(dummyQueryStories[0]);
				const resultTwo = author.formatStory(dummyQueryStories[1]);

				expect(resultOne).toEqual(formattedStories[0]);
				expect(resultTwo).toEqual(formattedStories[1]);
			});
		});

		describe("formatAllBooks", () => {
			it("should give known results for known inputs and organize them by the most recent date", () => {
				const results = author.formatAllStories(dummyQueryStories);
				expect(results[0]).toEqual(formattedStories[1]);
				expect(results[1]).toEqual(formattedStories[0]);
			});
		});

		describe("flattenBook", () => {
			const singleStories: SingleStory[] = [
				{
					title: "Test story title A",
					content: "Test story content A",
					slug: "teststoryaslug",
					shortStory: {
						alternateLinks: null,
						alternateLinksNames: null,
						publishedOn: "09/15/2019",
						relatedBook: null,
					},
				},
				{
					title: "Test story title B",
					content: "Test story content B",
					shortStory: {
						alternateLinks: "https://a.com, https://b.com",
						alternateLinksNames: "A, B",
						relationshipToBook: "test related book A",
						relatedBook: {
							title: "related book title A",
							content: "related book content A",
							slug: "relatedbooksluga",
							book: {
								relatedProject: {
									title: "related project A",
									slug: "relatedprojectaslug",
								},
								relatedProjectDesc: "related project A description",
								cover: {
									localFile: {
										childImageSharp: {
											// @ts-ignore
											gatsbyImageData: { test: "test" },
										},
									},
								},
							},
						},
						publishedOn: "10/15/2019",
					},
					slug: "teststoryslug",
				},
			];
			it("should give known results for known inputs", () => {
				const storyOne = singleStories[0];
				const resultOne = author.flattenStory(storyOne, "fallbackcover1");
				expect(resultOne.content).toEqual(storyOne.content);
				expect(resultOne.title).toEqual(storyOne.title);
				expect(resultOne.project).toEqual(null);
				expect(resultOne.published).toEqual<DateInformation>({
					full: "September",
					short: "SEP",
					date: new Date("2019/09/15"),
					month: 9,
					year: 2019,
				});
				expect(resultOne.alternateLinks).toEqual(undefined);
				expect(resultOne.book).toEqual(null);
				expect(resultOne.project).toEqual(null);
				expect(resultOne.fallbackCover).toEqual("fallbackcover1");

				const storyTwo = singleStories[1];
				const resultTwo = author.flattenStory(storyTwo, "fallbackcover2");
				expect(resultTwo.content).toEqual(storyTwo.content);
				expect(resultTwo.title).toEqual(storyTwo.title);
				expect(resultTwo.published).toEqual<DateInformation>({
					full: "October",
					short: "OCT",
					date: new Date("2019/10/15"),
					month: 10,
					year: 2019,
				});
				expect(resultTwo.alternateLinks).toEqual([
					{
						link: "https://a.com",
						name: "A",
					},
					{
						link: "https://b.com",
						name: "B",
					},
				]);
				expect(resultTwo.fallbackCover).toEqual("fallbackcover2");
				expect(resultTwo.project).toEqual({
					slug: "relatedprojectaslug",
					title: "related project A",
					description: "related project A description",
				});
				expect(resultTwo.book).toEqual({
					title: "related book title A",
					content: "related book content A",
					slug: "relatedbooksluga",
					relationship: "test related book A",
					cover: { test: "test" },
				});
				expect(resultTwo.fallbackCover).toEqual("fallbackcover2");
			});
		});
	});
});
