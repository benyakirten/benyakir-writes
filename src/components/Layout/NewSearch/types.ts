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
	onClose: () => void;
	onSearch: (query: string) => void;
};

export type SearchResultsProps = {
	onClose: () => void;
	results: SearchResultItems | null;
};

export type SearchResultItems = {
	books: FlattenedBookCard[];
	projects: FlattenedProjectCard[];
	posts: FlattenedBlogCard[];
	stories: FlattenedStoryCard[];
	pages: PageSearch[];
};
