import * as React from "react";
import { Link, navigate } from "gatsby";

import {
    Card,
    CardSection,
    CardDoubleSection,
    Paragraph,
    Row,
    SubHeading,
    Column,
    CardLinkBox,
    DisappearOnPhone,
    WpContentDescription,
    HoverableContainer,
    HoverableGatsbyImage,
} from "@Styles/general-components";

import Button from "@Gen/Button/Button.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { BookCardProps } from "@Types/props/post-components";

const BookCard: React.FC<BookCardProps> = ({ item }) => {
    const coverOrStories = !!item.stories || !!item.cover;
    return (
        <Card>
            <Row style={{ alignItems: "stretch" }}>
                <CardDoubleSection>
                    <SubHeading noUnderline>
                        <CustomLink to={`/book/${item.slug}`}>
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
                                onClick={() => navigate(`/book/${item.slug}`)}
                            >
                                Read More
                            </Button>
                            {item.purchaseLinks.map((link, idx) => (
                                <Button
                                    key={link.name + idx}
                                    onClick={() => navigate(link.link)}
                                >
                                    On {link.name}
                                </Button>
                            ))}
                        </CardLinkBox>
                    </DisappearOnPhone>
                </CardDoubleSection>
                {coverOrStories && (
                    <DisappearOnPhone>
                        <CardSection>
                            {item.cover ? (
                                <Link
                                    aria-label={`Link to ${item.title}`}
                                    to={`/book/${item.slug}`}
                                >
                                    <HoverableContainer
                                        width={item.cover.width}
                                        height={item.cover.height}
                                    >
                                        <HoverableGatsbyImage
                                            image={item.cover}
                                            alt={item.title}
                                        />
                                    </HoverableContainer>
                                </Link>
                            ) : (
                                <Column>
                                    <SubHeading>
                                        Related Short{" "}
                                        {item.stories!.length > 1
                                            ? "Stories"
                                            : "Story"}
                                    </SubHeading>
                                    {item.stories!.map((s, idx) => (
                                        <Paragraph key={s.title + idx}>
                                            <CustomLink to={`/story/${s.slug}`}>
                                                {s.title}
                                            </CustomLink>
                                        </Paragraph>
                                    ))}
                                </Column>
                            )}
                        </CardSection>
                    </DisappearOnPhone>
                )}
            </Row>
        </Card>
    );
};

export default BookCard;
