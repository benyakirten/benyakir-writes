import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import BookFilter from "@Posts/WritingFilters/BookFilter/BookFilter.component";
import Half from "@Variant/Author/Half/Half.component";
import BookCard from "@Variant/Author/BookCard/BookCard.component";

import { formatAllBooks } from "@Utils/author";

import { WpAllBooks } from "@Types/query";
import { FlattenedBook } from "@Types/posts";

const BooksPage: React.FC<WpAllBooks> = ({ data }) => {
    const books = formatAllBooks(data.allWpBook.nodes);

    const [filteredBooks, setFilteredBooks] =
        React.useState<FlattenedBook[]>(books);

    return (
        <LeadPage
            filter={
                <BookFilter
                    books={books}
                    onFilter={setFilteredBooks}
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
            <LeadHeading>Books</LeadHeading>
            <Grouping>
                <Half items={filteredBooks} El={BookCard} />
            </Grouping>
        </LeadPage>
    );
};
export const query = graphql`
    query {
        allWpBook {
            nodes {
                slug
                title
                content
                book {
                    publishedOn
                    purchaseLinks
                    purchaseLinksNames
                    cover {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(
                                    formats: [AUTO, AVIF, WEBP]
                                    height: 200
                                )
                            }
                        }
                    }
                    relatedStories {
                        ... on WpShortstory {
                            title
                            slug
                        }
                    }
                    relatedProject {
                        ... on WpProject {
                            title
                        }
                    }
                    relatedProjectDesc
                }
            }
        }
    }
`;

export default BooksPage;
