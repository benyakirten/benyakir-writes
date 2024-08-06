import { getBlogPostDateInformation } from "./dates";

import type {
	BlogPostType,
	FlattenedBlogCard,
	FlattenedBlogPost,
} from "@Types/posts";

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

export function separateTitleAndSubtitle(
	title: string,
): [string, string | null] {
	const possibleSeparators = [",", "-", "–", ":"];
	let separatorIndex = -1;

	for (const separator of possibleSeparators) {
		const index = title.indexOf(separator);
		if (index !== -1 && (separatorIndex === -1 || index < separatorIndex)) {
			separatorIndex = index;
		}
	}

	if (separatorIndex === -1) {
		return [title, null];
	}

	return [
		title.slice(0, separatorIndex).trim(),
		title.slice(separatorIndex + 1).trim(),
	];
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

export function determineTitle(
	post: FlattenedBlogCard,
): [string, string | null, string] {
	const category = getActiveCategory(post.categories);
	if (category === "Down South Boulder Road") {
		const [title, subtitle] = separateTitleAndSubtitle(post.title);
		const postTitle = subtitle ? title : post.title;
		return [postTitle, null, category];
	}

	const [title, subtitle] = separateTitleAndSubtitle(post.title);
	return [title, subtitle, category];
}
