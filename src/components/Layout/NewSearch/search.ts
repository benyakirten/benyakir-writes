import { SearchResultItems } from "./types";
import { books, pageSearch, posts, projects, stories } from "@/data/search";

export function search(query: string): SearchResultItems | null {
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
				post.categories?.find((cat) => cat.toLowerCase().includes(word)) ||
				post.tags?.find((tag) => tag.toLowerCase().includes(word)),
		),
	);

	// Searching seems to take on the order of 2-3ms on a good computer.
	// Until it reaches something like 200+ms then it doesn't really need to be
	// optimized. However, if we need to, we could offload it to a web worker,
	// maybe using partytown.
	return {
		books: bookResults,
		projects: projectResults,
		posts: postResults,
		stories: storyResults,
		pages: pageResults,
	};
}
