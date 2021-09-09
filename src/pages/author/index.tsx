import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading, Subtitle } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import AuthorFilter from "@Posts/WritingFilters/AuthorFilter/AuthorFilter.component";
import Half from "@Variant/Author/Half/Half.component";
import BookCard from "@Variant/Author/BookCard/BookCard.component";
import StoryCard from "@Variant/Author/StoryCard/StoryCard.component";

import { formatAllBooks, formatAllStories } from "@Utils/author";

import { WpAuthor } from "@Types/query";
import { FlattenedBook, FlattenedStory } from "@Types/posts";

const AuthorPost: React.FC<WpAuthor> = ({ data }) => {
    console.log(data);
    const books = formatAllBooks(data.allWpBook.nodes);
    const stories = formatAllStories(data.allWpShortstory.nodes);

    const [filteredBooks, setFilteredBooks] =
        React.useState<FlattenedBook[]>(books);
    const [filteredStories, setFilteredStories] =
        React.useState<FlattenedStory[]>(stories);

    function handleFilter(
        newBooks: FlattenedBook[],
        newStories: FlattenedStory[]
    ) {
        setFilteredBooks(newBooks);
        setFilteredStories(newStories);
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
                <Half items={filteredBooks} El={BookCard} />
            </Grouping>
            <Grouping>
                <Subtitle>Short Stories</Subtitle>
                <Half items={filteredStories} El={StoryCard} />
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
        allWpShortstory {
            nodes {
                title
                content
                slug
                shortStory {
                    publishedOn
                    relatedBook {
                        ... on WpBook {
                            title
                            content
                            slug
                            book {
                                cover {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(
                                                formats: [AUTO, AVIF, WEBP]
                                                height: 150
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                    relationshipToBook
                }
            }
        }
    }
`;

export default AuthorPost;
