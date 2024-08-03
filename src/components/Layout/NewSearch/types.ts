import { PageResult } from "@/data/search";
import {
	FlattenedStory,
	FlattenedBlogPost,
	FlattenedBook,
	FlattenedProjectCard,
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
	projects: FlattenedProjectCard[];
	posts: FlattenedBlogPost[];
	stories: FlattenedStory[];
	pages: PageResult[];
};
