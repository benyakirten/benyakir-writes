import { getBlogPostDateInformation } from "./dates";

import type { BlogPostType, FlattenedBlogPost } from "@/types/posts";

export function formatBlogPost(post: BlogPostType): FlattenedBlogPost {
	return {
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		content: post.content,
		published: getBlogPostDateInformation(post.date),
		categories: post.categories.nodes?.map((n) => n.name) ?? null,
		tags: post.tags.nodes?.map((n) => n.name) ?? null,
		meta: {},
	};
}

export function getActiveCategory(categories: string[] | null): string {
	if (!categories) {
		return "Unknown";
	}

	const possibleCategories = categories.filter(
		(cat) => cat.toLowerCase() !== "uncategorized",
	);

	if (possibleCategories.length > 1) {
		const possibleCategory = possibleCategories.find(
			(cat) => cat !== "Ben's Blogs",
		);
		return possibleCategory ?? possibleCategories[0];
	}

	return possibleCategories.length === 0 ? "Unknown" : possibleCategories[0];
}
