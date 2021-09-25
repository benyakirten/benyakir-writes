import {
    GlobalSearch,
    SearchableBlogPost,
    SearchableBook,
    SearchableItem,
    SearchableProject,
    SearchableStory
} from "@Types/posts";
import { GlobalQuery } from "@Types/query";

import { formatStory, formatBook } from "./author";
import { formatBlogPost } from "./blog";
import { createLookupMeta } from "./posts";
import { formatProject } from "./project";

export const hasSomeContent = (filterWords: string[]) => {
    if (!filterWords) return false
    if (filterWords.length === 0) return false
    if (filterWords.length === 1 && filterWords[0].trim() === '') return false
    return true
}

const flattenSearchItems = (items: (SearchableBlogPost | SearchableStory | SearchableProject | SearchableBook)[]): SearchableItem[] => (
    items.map(i => ({
        type: i.type,
        meta: createLookupMeta(i.meta),
        slug: i.slug!,
        title: i.title
    }))
)

export const prepareGlobalValues = (query: GlobalQuery) => {
    const prep: GlobalSearch = {
        stories: query.allWpShortstory.nodes
            .sort((a, b) => new Date(b.shortStory.publishedOn).getTime() - new Date(a.shortStory.publishedOn).getTime())
            .map(story => ({ ...formatStory(story), type: 'story' })),
        books: query.allWpBook.nodes
            .sort((a, b) => new Date(b.book.publishedOn).getTime() - new Date(a.book.publishedOn).getTime())
            .map(book => ({ ...formatBook(book), type: 'book' })),
        projects: query.allWpProject.nodes
            .sort((a, b) => new Date(b.project.firstReleased).getTime() - new Date(a.project.firstReleased).getTime())
            .map(proj => ({ ...formatProject(proj), type: 'project' })),
        posts: query.allWpPost.nodes
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(post => ({ ...formatBlogPost(post), type: 'post' }))
    }
    return flattenSearchItems([...prep.stories, ...prep.books, ...prep.projects, ...prep.posts])
}