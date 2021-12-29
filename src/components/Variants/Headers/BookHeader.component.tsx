import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";

import {
  GroupingBox,
  RowUntilPhone,
  CardSection,
  CardDoubleSection,
  List,
  LItem,
  Column,
  BigParagraph,
  Row,
  WpContent,
} from "@Styles/general-components";
import { Button, CustomLink, HoverImage } from "@Gen";

import { getPrettyDate } from "@Utils/dates";

import { BookHeaderProps } from "@Types/props/post-components";

const BookHeader: React.FC<BookHeaderProps> = ({ book }) => {
  return (
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
              color="#fff"
              size="20rem"
              square
              marginRightOnPhone="-1rem"
            />
          </CardSection>
        )}
        <CardDoubleSection>
          <List>
            <LItem>Published on: {getPrettyDate(book.published.date)}</LItem>
            {book.coverDesigner && (
              <>
                <LItem>Cover designer: {book.coverDesigner.name}</LItem>
                <LItem>{book.coverDesigner.bio}</LItem>
                {book.coverDesigner.links &&
                  book.coverDesigner.links.map((l, idx) => (
                    <LItem key={l.name + idx}>
                      <CustomLink outside to={l.link}>
                        {l.name}
                      </CustomLink>
                    </LItem>
                  ))}
              </>
            )}
            {book.project && (
              <>
                <LItem>
                  <CustomLink to={`/project/${book.project.slug}`}>
                    Related Project: {book.project.title}
                  </CustomLink>
                </LItem>
                <LItem>{book.project.description}</LItem>
              </>
            )}
          </List>
        </CardDoubleSection>
        <CardDoubleSection>
          <Column>
            <BigParagraph marginVertical="1rem">Purchase Links:</BigParagraph>
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
                <BigParagraph marginVertical="1rem">
                  Related Stories:
                </BigParagraph>
                {book.stories.map((s) => (
                  <React.Fragment key={s.title}>
                    <CustomLink to={`/story/${s.slug}`} small>
                      {s.title}
                    </CustomLink>
                    <WpContent
                      dangerouslySetInnerHTML={{
                        __html: s.content,
                      }}
                    />
                  </React.Fragment>
                ))}
              </Column>
            )}
          </Column>
        </CardDoubleSection>
      </RowUntilPhone>
    </GroupingBox>
  );
};

export default BookHeader;
