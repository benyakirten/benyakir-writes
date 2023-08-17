import BookCard from '@Variant/Cards/Author/BookCard/BookCard.component'
import StoryCard from '@Variant/Cards/Author/StoryCard/StoryCard.component'
import { LatestUpdateState } from '../hooks'

import type {
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
} from '../posts'

type LeadPageProps = ChildrenProp & {
  filter: ReactElement
  title: string
}

type ProjectsFilterProps = {
  allProjects: FlattenedProjectCard[]
  allHosts: string[]
  allTechs: string[]
  onFilter: (projects: FlattenedProjectCard[]) => void
}

type ProjectCardProps = {
  item: FlattenedProjectCard
}

type AuthorFilterProps = {
  allBooks: FlattenedBookCard[]
  allStories: FlattenedStoryCard[]
  onFilter: (books: FlattenedBookCard[], stories: FlattenedStoryCard[]) => void
}

type BookFilterProps = {
  books: FlattenedBookCard[]
  onFilter: (stories: FlattenedBookCard[]) => void
}

type StoryFilterProps = {
  stories: FlattenedStoryCard[]
  onFilter: (stories: FlattenedStoryCard[]) => void
}

type BookCardProps = {
  item: PartialFlattenedBook
}

type StoryCardProps = {
  item: PartialFlattenedStory
}

type BlogCardProps = {
  item: PartiallyFlattenedBlogPost
}

type HalfProps = {
  currentPage: number
  setCurrentPage: (n: number) => void
  items: FlattenedBook[] | FlattenedStory[]
  El: BookCard | StoryCard
}

type AllBlogFilterProps = {
  allPosts: FlattenedBlogCard[]
  onFilter: (posts: FlattenedBlogCard[]) => void
}

type CategoryBlogFilterProps = {
  allPosts: FlattenedBlogPost[]
  onFilter: (posts: FlattenedBlogPost[]) => void
}

type BookHeaderProps = {
  book: FlattenedSingleBook
}

type StoryHeaderProps = {
  story: FlattenedSingleStory
}

interface ProjectHeaderProps {
  project: FlattenedProject
  icons: FileNode[]
  latestUpdateState: LatestUpdateState
}

type PostHeaderProps = {
  post: FlattenedBlogPost
}
