import { graphql } from "gatsby";
import * as React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "styled-components";

import {
	NormalPageContents,
	Page,
	Subtitle,
	TemplateHeaderContainer,
	TemplateHeaderTitle,
	WpContent,
} from "@/styles/general-components";
import { flattenBook } from "@/utils/author";
import { getPrettyDate } from "@/utils/dates";
import { formatWpText } from "@/utils/posts";
import { truncate } from "@/utils/strings";
import type { WpBook } from "@/types/query";
import { GrowableUnderline } from "@/components/General";
import { FONT_LG, SIZE_MD, SIZE_SM, SIZE_XS } from "@/styles/variables";
import { PublishedDate } from "@/components/Cards/IconedText.component";
import { BookCoverArtist } from "@/types/posts";
import { formatOutsideLink } from "@/utils/other";
import { NamedLink } from "@/types/general";
import { HeadBase } from "@/components/SEO";

export const Head: React.FC<WpBook> = ({ data }) => {
	const book = flattenBook(data.wpBook, data.file.publicURL);
	const description = `${book.title}, published on ${getPrettyDate(
		book.published.date,
	)}: ${truncate(formatWpText(book.content), 100)}`;

	return <HeadBase title={book.title} description={description} />;
};

const CenteredBookCover = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${SIZE_MD};
`;

const BookCover: React.FC<{ cover: IGatsbyImageData; alt: string }> = ({
	cover,
	alt,
}) => {
	return (
		<CenteredBookCover>
			<GatsbyImage image={cover} alt={alt} />
		</CenteredBookCover>
	);
};

const PurchaseLinkContiner = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${SIZE_SM};
`;

const PurchaseLinks: React.FC<{ links: NamedLink[] }> = ({ links }) => {
	return (
		<PurchaseLinkContiner>
			<p>Available for purchase&nbsp;</p>
			{links.map((link, i) => (
				<li key={link.name}>
					on{" "}
					<GrowableUnderline>
						<a href={formatOutsideLink(link.link)}>{link.name}</a>
					</GrowableUnderline>
					{i < links.length - 1 && ", "}
				</li>
			))}
		</PurchaseLinkContiner>
	);
};

const BookHeader: React.FC<{
	title: string;
	publishedOn: Date;
	purchaseLinks: NamedLink[];
}> = ({ title, publishedOn, purchaseLinks }) => {
	return (
		<TemplateHeaderContainer>
			<TemplateHeaderTitle>{title}</TemplateHeaderTitle>
			<PublishedDate date={publishedOn} />
			<PurchaseLinks links={purchaseLinks} />
		</TemplateHeaderContainer>
	);
};

const Card = styled.div`
	border-radius: ${SIZE_XS};
	border: 1px solid ${(props) => props.theme.base.border};
	
	padding: ${SIZE_SM};
	background-color: ${(props) => props.theme.base.background};
`;

const TitledCard: React.FC<{ title: string } & ChildrenProp> = ({
	title,
	children,
}) => {
	return (
		<Card>
			<Subtitle>{title}</Subtitle>
			{children}
		</Card>
	);
};

const CoverArtistContainer = styled.div`
  display: grid;
  gap: ${SIZE_SM};
`;

const CoverArtistName = styled.p`
  ${FONT_LG};
`;

const CoverArtistDetails: React.FC<{ details: BookCoverArtist }> = ({
	details,
}) => {
	return (
		<TitledCard title="Cover Designer">
			<CoverArtistContainer>
				<CoverArtistName>Artist: {details.name}</CoverArtistName>
				<p>{details.bio}</p>
				<ul>
					{details.links?.map((link) => (
						<li key={link.name}>
							<GrowableUnderline>
								<a href={formatOutsideLink(link.link)}>{link.name}</a>
							</GrowableUnderline>
						</li>
					))}
				</ul>
			</CoverArtistContainer>
		</TitledCard>
	);
};

const ContentContainer = styled.ul`
  display: grid;
  gap: ${SIZE_SM};
`;

const Book: React.FC<WpBook> = ({ data }) => {
	const book = flattenBook(data.wpBook, data.file.publicURL);

	return (
		<Page>
			<NormalPageContents>
				{book.cover && (
					<BookCover cover={book.cover} alt={`${book.title} Cover`} />
				)}
				<BookHeader
					title={book.title}
					publishedOn={book.published.date}
					purchaseLinks={book.purchaseLinks}
				/>
				<ContentContainer>
					{book.coverDesigner && (
						<li>
							<CoverArtistDetails details={book.coverDesigner} />
						</li>
					)}
					<li>
						<TitledCard title="Blurb">
							<WpContent dangerouslySetInnerHTML={{ __html: book.content }} />
						</TitledCard>
					</li>
				</ContentContainer>
			</NormalPageContents>
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
              gatsbyImageData(width: 400, formats: [AVIF, WEBP, AUTO])
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
