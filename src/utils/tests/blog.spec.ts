import { describe, it, expect } from "vitest";

import * as blog from "@/utils/blog";
import { getBlogPostDateInformation } from "@/utils/dates";
import type { BlogPostType, FlattenedBlogPost } from "@/types/posts";

describe("blog util", () => {
	const rawPosts: BlogPostType[] = [
		{
			title: "blog post title A",
			slug: "blogpostaslug",
			date: "2019/09/15",
			categories: {
				nodes: null,
			},
			tags: {
				nodes: null,
			},
		},
		{
			title: "blog post title B",
			slug: "blogpostbslug",
			content: "blog post content B",
			date: "2019/10/15",
			categories: {
				nodes: [
					{
						name: "cat A",
					},
					{
						name: "cat B",
					},
				],
			},
			tags: {
				nodes: [
					{
						name: "tag A",
					},
					{
						name: "tag B",
					},
				],
			},
		},
	];

	const preparedPosts: FlattenedBlogPost[] = [
		{
			title: "blog post title A",
			slug: "blogpostaslug",
			published: {
				month: 9,
				year: 2019,
				full: "September",
				short: "SEP",
				date: new Date("2019/09/15"),
			},
			categories: null,
			tags: null,
			meta: "2019 sep 9 september blogpostaslug blog post title a",
		},
		{
			title: "blog post title B",
			slug: "blogpostbslug",
			content: "blog post content B",
			excerpt: undefined,
			published: {
				month: 10,
				year: 2019,
				full: "October",
				short: "OCT",
				date: new Date("2019/10/15"),
			},
			categories: ["cat A", "cat B"],
			tags: ["tag A", "tag B"],
			meta: "tag b tag a cat b cat a 2019 oct 10 october blog post content b blogpostbslug blog post title b",
		},
	];

	describe("createMetaForBlogPost", () => {
		it("should produce known results for known inputs", () => {
			const postOne = preparedPosts[0];
			const resultOne = blog.createMetaForPost(preparedPosts[0]).split(" ");

			expect(resultOne.length).toEqual(9);
			expect(resultOne[0]).toEqual(postOne.published.year.toString());
			expect(resultOne[1]).toEqual(postOne.published.short.toLowerCase());
			expect(resultOne[2]).toEqual(postOne.published.month.toString());
			expect(resultOne[3]).toEqual(postOne.published.full.toLowerCase());
			expect(resultOne[4]).toEqual(postOne.slug.toLowerCase());
			expect(resultOne.slice(5, 9).join(" ")).toEqual(
				postOne.title.toLowerCase(),
			);

			const postTwo = preparedPosts[1];
			const resultTwo = blog.createMetaForPost(preparedPosts[1]).split(" ");

			expect(resultTwo.length).toEqual(21);
			expect(resultTwo.slice(0, 2).join(" ")).toEqual(
				// @ts-ignore
				postTwo.tags[1].toLowerCase(),
			);
			expect(resultTwo.slice(2, 4).join(" ")).toEqual(
				// @ts-ignore
				postTwo.tags[0].toLowerCase(),
			);
			expect(resultTwo.slice(4, 6).join(" ")).toEqual(
				// @ts-ignore
				postTwo.categories[1].toLowerCase(),
			);
			expect(resultTwo.slice(6, 8).join(" ")).toEqual(
				// @ts-ignore
				postTwo.categories[0].toLowerCase(),
			);
			expect(resultTwo[8]).toEqual(postTwo.published.year.toString());
			expect(resultTwo[9]).toEqual(postTwo.published.short.toLowerCase());
			expect(resultTwo[10]).toEqual(postTwo.published.month.toString());
			expect(resultTwo[11]).toEqual(postTwo.published.full.toLowerCase());
			expect(resultTwo.slice(12, 16).join(" ")).toEqual(
				postTwo.content?.toLowerCase(),
			);
			expect(resultTwo[16]).toEqual(postTwo.slug.toLowerCase());
			expect(resultTwo.slice(17, 21).join(" ")).toEqual(
				postTwo.title.toLowerCase(),
			);
		});
	});

	describe("formatBlogPost", () => {
		it("should process the information in a particular way", () => {
			const postOne = rawPosts[0];
			const flattenedPostOne = blog.formatBlogPost(postOne);

			expect(flattenedPostOne.title).toEqual(postOne.title);
			expect(flattenedPostOne.slug).toEqual(postOne.slug);
			expect(flattenedPostOne.content).toEqual(postOne.content);
			expect(flattenedPostOne.excerpt).toEqual(postOne.excerpt);
			expect(flattenedPostOne.published).toEqual(
				getBlogPostDateInformation(postOne.date),
			);
			expect(flattenedPostOne.categories).toEqual(null);
			expect(flattenedPostOne.tags).toEqual(null);

			const postTwo = rawPosts[1];
			const flattenedPostTwo = blog.formatBlogPost(postTwo);

			expect(flattenedPostTwo.title).toEqual(postTwo.title);
			expect(flattenedPostTwo.slug).toEqual(postTwo.slug);
			expect(flattenedPostTwo.content).toEqual(postTwo.content);
			expect(flattenedPostTwo.excerpt).toEqual(postTwo.excerpt);
			expect(flattenedPostTwo.published).toEqual(
				getBlogPostDateInformation(postTwo.date),
			);
			expect(flattenedPostTwo.categories).toEqual(["cat A", "cat B"]);
			expect(flattenedPostTwo.tags).toEqual(["tag A", "tag B"]);
		});
		it("should produce known results for known inputs", () => {
			expect(blog.formatBlogPost(rawPosts[0])).toEqual(preparedPosts[0]);
			expect(blog.formatBlogPost(rawPosts[1])).toEqual(preparedPosts[1]);
		});
	});

	describe("formatAllBlogPosts", () => {
		it("should format all posts and put them in descending chronological order", () => {
			const results = blog.formatAllBlogPosts(rawPosts);
			expect(results[0]).toEqual(preparedPosts[1]);
			expect(results[1]).toEqual(preparedPosts[0]);
		});
	});
});
