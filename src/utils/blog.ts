import { getBlogPostDateInformation } from "./dates";
import { createSearchableString } from "./posts";

import type {
	BlogPostType,
	FlattenedBlogPost,
	PartiallyFlattenedBlogPost,
} from "@Types/posts";

export const formatAllBlogPosts = (
	posts: BlogPostType[],
): FlattenedBlogPost[] =>
	posts
		.map((p) => formatBlogPost(p))
		.sort((a, b) => b.published.date.getTime() - a.published.date.getTime());

export function formatBlogPost(post: BlogPostType): FlattenedBlogPost {
	const data: PartiallyFlattenedBlogPost = {
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		content: post.content,
		published: getBlogPostDateInformation(post.date),
		categories: post.categories.nodes?.map((n) => n.name) ?? [],
		tags: post.tags.nodes?.map((n) => n.name) ?? [],
	};

	const flattenedPost: FlattenedBlogPost = {
		...data,
		meta: createMetaForPost(data),
	};

	return flattenedPost;
}

export function createMetaForPost(post: PartiallyFlattenedBlogPost) {
	let data = [
		post.title,
		post.slug,
		post.excerpt,
		post.content,
		post.published.full,
		post.published.month.toString(),
		post.published.short,
		post.published.year,
	];
	if (post.categories) {
		data = data.concat(post.categories);
	}
	if (post.tags) {
		data = data.concat(post.tags);
	}
	return createSearchableString(data);
}
