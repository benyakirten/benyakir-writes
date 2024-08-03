import rawBooks from "./wp/Author/books.json";
import rawStories from "./wp/Author/stories.json";
import rawProjects from "./wp/Projects/projects.json";
import rawPosts from "./wp/Posts/all.json";

import {
	FlattenedBlogPost,
	FlattenedBook,
	FlattenedProject,
	FlattenedProjectCard,
	FlattenedStory,
} from "@/types/posts";

export const blogDescription =
	"Browse a list of all my blog posts ordered by most recent publication to least recent. Users can filter the blog results by publication date, category and tags.";

export const contactDescription =
	"Write me a message and contact me, either to see if my abilities fit your needs, want to chat about books or just want to chat.";

export const homeDescription =
	"Benyakir Writes is a portal to my latest work. See my programming portfolio. Learn about the latest books, projects and short stories I've written. Or check out my blog posts, reviews of books or podcast episodes.";

export const portfolioDescription =
	"My developer portfolio, including only my best and most up-to-date projects.";

export const projectsDescription =
	"A view of all of my completed projects with various details from when I first started to learn programming. You can filter by date, host, technology and keyword.";

export const themeDescription =
	"Visitors can set a color theme or customize their own to save locally.";

export const authorDescription =
	"A view of all of my published books and short stories. They can be filtered by keyword or date of publication.";

// @ts-ignore
export const books: FlattenedBook[] = rawBooks.map((book: FlattenedBook) => {
	book.published.date = new Date(book.published.date);
	return book;
});

export const stories: FlattenedStory[] = rawStories.map(
	// @ts-ignore
	(story: FlattenedStory) => {
		story.published.date = new Date(story.published.date);
		return story;
	},
);

export const projects: FlattenedProjectCard[] = rawProjects.map(
	// @ts-ignore
	(p: FlattenedProjectCard) => ({
		...p,
		firstReleased: {
			...p.firstReleased,
			date: new Date(p.firstReleased.date),
		},
	}),
);

export const posts: FlattenedBlogPost[] = rawPosts.map(
	// @ts-ignore
	(b: FlattenedBlogPost) => ({
		...b,
		published: { ...b.published, date: new Date(b.published.date) },
	}),
);

export type PageResult = {
	title: string;
	slug: string;
	description: string;
};

export const pageSearch: PageResult[] = [
	{
		title: "Blog",
		slug: "/blog",
		description: blogDescription,
	},
	{
		title: "Contact",
		slug: "/contact",
		description: contactDescription,
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
