import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Grouping, LeadHeading } from "@Styles/general-components";

import LeadPage from "@Layout/LeadPage/LeadPage.component";
import StoryFilter from "@Posts/WritingFilters/StoryFilter/StoryFilter.component";
import Half from "@Variant/Author/Half/Half.component";
import StoryCard from "@Variant/Author/StoryCard/StoryCard.component";

import { formatAllStories } from "@Utils/author";

import { WpAllStories } from "@Types/query";
import { FlattenedStory } from "@Types/posts";

const ShortstoriesPage: React.FC<WpAllStories> = ({ data }) => {
    const stories = formatAllStories(data.allWpShortstory.nodes);

    const [filteredStories, setFilteredStories] =
        React.useState<FlattenedStory[]>(stories);

    return (
        <LeadPage
            filter={
                <StoryFilter stories={stories} onFilter={setFilteredStories} />
            }
        >
            <Helmet>
                <title>Benyakir Writes - Stories</title>
                <meta
                    name="description"
                    content="A view of all of my short stories. They can be filtered by their release date and keywords.
                    Get an overview of them on this page before reading them individually and seeing more details about them."
                />
            </Helmet>
            <LeadHeading>Short Stories</LeadHeading>
            <Grouping>
                <Half items={filteredStories} El={StoryCard} />
            </Grouping>
        </LeadPage>
    );
};
export const query = graphql`
    query {
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

export default ShortstoriesPage;
