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
	FlattenedStory,
	FlattenedBlogPost,
	FlattenedBook,
	FlattenedProject,
} from "@/types/posts";

export type SearchProps = {
	onClose: () => void;
};

export type SearchBarProps = {
	onClose: () => void;
	onSearch: (query: string) => void;
};

export type SearchResultsProps = {
	onClose: () => void;
	results: SearchResultItems | null;
};

export type SearchResultItems = {
	books: FlattenedBook[];
	projects: FlattenedProject[];
	posts: FlattenedBlogPost[];
	stories: FlattenedStory[];
	pages: PageResult[];
};

type PageResult = {
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
