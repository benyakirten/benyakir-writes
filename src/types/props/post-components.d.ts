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

type ProjectsFilterProps = AuthorFilterProps & {
	hosts: PotentialChoice[];
	changeHosts: (choices: PotentialChoice[]) => void;
	techs: PotentialChoice[];
	changeTechs: (choices: PotentialChoice[]) => void;
};

type ProjectCardProps = {
	item: FlattenedProjectCard;
};

type AuthorFilterProps = {
	publishedBefore: Date;
	publishedAfter: Date;
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
	item: FlattenedBlogCard;
};

type HalfProps = {
	currentPage: number;
	setCurrentPage: (n: number) => void;
	items: FlattenedBook[] | FlattenedStory[];
	El: BookCard | StoryCard;
};

type BlogFilterProps = AuthorFilterProps & {
	categories: PotentialChoice[];
	changeCategories: (choices: PotentialChoice[]) => void;
	tags: PotentialChoice[];
	changeTags: (choices: PotentialChoice[]) => void;
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
