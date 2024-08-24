import rawBooks from "./wp/Author/books.json";
import rawStories from "./wp/Author/stories.json";
import rawProjects from "./wp/Projects/projects.json";
import rawPosts from "./wp/Posts/all.json";
import lookups from "./wp/lookups.json";
import projectsMisc from "./wp/Projects/misc.json";
import {
	FlattenedBlogCard,
	FlattenedBookCard,
	FlattenedProjectCard,
	FlattenedStoryCard,
} from "@/types/posts";
import { Trie } from "@/utils/search";
import { createChoiceSet } from "@/utils/filter";
import { PotentialChoice } from "@/types/general";

export const blogDescription =
	"Browse a list of all my blog posts ordered by most recent publication to least recent. Users can filter the blog results by publication date, category and tags.";

export const contactDescription =
	"Write me a message and contact me, either to see if my abilities fit your needs, want to chat about books or just want to chat.";

export const homeDescription =
	"Get an overview of my latest creations. As a fluent speaker of Italian, former writer, editor and current fullstack dev, I have a lot to share.";

export const portfolioDescription =
	"My developer portfolio, including only my best and most up-to-date projects.";

export const projectsDescription =
	"A view of all of my completed projects with various details from when I first started to learn programming. You can filter by date, host, technology and keyword.";

export const themeDescription =
	"Visitors can set a color theme or customize their own to save locally.";

export const authorDescription =
	"A view of all of my published books and short stories. They can be filtered by keyword or date of publication.";

export const books: FlattenedBookCard[] = rawBooks.map(
	// @ts-ignore
	(book: FlattenedBookCard) => {
		book.published.date = new Date(book.published.date);
		return book;
	},
);

export const stories: FlattenedStoryCard[] = rawStories.map(
	// @ts-ignore
	(story: FlattenedStoryCard) => {
		story.published.date = new Date(story.published.date);
		return story;
	},
);

export const projects: FlattenedProjectCard[] = rawProjects.map(
	// @ts-ignore
	(p: FlattenedProjectCard) => {
		p.firstReleased.date = new Date(p.firstReleased.date);
		return p;
	},
);

export const projectHosts: PotentialChoice[] = projectsMisc.hosts.map(
	(host) => ({
		label: host,
		value: host,
	}),
);

export const projectTechs: PotentialChoice[] = projectsMisc.longTechs.map(
	(tech) => ({
		label: tech,
		value: tech,
	}),
);

export const posts: FlattenedBlogCard[] = rawPosts.map(
	// @ts-ignore
	(b: FlattenedBlogCard) => {
		b.published.date = new Date(b.published.date);
		return b;
	},
);

export const postCategories = createChoiceSet(posts, "categories");
export const postTags = createChoiceSet(posts, "tags");

export type PageSearch = {
	title: string;
	slug: string;
	description: string;
};

export const pageSearch: PageSearch[] = [
	{
		title: "Blog",
		slug: "/blog",
		description: blogDescription,
	},
	{
		title: "Home",
		slug: "/",
		description: homeDescription,
	},
	{
		title: "Portfolio",
		slug: "/portfolio",
		description: portfolioDescription,
	},
	{
		title: "Projects",
		slug: "/projects",
		description: projectsDescription,
	},
	{
		title: "Theme",
		slug: "/theme",
		description: themeDescription,
	},
	{
		title: "Author",
		slug: "/author",
		description: authorDescription,
	},
] as const;

export const autocomplete = new Trie(Object.entries(lookups));

function getItemDate(
	item:
		| FlattenedBlogCard
		| FlattenedBookCard
		| FlattenedProjectCard
		| FlattenedStoryCard,
): Date {
	if ("published" in item) {
		return item.published.date;
	}

	if ("firstReleased" in item) {
		return item.firstReleased.date;
	}

	return new Date(0);
}

export const latestTwentyItems = [...books, ...stories, ...projects, ...posts]
	.sort((a, b) => {
		const aDate = getItemDate(a);
		const bDate = getItemDate(b);

		return bDate.valueOf() - aDate.valueOf();
	})
	.slice(0, 10);
