import { PageSearch } from "@/data/search";
import {
	FlattenedBlogCard,
	FlattenedBookCard,
	FlattenedProjectCard,
	FlattenedStoryCard,
} from "@/types/posts";

export type SearchProps = {
	onClose: () => void;
};

export type SearchBarProps = {
	suggestions: string[];
	search: string;
	onClose: () => void;
	setSearch: (val: string) => void;
};

export type SearchResultsProps = {
	onClose: () => void;
	onSetQuery: (query: string) => void;
	results: SearchResultItems | null;
	alternatives: string[];
};

export type SearchResultItems = {
	books: FlattenedBookCard[];
	projects: FlattenedProjectCard[];
	posts: FlattenedBlogCard[];
	stories: FlattenedStoryCard[];
	pages: PageSearch[];
};
