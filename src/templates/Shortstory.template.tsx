import { graphql } from "gatsby";
import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	Subtitle,
	WpContent,
} from "@Styles/general-components";

import { flattenStory } from "@/utils/author";
import { getPrettyDate } from "@Utils/dates";
import { formatWpText } from "@Utils/posts";
import { truncate } from "@Utils/strings";

import ShortStoryHeader from "@/components/Variants/Headers/ShortStoryHeader.component";
import type { WpStory } from "@Types/query";
import { HeadBase } from "@/components/General";

export const Head: React.FC<WpStory> = ({ data }) => {
	const story = flattenStory(data.wpShortstory, data.file.publicURL);
	const description = `${story.title}, published on ${getPrettyDate(
		story.published.date,
	)}${
		story.book ? `, related to ${story.book.title}` : null
	}: ${truncate(formatWpText(story.content), 100)}`;

	return <HeadBase title={story.title} description={description} />;
};

const Story: React.FC<WpStory> = ({ data }) => {
	const story = flattenStory(data.wpShortstory, data.file.publicURL);
	return (
		<Page>
			<LeadHeading>{story.title}</LeadHeading>
			<ShortStoryHeader story={story} />
			<Grouping>
				<Subtitle>The Story</Subtitle>
				<WpContent dangerouslySetInnerHTML={{ __html: story.content }} />
			</Grouping>
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
