import { createSearchableString } from "./posts";
import { getTimeFromDateString } from "./dates";
import { firstWords } from "./strings";

import {
    BookType,
    FlattenedBook,
    FlattenedStory,
    FlattenedSingleBook,
    FlattenedSingleStory,
    PartialFlattenedBook,
    PartialFlattenedStory,
    SingleBook,
    SingleStory,
    StoryType
} from "@Types/posts";

export const formatAllBooks = (books: BookType[]): FlattenedBook[] => (
    books
        .map(b => formatBook(b))
        .sort((a, b) => b.published.date.getTime() - a.published.date.getTime())
)

export const formatBook = (book: BookType): FlattenedBook => {
    let links = book.book.purchaseLinks.split(', ')
    let linkNames = book.book.purchaseLinksNames.split(', ')
    let purchaseLinks = []
    for (let i = 0; i < links.length; i++) {
        purchaseLinks.push({
            link: links[i],
            name: i < linkNames.length ? linkNames[i] : links[i]
        })
    }
    const _book: PartialFlattenedBook = {
        slug: book.slug,
        title: book.title,
        published: getTimeFromDateString(book.book.publishedOn),
        content: book.content,
        cover: book.book.cover ? book.book.cover.localFile.childImageSharp.gatsbyImageData : null,
        stories: book.book.relatedStories,
        project: !book.book.relatedProject ? null : {
            ...book.book.relatedProject,
            description: book.book.relatedProjectDesc
        },
        purchaseLinks
    }
    const flattenedBook: FlattenedBook = {
        ..._book,
        meta: createMetaForBook(_book)
    }
    return flattenedBook;
}

export const createMetaForBook = (book: PartialFlattenedBook) => {
    let data = [
        book.title,
        book.content,
        book.published.full,
        book.published.short,
        book.published.year,
        book.project?.title,
        book.project?.description
    ]
    if (book.stories) {
        data = data.concat(book.stories.map(s => s.title))
    }
    return createSearchableString(data.filter(d => !!d))
}

export const formatAllStories = (stories: StoryType[]): FlattenedStory[] => (
    stories
        .map(s => formatStory(s))
        .sort((a, b) => b.published.date.getTime() - a.published.date.getTime())
)

export const formatStory = (story: StoryType): FlattenedStory => {
    const _story: PartialFlattenedStory = {
        slug: story.slug,
        title: story.title,
        content: story.content,
        published: getTimeFromDateString(story.shortStory.publishedOn),
        book: !story.shortStory.relatedBook ? null : {
            title: story.shortStory.relatedBook.title,
            slug: story.shortStory.relatedBook.slug,
            content: firstWords(story.shortStory.relatedBook.content, 250),
            relationship: story.shortStory.relationshipToBook ? story.shortStory.relationshipToBook : 'Related story',
            cover: story.shortStory.relatedBook.book && story.shortStory.relatedBook.book.cover
                ? story.shortStory.relatedBook.book.cover.localFile.childImageSharp.gatsbyImageData
                : null
        }
    }
    const flattenedStory: FlattenedStory = {
        ..._story,
        meta: createMetaForStory(_story)
    }
    return flattenedStory
}

export const createMetaForStory = (story: PartialFlattenedStory): string => {
    const data = [
        story.title,
        story.content,
        story.published.full,
        story.published.short,
        story.published.year
    ]
    if (story.book) {
        data.push(story.book.title)
        data.push(story.book.relationship)
    }
    return createSearchableString(data)
}

export const flattenBook = (book: SingleBook, fallbackCover: string): FlattenedSingleBook => {
    const allPurchaseLinks = book.book.purchaseLinks.split(", ")
    const allPurchaseLinkNames = book.book.purchaseLinksNames.split(", ")
    const purchaseLinks = allPurchaseLinks.map((l, idx) => ({
        link: l,
        name: allPurchaseLinkNames.length > idx ? allPurchaseLinkNames[idx] : l
    }))

    const data: FlattenedSingleBook = {
        title: book.title,
        content: book.content,
        purchaseLinks,
        published: getTimeFromDateString(book.book.publishedOn),
        project: book.book.relatedProject ? {
            title: book.book.relatedProject.title,
            slug: book.book.relatedProject.slug,
            description: book.book.relatedProjectDesc
        } : null,
        stories: book.book.relatedStories ? book.book.relatedStories.map(s => ({ ...s, content: firstWords(s.content, 100) })) : null,
        cover: book.book.cover ? book.book.cover.localFile.childImageSharp.gatsbyImageData : null,
        fallbackCover
    }

    if (book.book.coverDesigner && book.book.coverDesignerBio) {
        data.coverDesigner = {
            name: book.book.coverDesigner,
            bio: book.book.coverDesignerBio
        }
        if (book.book.coverDesignerLinks) {
            const bookDesignerLinks = book.book.coverDesignerLinks.split(", ")
            const bookDesignerLinkNames = book.book.coverDesignerLinksNames?.split(", ")
            const links = bookDesignerLinks.map((l, idx) => ({
                link: l,
                name: bookDesignerLinkNames && bookDesignerLinkNames.length > idx ? bookDesignerLinkNames[idx] : l
            }))
            data.coverDesigner.links = links
        }
    }
    return data;
}

export const flattenStory = (story: SingleStory, fallbackCover: string): FlattenedSingleStory => {
    const data: FlattenedSingleStory = {
        title: story.title,
        content: story.content,
        slug: story.slug,
        published: getTimeFromDateString(story.shortStory.publishedOn),
        book: !story.shortStory.relatedBook ? null : {
            title: story.shortStory.relatedBook.title,
            content: firstWords(story.shortStory.relatedBook.content, 150),
            slug: story.shortStory.relatedBook.slug,
            relationship: story.shortStory.relationshipToBook,
            cover: story.shortStory.relatedBook.book.cover ? story.shortStory.relatedBook.book.cover.localFile.childImageSharp.gatsbyImageData : null
        },
        project: !story.shortStory.relatedBook?.book.relatedProject ? null : {
            title: story.shortStory.relatedBook.book.relatedProject.title,
            slug: story.shortStory.relatedBook.book.relatedProject.slug,
            description: story.shortStory.relatedBook.book.relatedProjectDesc ? story.shortStory.relatedBook.book.relatedProjectDesc : 'Related project'
        },
        fallbackCover
    }

    if (story.shortStory.alternateLinks) {
        const storyLinks = story.shortStory.alternateLinks.split(", ")
        const storyLinkNames = story.shortStory.alternateLinksNames?.split(", ")
        const alternateLinks = storyLinks.map((l, idx) => ({
            link: l,
            name: storyLinkNames && storyLinkNames.length > idx ? storyLinkNames[idx] : l
        }))
        data.alternateLinks = alternateLinks
    }

    return data
}