import * as React from "react";

import {
    Card,
    CardSection,
    Column,
    DisappearOnPhone,
    DisappearOnTablet,
    Paragraph,
    Row,
    SubHeading,
    WpContentDescription,
} from "@Styles/general-components";

import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { firstWords, titleToKebab } from "@Utils/strings";
import { getPrettyDate } from "@Utils/dates";

import { BlogCardProps } from "@Types/props";

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const categoryOrTags = post.categories || post.tags
    return (
        <Card style={{ height: "18rem" }}>
            <Row style={{ alignItems: "start" }}>
                <CardSection>
                    <Column>
                        <SubHeading noUnderline>
                            <CustomLink to={`/post/${post.slug}`}>
                                {firstWords(post.title, 18)}
                            </CustomLink>
                        </SubHeading>
                        <WpContentDescription
                            dangerouslySetInnerHTML={{
                                __html: categoryOrTags ? firstWords(post.excerpt!, 100) : firstWords(post.excerpt!, 300),
                            }}
                        />
                        <DisappearOnTablet>
                            <DisappearOnPhone>
                                <SubHeading>Posted on</SubHeading>
                                <Paragraph>
                                    {getPrettyDate(post.published.date)}
                                </Paragraph>
                            </DisappearOnPhone>
                        </DisappearOnTablet>
                    </Column>
                </CardSection>
                {categoryOrTags && (
                    <DisappearOnPhone>
                        <CardSection>
                            <Column
                                style={{ marginLeft: "auto", width: "12rem" }}
                            >
                                {post.categories && (
                                    <>
                                        <SubHeading>
                                            {post.categories.length > 1
                                                ? "Categories"
                                                : "Category"}
                                        </SubHeading>
                                        <Paragraph style={{ margin: "0" }}>
                                            {post.categories.map((cat) => (
                                                <CustomLink
                                                    to={`/blog/${titleToKebab(
                                                        cat
                                                    )}`}
                                                    key={cat}
                                                >
                                                    {cat}
                                                </CustomLink>
                                            ))}
                                        </Paragraph>
                                    </>
                                )}
                                {post.tags && (
                                    <>
                                        <SubHeading>
                                            {post.tags.length > 1
                                                ? "Tags"
                                                : "Tag"}
                                        </SubHeading>
                                        <Paragraph style={{ margin: "0" }}>
                                            {post.tags.join(", ")}
                                        </Paragraph>
                                    </>
                                )}
                            </Column>
                        </CardSection>
                    </DisappearOnPhone>
                )}
            </Row>
        </Card>
    );
};

export default BlogCard;
