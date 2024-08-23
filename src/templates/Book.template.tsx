import { graphql } from "gatsby";
import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	Subtitle,
	WpContent,
} from "@Styles/general-components";

import { flattenBook } from "@Utils/author";
import { getPrettyDate } from "@Utils/dates";
import { formatWpText } from "@Utils/posts";
import { truncate } from "@Utils/strings";

import type { WpBook } from "@Types/query";
import { BookHeader } from "@Variants";
import { HeadBase } from "@/components/General";

export const Head: React.FC<WpBook> = ({ data }) => {
	const book = flattenBook(data.wpBook, data.file.publicURL);
	const description = `${book.title}, published on ${getPrettyDate(
		book.published.date,
	)}: ${truncate(formatWpText(book.content), 100)}`;

	return <HeadBase title={book.title} description={description} />;
};

const Book: React.FC<WpBook> = ({ data }) => {
	const book = flattenBook(data.wpBook, data.file.publicURL);
	return (
		<Page>
			<LeadHeading>{book.title}</LeadHeading>
			<BookHeader book={book} />
			<Grouping>
				<Subtitle>The Book</Subtitle>
				<WpContent dangerouslySetInnerHTML={{ __html: book.content }} />
			</Grouping>
		</Page>
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
