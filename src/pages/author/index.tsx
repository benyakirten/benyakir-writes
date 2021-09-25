import * as React from "react";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading, Subtitle } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import AuthorFilter from "@Posts/WritingFilters/AuthorFilter/AuthorFilter.component";
import BookCard from "@Variant/Author/BookCard/BookCard.component";
import StoryCard from "@Variant/Author/StoryCard/StoryCard.component";
import Paginate from "@Layout/Paginate/Paginate.component";

import usePagination from "@Hooks/usePagination";

import booksJson from "@WPData/Author/books.json";
import storiesJson from "@WPData/Author/stories.json"

import { FlattenedBookCard, FlattenedStoryCard } from "@Types/posts";

const AuthorPage: React.FC = () => {
    const books = React.useMemo<FlattenedBookCard[]>(
        () => booksJson.map((b: FlattenedBookCard) => ({ ...b, published: { ...b.published, date: new Date(b.published.date) } })),
        [booksJson]
    )

    const stories = React.useMemo<FlattenedStoryCard[]>(
        () => storiesJson.map((s: FlattenedStoryCard) => ({ ...s, published: { ...s.published, date: new Date(s.published.date) } })),
        [storiesJson]
    )

    const bookPagination = usePagination<FlattenedBookCard>(books)
    const storyPagination = usePagination<FlattenedStoryCard>(stories)

    function handleFilter(
        newBooks: FlattenedBookCard[],
        newStories: FlattenedStoryCard[]
    ) {
        bookPagination.setCurrentItems(newBooks);
        storyPagination.setCurrentItems(newStories);
    }

    return (
        <LeadPage
            filter={
                <AuthorFilter
                    allBooks={books}
                    allStories={stories}
                    onFilter={handleFilter}
                />
            }
        >
            <Helmet>
                <title>Benyakir Writes - Author</title>
                <meta
                    name="description"
                    content="A view of all of my short stories and published books. They can be filtered by keyword, date of publication,
                    or by relation to an individual book."
                />
            </Helmet>
            <LeadHeading>Author</LeadHeading>
            <Grouping>
                <Subtitle>Books</Subtitle>
                <Paginate
                    {...bookPagination}
                    El={BookCard}
                />
            </Grouping>
            <Grouping>
                <Subtitle>Short Stories</Subtitle>
                <Paginate
                    {...storyPagination}
                    El={StoryCard}
                />
            </Grouping>
        </LeadPage>
    );
};

export default AuthorPage;
