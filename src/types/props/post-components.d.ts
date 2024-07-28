import type BookCard from "@Variant/Cards/Author/BookCard/BookCard.component";
import type StoryCard from "@Variant/Cards/Author/StoryCard/StoryCard.component";
import type { LatestUpdateState } from "../hooks";

import type {
	AuthoredItemCard,
	FlattenedBlogCard,
	FlattenedBlogPost,
	FlattenedBookCard,
	FlattenedProject,
	FlattenedProjectCard,
	FlattenedSingleBook,
	FlattenedSingleStory,
	FlattenedStoryCard,
	PartialFlattenedBook,
	PartialFlattenedStory,
	PartiallyFlattenedBlogPost,
} from "../posts";

type LeadPageProps = ChildrenProp & {
	filter: ReactElement;
	title: string;
};

type ProjectsFilterProps = {
	allProjects: FlattenedProjectCard[];
	allHosts: string[];
	allTechs: string[];
	onFilter: (projects: FlattenedProjectCard[]) => void;
};

type ProjectCardProps = {
	item: FlattenedProjectCard;
};

type AuthorFilterProps = {
	publishedBefore: Date;
	publishedAfter: Date;
	filterWords: string[];
	changePublishedBefore: (date: Date) => void;
	changePublishedAfter: (date: Date) => void;
	changeFilterWords: (words: string[]) => void;
};

type BookCardProps = {
	item: PartialFlattenedBook;
};

type StoryCardProps = {
	item: PartialFlattenedStory;
};

type BlogCardProps = {
	item: PartiallyFlattenedBlogPost;
};

type HalfProps = {
	currentPage: number;
	setCurrentPage: (n: number) => void;
	items: FlattenedBook[] | FlattenedStory[];
	El: BookCard | StoryCard;
};

type BlogFilterProps = {
	allPosts: FlattenedBlogCard[];
	onFilter: (posts: FlattenedBlogCard[]) => void;
};

type CategoryBlogFilterProps = {
	allPosts: FlattenedBlogPost[];
	onFilter: (posts: FlattenedBlogPost[]) => void;
};

type BookHeaderProps = {
	book: FlattenedSingleBook;
};

type StoryHeaderProps = {
	story: FlattenedSingleStory;
};

type ProjectHeaderProps = {
	project: FlattenedProject;
	icons: FileNode[];
	latestUpdateState: LatestUpdateState;
};

type PostHeaderProps = {
	post: FlattenedBlogPost;
};
