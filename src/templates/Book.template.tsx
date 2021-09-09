import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import { navigate } from "@reach/router";

import {
    LeadHeading,
    Row,
    Column,
    SubHeading,
    Grouping,
    List,
    LItem,
    CardSection,
    CardDoubleSection,
    MinorHeading,
    WpContent,
    Subtitle,
    GroupingBox,
    RowUntilPhone,
} from "@Styles/general-components";

import Button from "@Gen/Button/Button.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";
import HoverImage from "@Gen/HoverImage/HoverImage.component";

import { flattenBook } from "@Utils/author";
import { formatWpText } from "@Utils/posts";
import { firstWords } from "@Utils/strings";
import { getPrettyDate } from "@Utils/dates";

import { WpBook } from "@Types/query";;

const Book: React.FC<WpBook> = ({ data }) => {
    const book = flattenBook(data.wpBook, data.file.publicURL);
    return (
        <>
            <Helmet>
                <title>{book.title}</title>
                <meta
                    name="description"
                    content={`${book.title}, published on ${getPrettyDate(
                        book.published.date
                    )}: ${firstWords(formatWpText(book.content), 100)}`}
                />
            </Helmet>
            <LeadHeading>{book.title}</LeadHeading>
            <GroupingBox>
                <RowUntilPhone style={{ flexWrap: "nowrap", alignItems: "start" }}>
                    {book.cover ? (
                        <CardSection>
                            <GatsbyImage image={book.cover} alt={book.title} />
                        </CardSection>
                    ) : (
                        <CardSection>
                            <HoverImage
                                publicURL={book.fallbackCover}
                                name={book.title}
                                color='#fff'
                                size="20rem"
                                square
                                marginRightOnPhone="-1rem"
                            />
                        </CardSection>
                    )}
                    <CardDoubleSection>
                        <List>
                            <LItem>
                                Published on:{" "}
                                {getPrettyDate(book.published.date)}
                            </LItem>
                            {book.coverDesigner && (
                                <List>
                                    <LItem>
                                        <MinorHeading>
                                            Cover designer:{" "}
                                            {book.coverDesigner.name}
                                        </MinorHeading>
                                    </LItem>
                                    <LItem>{book.coverDesigner.bio}</LItem>
                                    {book.coverDesigner.links &&
                                        book.coverDesigner.links.map(
                                            (l, idx) => (
                                                <LItem key={l.name + idx}>
                                                    <CustomLink to={l.link}>
                                                        {l.name}
                                                    </CustomLink>
                                                </LItem>
                                            )
                                        )}
                                </List>
                            )}
                            {book.project && (
                                <List>
                                    <LItem>
                                        <MinorHeading>
                                            <CustomLink
                                                to={`/project/${book.project.slug}`}
                                            >
                                                Related Project:{" "}
                                                {book.project.title}
                                            </CustomLink>
                                        </MinorHeading>
                                    </LItem>
                                    <LItem>{book.project.description}</LItem>
                                </List>
                            )}
                        </List>
                    </CardDoubleSection>
                    <CardDoubleSection>
                        <Column>
                            <SubHeading>Purchase Links</SubHeading>
                            <Row>
                                {book.purchaseLinks.map((link, idx) => (
                                    <Button
                                        key={link.name + idx}
                                        onClick={() => navigate(link.link)}
                                    >
                                        On {link.name}
                                    </Button>
                                ))}
                            </Row>
                            {book.stories && (
                                <Column>
                                    <SubHeading>Related Stories</SubHeading>
                                    {book.stories.map((s) => (
                                        <>
                                            <MinorHeading key={s.title}>
                                                <CustomLink
                                                    to={`/story/${s.slug}`}
                                                >
                                                    {s.title}
                                                </CustomLink>
                                            </MinorHeading>
                                            <WpContent
                                                dangerouslySetInnerHTML={{
                                                    __html: s.content,
                                                }}
                                            />
                                        </>
                                    ))}
                                </Column>
                            )}
                        </Column>
                    </CardDoubleSection>
                </RowUntilPhone>
            </GroupingBox>
            <Grouping>
                <Subtitle>The Book</Subtitle>
                <WpContent dangerouslySetInnerHTML={{ __html: book.content }} />
            </Grouping>
        </>
    );
};

export const query = graphql`
    query ($id: String) {
        wpBook(id: { eq: $id }) {
            title
            content
            book {
                coverDesigner
                coverDesignerBio
                coverDesignerLinks
                coverDesignerLinksNames
                publishedOn
                purchaseLinks
                purchaseLinksNames
                relatedProject {
                    ... on WpProject {
                        title
                        slug
                    }
                }
                relatedProjectDesc
                relatedStories {
                    ... on WpShortstory {
                        title
                        slug
                        content
                    }
                }
                cover {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                height: 300
                                formats: [AVIF, WEBP, AUTO]
                            )
                        }
                    }
                }
            }
        }
        file(name: { eq: "Fallback-cover" }) {
            publicURL
        }
    }
`;

export default Book;
