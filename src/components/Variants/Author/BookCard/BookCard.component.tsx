import * as React from "react";
import { Link, navigate} from "gatsby";

import {
    Card,
    CardSection,
    CardDoubleSection,
    Paragraph,
    Row,
    SubHeading,
    Column,
    HoverableContainer,
    HoverableGatsbyImage,
    CardLinkBox,
    DisappearOnPhone,
    WpContentDescription,
} from "@Styles/general-components";

import Button from "@Gen/Button/Button.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { firstWords } from "@Utils/strings";

import { BookCardProps } from "@Types/props";

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
                        dangerouslySetInnerHTML={{
                            __html: firstWords(
                                item.content,
                                coverOrStories ? 200 : 600
                            ),
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
                                <Link to={`/book/${item.slug}`}>
                                    <HoverableContainer
                                        height={item.cover.height}
                                        width={item.cover.width}
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
                                        {
                                            item.stories!.length > 1
                                                ? "Stories"
                                                : "Story"
                                        }
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
