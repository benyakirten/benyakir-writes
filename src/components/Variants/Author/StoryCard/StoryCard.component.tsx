import * as React from "react";
import { Link, navigate } from "gatsby";

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

import { firstWords } from "@Utils/strings";

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
                        dangerouslySetInnerHTML={{
                            __html: item.book
                                ? firstWords(item.content, 200)
                                : firstWords(item.content, 500),
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
                        <DisappearOnPhone>
                            <CardSection>
                                <MinorHeading>
                                    <CustomLink to={`/book/${item.book.slug}`}>
                                        {item.book.relationship} of{" "}
                                        {item.book.title}
                                    </CustomLink>
                                </MinorHeading>
                                {item.book.cover ? (
                                    <Link to={`/book/${item.book.slug}`}>
                                        <HoverableContainer
                                            style={{ margin: "0 auto" }}
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
                        </DisappearOnPhone>
                    </DisappearOnTablet>
                )}
            </Row>
        </Card>
    );
};

export default StoryCard;
