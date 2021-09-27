import * as React from "react";
import { Helmet } from "react-helmet";

import { Grouping } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import Paginate from "@Layout/Paginate/Paginate.component";
import BookFilter from "@/components/Posts/WritingFilters/BookFilter/BookFilter.component";
import BookCard from "@Variant/Author/BookCard/BookCard.component";

import usePagination from "@Hooks/usePagination";

import booksJson from "@WPData/Author/books.json";

import { FlattenedBookCard } from "@Types/posts";

const BooksPage: React.FC = () => {
    const books = React.useMemo<FlattenedBookCard[]>(
        () => booksJson.map((b: FlattenedBookCard) => ({ ...b, published: { ...b.published, date: new Date(b.published.date) } })),
        [booksJson]
    )
    const bookPagination = usePagination<FlattenedBookCard>(books)

    return (
        <LeadPage
            title="Books"
            filter={
                <BookFilter
                    books={books}
                    onFilter={bookPagination.setCurrentItems}
                />
            }
        >
            <Helmet>
                <title>Benyakir Writes - Books</title>
                <meta
                    name="description"
                    content="A view of all of my published books. They can be filtered by keyword or date of publication. Get a quick preview of all
                    of the books before looking them up individually"
                />
            </Helmet>
            <Grouping>
                <Paginate
                    {...bookPagination}
                    El={BookCard}
                />
            </Grouping>
        </LeadPage>
    );
};

export default BooksPage;
