import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import {
  LeadHeading,
  Grouping,
  WpContent,
  Subtitle,
} from "@Styles/general-components";

import { flattenBook } from "@Utils/author";
import { formatWpText } from "@Utils/posts";
import { firstWords } from "@Utils/strings";
import { getPrettyDate } from "@Utils/dates";

import { WpBook } from "@Types/query";
import { BookHeader } from "@Variants";

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
      <BookHeader book={book} />
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
              gatsbyImageData(height: 300, formats: [AVIF, WEBP, AUTO])
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
