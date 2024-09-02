import { describe, expect, it } from "vitest";

import type { BlogPostType, FlattenedBlogPost } from "@/types/posts";
import * as blog from "@/utils/blog";
import { getBlogPostDateInformation } from "@/utils/dates";

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
			meta: {},
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
			meta: {},
		},
	];

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
});
