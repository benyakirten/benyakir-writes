import BookCard from "@Variant/Cards/Author/BookCard/BookCard.component"
import StoryCard from "@Variant/Cards/Author/StoryCard/StoryCard.component"

import type {
  FlattenedBlogPost,
  FlattenedProject,
  FlattenedSingleBook,
  FlattenedSingleStory,
  FlattenedProjectCard,
  FlattenedBookCard,
  FlattenedStoryCard,
  FlattenedBlogCard,
  PartiallyFlattenedBlogPost,
  PartialFlattenedBook,
  PartialFlattenedStory
} from "../posts"

type LeadPageProps = {
  filter: ReactElement;
  title: string;
}

type ProjectsFilterProps = {
  allProjects: FlattenedProjectCard[];
  allHosts: string[];
  allTechs: string[];
  onFilter: (projects: FlattenedProjectCard[]) => void;
}

type ProjectCardProps = {
  item: FlattenedProjectCard;
}

type AuthorFilterProps = {
  allBooks: FlattenedBookCard[];
  allStories: FlattenedStoryCard[];
  onFilter: (books: FlattenedBookCard[], stories: FlattenedStoryCard[]) => void;
}

type BookFilterProps = {
  books: FlattenedBookCard[];
  onFilter: (stories: FlattenedBookCard[]) => void;
}

type StoryFilterProps = {
  stories: FlattenedStoryCard[];
  onFilter: (stories: FlattenedStoryCard[]) => void;
}

type BookCardProps = {
  item: PartialFlattenedBook;
}

type StoryCardProps = {
  item: PartialFlattenedStory
}

type BlogCardProps = {
  item: PartiallyFlattenedBlogPost
}

type HalfProps = {
  currentPage: number;
  setCurrentPage: (n: number) => void;
  items: FlattenedBook[] | FlattenedStory[]
  El: BookCard | StoryCard;
}

type AllBlogFilterProps = {
  allPosts: FlattenedBlogCard[]
  onFilter: (posts: FlattenedBlogCard[]) => void;
}

type CategoryBlogFilterProps = {
  allPosts: FlattenedBlogPost[]
  onFilter: (posts: FlattenedBlogPost[]) => void;
}

type BookHeaderProps = {
  book: FlattenedSingleBook;
}

type StoryHeaderProps = {
  story: FlattenedSingleStory;
}

type ProjectHeaderProps = {
  project: FlattenedProject;
  icons: FileNode[];
  loading: boolean;
  latestUpdate?: Date;
  err?: string;
}

type PostHeaderProps = {
  post: FlattenedBlogPost;
}