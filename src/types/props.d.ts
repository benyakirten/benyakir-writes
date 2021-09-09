import { ReactElement } from "react"

import BookCard from '@Variants/Author/BookCard/BookCard.component'
import StoryCard from '@Variants/Author/StoryCard/StoryCard.component'
import { FlattenedBlogPost, FlattenedBook, FlattenedStory } from "./posts"

// LAYOUT
type LogoProps = {
    opening: boolean;
}

type SearchProps = {
    open: boolean;
    onClick: () => void;
}

// GENERAL
type ButtonProps = {
    type?: 'submit' | 'button';
    disabled?: boolean;
    onClick?: () => void;
}

type LoadingProps = {
    size?: string;
}

type AlertBoxProps = {
    success: boolean;
}

type LinkProps = {
    to: string;
    active?: boolean;
    dark?: boolean;
    small?: boolean;
    outside?: boolean;
    inline?: boolean;
    limitUnderbar?: boolean;
}
type LayoutProps = {
    path: string;
}

type OpenProps = {
    open?: boolean;
    tabIndex?: number;
    onClick?: () => void;
}

type FoldoutProps = OpenProps & {
    topbar: ReactElement;
    height?: string;
    heightMultiplierOnPhone?: number;
    heightMultiplierOnTablet?: number;
}

type LinkGroupProps = OpenProps & {
    domain: string;
    height?: string;
    links: string[];
}

type HoverImageProps = {
    publicURL: string;
    name: string;
    url?: string;
    color?: string;
    size?: string;
    square?: boolean;
    marginRightOnPhone?: string;
}

type IconGridProps = {
    height?: string;
    icons: FileNode[];
}

type IconProps = {
    height?: string;
    icon: FileNode;
}

// INPUT
type FilterProps = {
    name?: string;
    onSearch: (val: string) => void;
}

interface InputProps {
    label: string;
    name: string;
}

interface TextProps extends InputProps {
    value: string;
    onChange: (newText: string) => void;
    width?: string;
}

interface CheckboxProps extends InputProps {
    value: boolean;
    onToggle: (newState: boolean) => void;
}

interface DateProps extends InputProps {
    value: Date;
    onChange: (date: Date) => void;
}

interface ChoiceProps {
    label: string;
    value: boolean;
    onSelect: (label: string) => void;
}

interface MultipleChoiceProps {
    choices: PotentialChoice[];
    onSelect: (choices: PotentialChoice[]) => void;
}

// POSTS
type LeadPageProps = {
    filter: ReactElement;
}

type ProjectsFilterProps = {
    allProjects: FlattenedProject[];
    allHosts: string[];
    allTechs: string[];
    onFilter: (projects: FlattenedProject[]) => void;
}

type ProjectCardProps = {
    project: FlattenedProject;
    icons: FileNode[];
}

type AuthorFilterProps = {
    allBooks: FlattenedBook[];
    allStories: FlattenedStory[];
    onFilter: (books: FlattenedBook[], stories: FlattenedStory[]) => void;
}

type BookFilterProps = {
    books: FlattenedBook[];
    onFilter: (stories: FlattenedBook[]) => void;
}

type StoryFilterProps = {
    stories: FlattenedStory[];
    onFilter: (stories: FlattenedStory[]) => void;
}

type BookCardProps = {
    item: FlattenedBook;
}

type StoryCardProps = {
    item: FlattenedStory
}

type BlogCardProps = {
    post: FlattenedBlogPost
}

type HalfProps = {
    items: FlattenedBook[] | FlattenedStory[]
    El: BookCard | StoryCard;
}

type AllBlogFilterProps = {
    allPosts: FlattenedBlogPost[]
    onFilter: (posts: FlattenedBlogPost[]) => void;
}

type CategoryBlogFilterProps = {
    allPosts: FlattenedBlogPost[]
    onFilter: (posts: FlattenedBlogPost[]) => void;
}