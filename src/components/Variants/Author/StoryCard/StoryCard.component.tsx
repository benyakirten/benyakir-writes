import * as React from "react";
import { Link, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import {
    Card,
    CardLinkBox,
    CardSection,
    DisappearOnPhone,
    DisappearOnTablet,
    HoverableContainer,
    HoverableGatsbyImage,
    MinorHeading,
    Row,
    SubHeading,
    WpContentDescription,
} from "@Styles/general-components";

import CustomLink from "@Gen/CustomLink/CustomLink.component";
import Button from "@Gen/Button/Button.component";

import { StoryCardProps } from "@Types/props";

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
    return (
        <Card>
            <Row style={{ alignItems: "stretch" }}>
                <CardSection>
                    <SubHeading noUnderline>
                        <CustomLink to={`/story/${item.slug}`}>
                            {item.title}
                        </CustomLink>
                    </SubHeading>
                    <WpContentDescription
                        fontSize="1.4rem"
                        dangerouslySetInnerHTML={{
                            __html: item.content,
                        }}
                    />
                    <DisappearOnPhone>
                        <CardLinkBox>
                            <Button
                                onClick={() => navigate(`/story/${item.slug}`)}
                            >
                                Read More
                            </Button>
                        </CardLinkBox>
                    </DisappearOnPhone>
                </CardSection>
                {item.book && (
                    <DisappearOnTablet>
                        <CardSection>
                            <MinorHeading>
                                <CustomLink to={`/book/${item.book.slug}`}>
                                    Related Book
                                </CustomLink>
                            </MinorHeading>
                            {item.book.cover ? (
                                <Link
                                    aria-label={`Link to ${item.book.title}`}
                                    to={`/book/${item.book.slug}`}
                                >
                                    <HoverableContainer
                                        height={item.book.cover.height}
                                        width={item.book.cover.width}
                                    >
                                        <HoverableGatsbyImage
                                            image={item.book.cover}
                                            alt={item.book.title}
                                        />
                                    </HoverableContainer>
                                </Link>
                            ) : (
                                <WpContentDescription
                                    dangerouslySetInnerHTML={{
                                        __html: item.book.content,
                                    }}
                                />
                            )}
                        </CardSection>
                    </DisappearOnTablet>
                )}
            </Row>
        </Card>
    );
};

export default StoryCard;
