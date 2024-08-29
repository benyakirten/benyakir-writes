import { graphql, Link } from "gatsby";
import * as React from "react";
import styled from "styled-components";

import {
	NormalPageContents,
	Page,
	TemplateContent,
	TemplateHeaderContainer,
	TemplateHeaderTitle,
	WpContent,
} from "@/styles/general-components";
import { flattenStory } from "@/utils/author";
import { getPrettyDate } from "@/utils/dates";
import { formatWpText } from "@/utils/posts";
import { truncate } from "@/utils/strings";
import type { WpStory } from "@/types/query";
import { GrowableUnderline } from "@/components/General";
import { FONT_SM } from "@/styles/variables";
import { PublishedDate } from "@/components/Cards/IconedText.component";
import { NamedLink } from "@/types/general";
import { formatOutsideLink } from "@/utils/other";
import { HeadBase } from "@/components/SEO";

export const Head: React.FC<WpStory> = ({ data }) => {
	const story = flattenStory(data.wpShortstory, data.file.publicURL);
	const description = `${story.title}, published on ${getPrettyDate(
		story.published.date,
	)}${
		story.book ? `, related to ${story.book.title}` : null
	}: ${truncate(formatWpText(story.content), 100)}`;

	return <HeadBase title={story.title} description={description} />;
};

const StoryBookRelationshipContainer = styled.span`
  ${FONT_SM};
`;

const StoryBookRelationship: React.FC<{
	title: string;
	relationship: string;
	link: string;
}> = ({ title, relationship, link }) => {
	return (
		<StoryBookRelationshipContainer>
			{relationship} to{" "}
			<GrowableUnderline>
				<Link to={link}>{title}</Link>
			</GrowableUnderline>
		</StoryBookRelationshipContainer>
	);
};

const StoryHeader: React.FC<{
	title: string;
	published: Date;
	relatedBook: null | { title: string; relationship: string; link: string };
	alternateLinks?: NamedLink[];
}> = ({ title, published, relatedBook, alternateLinks }) => {
	return (
		<TemplateHeaderContainer>
			{relatedBook && <StoryBookRelationship {...relatedBook} />}
			<TemplateHeaderTitle>{title}</TemplateHeaderTitle>
			<PublishedDate date={published} />
			{alternateLinks && (
				<p>
					Available on{" "}
					{alternateLinks.map((link, i) => (
						<>
							<GrowableUnderline key={link.name}>
								<a href={formatOutsideLink(link.link)}>{link.name}</a>
							</GrowableUnderline>
							{i < alternateLinks.length - 1 && ", "}
						</>
					))}
				</p>
			)}
		</TemplateHeaderContainer>
	);
};

const Story: React.FC<WpStory> = ({ data }) => {
	const story = flattenStory(data.wpShortstory, data.file.publicURL);

	const relatedBook = story.book && {
		title: story.book.title,
		relationship: story.book.relationship,
		link: `/book/${story.book.slug}`,
	};

	return (
		<Page>
			<NormalPageContents>
				<StoryHeader
					title={story.title}
					published={story.published.date}
					relatedBook={relatedBook}
					alternateLinks={story.alternateLinks}
				/>
				<TemplateContent>
					<WpContent dangerouslySetInnerHTML={{ __html: story.content }} />
				</TemplateContent>
			</NormalPageContents>
		</Page>
	);
};

export const query = graphql`
  query ($id: String) {
    file(name: { eq: "Fallback-cover" }) {
      publicURL
    }
    wpShortstory(id: { eq: $id }) {
      content
      title
      slug
      shortStory {
        alternateLinks
        alternateLinksNames
        publishedOn
        relationshipToBook
        relatedBook {
          ... on WpBook {
            content
            slug
            title
            book {
              relatedProjectDesc
              relatedProject {
                ... on WpProject {
                  title
                  slug
                }
              }
              cover {
                localFile {
                  childImageSharp {
                    gatsbyImageData(height: 150, formats: [AUTO, AVIF, WEBP])
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Story;
