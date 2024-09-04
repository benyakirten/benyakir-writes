import { books, pageSearch, posts, projects, stories } from "../data/search";

/**
 *
 * @param {string} query
 * @returns {null | import("../types/search").SearchResultItems}
 */
export function search(query) {
	if (!query) {
		return null;
	}

	const words = query.toLowerCase().split(" ");
	const pageResults = pageSearch.filter((page) =>
		words.some(
			(word) =>
				page.title.toLowerCase().includes(word) ||
				page.description.toLowerCase().includes(word),
		),
	);

	const bookResults = books.filter((book) =>
		words.some(
			(word) =>
				book.title.toLowerCase().includes(word) ||
				book.content.toLowerCase().includes(word) ||
				book.meta[word],
		),
	);

	const storyResults = stories.filter((story) =>
		words.some(
			(word) =>
				story.meta[word] ||
				story.title.toLowerCase().includes(word) ||
				story.content.toLowerCase().includes(word),
		),
	);

	const projectResults = projects.filter((project) =>
		words.some(
			(word) =>
				project.meta[word] ||
				project.title.toLowerCase().includes(word) ||
				project.content.toLowerCase().includes(word),
		),
	);

	const postResults = posts.filter((post) =>
		words.some(
			(word) =>
				post.meta[word] ||
				post.title.toLowerCase().includes(word) ||
				post.excerpt?.toLowerCase().includes(word) ||
				post.content?.toLowerCase().includes(word) ||
				post.categories?.find((cat) => cat.toLowerCase().includes(word)) ||
				post.tags?.find((tag) => tag.toLowerCase().includes(word)),
		),
	);

	return {
		books: bookResults,
		projects: projectResults,
		posts: postResults,
		stories: storyResults,
		pages: pageResults,
	};
}

/**
 *
 * @param {MessageEvent<{ query: string }>} e
 */
const handleMessage = (e) => {
	const { query } = e.data;
	const results = search(query);
	postMessage(results);
};

// biome-ignore lint/suspicious/noGlobalAssign: Using self.global causes an error in Gatsby's eslint so we reassign the global
onmessage = handleMessage;
