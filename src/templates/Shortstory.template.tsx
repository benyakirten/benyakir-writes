import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";

import Button from "@Gen/Button/Button.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";
import HoverImage from "@Gen/HoverImage/HoverImage.component";
import {
    LeadHeading,
    GroupingBox,
    CardSection,
    List,
    LItem,
    Column,
    SubHeading,
    WpContent,
    Grouping,
    Subtitle,
    RowUntilPhone
} from "@Styles/general-components";

import { flattenStory } from "@/utils/author";
import { getPrettyDate } from "@Utils/dates";
import { formatWpText, rigorousTextFormat } from "@Utils/posts";
import { firstWords } from "@Utils/strings";

import { WpStory } from "@Types/query";

const Story: React.FC<WpStory> = ({ data }) => {
    const story = flattenStory(data.wpShortstory, data.file.publicURL);
    return (
        <>
            <Helmet>
                <title>{story.title}</title>
                <meta
                    name="description"
                    content={`${story.title}, published on ${getPrettyDate(
                        story.published.date
                    )}${
                        story.book ? `, related to ${story.book.title}` : null
                    }: ${firstWords(formatWpText(story.content), 100)}`}
                />
            </Helmet>
            <LeadHeading>{story.title}</LeadHeading>
            <GroupingBox>
                <RowUntilPhone
                    style={{ flexWrap: "nowrap", alignItems: "start" }}
                >
                    <CardSection>
                        <List>
                            <LItem>
                                Published on:{" "}
                                {getPrettyDate(story.published.date)}
                            </LItem>
                            {story.book && (
                                <>
                                    <LItem>
                                        {story.book.relationship} of{" "}
                                        <CustomLink to={`/book/${story.book.slug}`}>
                                            {story.book.title}
                                        </CustomLink>
                                        :{" "}
                                        {rigorousTextFormat(story.book.content)}
                                    </LItem>
                                </>
                            )}
                            {story.project && (
                                <>
                                    <LItem>
                                        Related Project:{" "}
                                        <CustomLink
                                            to={`/project/${story.project.slug}`}
                                        >
                                            {story.project.title}
                                        </CustomLink>
                                        . {story.project.description}
                                    </LItem>
                                </>
                            )}
                        </List>
                    </CardSection>
                    {story.book && (
                        <Link
                            to={story.book.slug}
                            aria-label={story.book.title}
                        >
                            {story.book.cover ? (
                                <CardSection>
                                    <GatsbyImage
                                        image={story.book.cover}
                                        alt={story.book.title}
                                    />
                                </CardSection>
                            ) : (
                                <CardSection>
                                    <HoverImage
                                        publicURL={story.fallbackCover}
                                        name={story.book!.title}
                                    />
                                </CardSection>
                            )}
                        </Link>
                    )}
                    {story.alternateLinks && (
                        <CardSection>
                            <Column>
                                <SubHeading>Alternate Links</SubHeading>
                                <List>
                                    {story.alternateLinks.map((link, idx) => (
                                        <LItem key={link.name + idx}>
                                            <Button
                                                onClick={() =>
                                                    navigate(link.link)
                                                }
                                            >
                                                On {link.name}
                                            </Button>
                                        </LItem>
                                    ))}
                                </List>
                            </Column>
                        </CardSection>
                    )}
                </RowUntilPhone>
            </GroupingBox>
            <Grouping>
                <Subtitle>The Story</Subtitle>
                <WpContent
                    dangerouslySetInnerHTML={{ __html: story.content }}
                />
            </Grouping>
        </>
    );
};

export const query = graphql`
    query ($id: String) {
        file(name: { eq: "Fallback-cover" }) {
            publicURL
        }
        wpShortstory(id: { eq: $id }) {
            content
            title
            slug
            shortStory {
                alternateLinks
                alternateLinksNames
                publishedOn
                relationshipToBook
                relatedBook {
                    ... on WpBook {
                        content
                        slug
                        title
                        book {
                            relatedProjectDesc
                            relatedProject {
                                ... on WpProject {
                                    title
                                    slug
                                }
                            }
                            cover {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData(
                                            height: 150
                                            formats: [AUTO, AVIF, WEBP]
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default Story;
