import React, { ReactElement } from "react"

import BookCard from '@Variants/Author/BookCard/BookCard.component'
import StoryCard from '@Variants/Author/StoryCard/StoryCard.component'
import {
    PartiallyFlattenedBlogPost,
    FlattenedBlogPost,
    FlattenedBlogCard,
    PartialFlattenedBook,
    FlattenedBook,
    FlattenedBookCard,
    FlattenedProject,
    FlattenedProjectCard,
    FlattenedStory,
    FlattenedStoryCard
} from "./posts"

// LAYOUT
type LogoProps = {
    opening: boolean;
    open: boolean;
}

type SearchProps = {
    open: boolean;
    onClick: () => void;
}

type PaginateProps = {
    currentPage: number;
    items: any[];
    El: React.Element;
    onPageChange: (n: number) => void;
}

type PaginateMenuProps = {
    limit: number;
    setLimit: (n: number) => void;
    currentPage: number;
    maxPages: number;
    onLeft: () => void;
    onRight: () => void;
    disableRight?: boolean;
    name: string;
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
    success?: boolean;
}

type LinkProps = {
    to: string;
    active?: boolean;
    dark?: boolean;
    small?: boolean;
    outside?: boolean;
    inline?: boolean;
    limitUnderbar?: boolean;
    underbarSize?: string;
    tabIndex?: number;
}
type LayoutProps = {
    path: string;
}

type OpenProps = {
    open?: boolean;
    tabIndex?: number;
    onClick?: () => void;
    cyId?: string;
}

type FoldoutProps = OpenProps & {
    topbar: ReactElement;
    height?: string;
    heightMultiplierOnPhone?: number;
    heightMultiplierOnTablet?: number;
    heightMultiplierOnLarger?: number;
    cyId?: string;
}

type LinkGroupProps = OpenProps & {
    domain: string;
    height?: string;
    links: LinkItem[];
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
    name: string;
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
    tabIndex?: number;
    autofocus?: boolean;
    cyId?: string;
}

interface CheckboxProps extends InputProps {
    value: boolean;
    onToggle: (newState: boolean) => void;
    tabIndex?: number;
}

interface DateProps extends InputProps {
    value: Date;
    onChange: (date: Date) => void;
    tabIndex?: number;
}

interface ChoiceProps {
    tabIndex?: number;
    label: string;
    value: boolean;
    onSelect: (label: string) => void;
}

interface MultipleChoiceProps {
    tabIndex?: number;
    choices: PotentialChoice[];
    onSelect: (choices: PotentialChoice[]) => void;
}

// POSTS
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
    onFilter: (books: FlattenedBookCard[], stories: FlattenedStorCard[]) => void;
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
    item: FlattenedStoryCard
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