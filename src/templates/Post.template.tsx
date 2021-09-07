import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import {
    Grouping,
    GroupingBox,
    LeadHeading,
    Row,
    Column,
    SubHeading,
    Paragraph,
} from "@Styles/general-components";

import { firstWords } from "@Utils/strings";
import { formatWpText } from "@Utils/posts";
import { formatBlogPost } from "@Utils/blog";
import { createBlocks, preprocessWPEntry } from "@Utils/identify-blocks";

import { WpPost } from "@Types/query";
import { getPrettyDate } from "@/utils/dates";

const Post: React.FC<WpPost> = ({ data }) => {
    const entry = preprocessWPEntry(data.wpPost.content!);
    const blocks = createBlocks(entry);
    const post = formatBlogPost(data.wpPost);

    return (
        <>
            <Helmet>
                <title>Benyakir Writes - {post.title}</title>
                <meta
                    name="description"
                    content={firstWords(formatWpText(post.excerpt!), 150)}
                />
            </Helmet>
            <LeadHeading>{post.title}</LeadHeading>
            <GroupingBox>
                <Row style={{ justifyContent: "space-between" }}>
                    <Column>
                        <SubHeading>
                            {post.categories.length > 1
                                ? "Categories"
                                : "Category"}
                        </SubHeading>
                        <Paragraph>{post.categories.join(", ")}</Paragraph>
                    </Column>
                    <Column>
                        {post.tags.length > 0 && (
                            <>
                                <SubHeading>
                                    {post.tags.length > 1 ? "Tags" : "Tag"}
                                </SubHeading>
                                <Paragraph>{post.tags.join(", ")}</Paragraph>
                            </>
                        )}
                    </Column>
                    <Column>
                        <SubHeading>Posted</SubHeading>
                        <Paragraph>{getPrettyDate(post.published.date)}</Paragraph>
                    </Column>
                </Row>
            </GroupingBox>
            <Grouping>
                {blocks.map((block, idx) => (
                    <div key={idx}>{block}</div>
                ))}
            </Grouping>
        </>
    );
};

export default Post;

export const query = graphql`
    query ($id: String) {
        wpPost(id: { eq: $id }) {
            excerpt
            content
            title
            slug
            date
            categories {
                nodes {
                    name
                }
            }
            tags {
                nodes {
                    name
                }
            }
        }
    }
`;
