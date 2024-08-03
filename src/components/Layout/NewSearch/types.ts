import {
	blogDescription,
	contactDescription,
	homeDescription,
	portfolioDescription,
	projectsDescription,
	themeDescription,
	authorDescription,
} from "@/data/pages";
import {
	FlattenedBlogPost,
	FlattenedBook,
	FlattenedProject,
	FlattenedStory,
} from "@/types/posts";

export enum SearchResultType {
	Book = "book",
	ShortStory = "story",
	Post = "post",
	Project = "project",
	Page = "page",
}

export type SearchProps = {
	onClose: () => void;
};

export type SearchBarProps = {
	onClose: () => void;
	onSearch: (query: string) => void;
};

export type SearchResultsProps = {
	results: unknown[];
};

export type SearchResult =
	| PostResult
	| BookResult
	| StoryResult
	| ProjectResult
	| PageResult;

type PostResult = FlattenedBlogPost & {
	type: SearchResultType.Post;
};

type BookResult = FlattenedBook & {
	type: SearchResultType.Book;
};

type ProjectResult = FlattenedProject & {
	type: SearchResultType.Project;
};

type StoryResult = FlattenedStory & {
	type: SearchResultType.ShortStory;
};

type PageResult = {
	title: string;
	slug: string;
	description: string;
	type: SearchResultType.Page;
};

export const pageSearch: PageResult[] = [
	{
		title: "Blog",
		slug: "/blog",
		description: blogDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Contact",
		slug: "/contact",
		description: contactDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Home",
		slug: "/",
		description: homeDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Portfolio",
		slug: "/portfolio",
		description: portfolioDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Projects",
		slug: "/projects",
		description: projectsDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Theme",
		slug: "/theme",
		description: themeDescription,
		type: SearchResultType.Page,
	},
	{
		title: "Author",
		slug: "/author",
		description: authorDescription,
		type: SearchResultType.Page,
	},
] as const;
