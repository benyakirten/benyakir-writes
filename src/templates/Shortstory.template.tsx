import * as React from 'react';
import { graphql } from 'gatsby';

import { LeadHeading, WpContent, Grouping, Subtitle } from '@Styles/general-components';

import { flattenStory } from '@/utils/author';
import { getPrettyDate } from '@Utils/dates';
import { formatWpText } from '@Utils/posts';
import { firstWords } from '@Utils/strings';

import { WpStory } from '@Types/query';
import ShortStoryHeader from '@/components/Variants/Headers/ShortStoryHeader.component';

export const Head: React.FC<WpStory> = ({ data }) => {
  const story = flattenStory(data.wpShortstory, data.file.publicURL);
  return (
    <>
      <title>{story.title}</title>
      <meta
        name="description"
        content={`${story.title}, published on ${getPrettyDate(story.published.date)}${
          story.book ? `, related to ${story.book.title}` : null
        }: ${firstWords(formatWpText(story.content), 100)}`}
      />
    </>
  );
};

const Story: React.FC<WpStory> = ({ data }) => {
  const story = flattenStory(data.wpShortstory, data.file.publicURL);
  return (
    <>
      <LeadHeading>{story.title}</LeadHeading>
      <ShortStoryHeader story={story} />
      <Grouping>
        <Subtitle>The Story</Subtitle>
        <WpContent dangerouslySetInnerHTML={{ __html: story.content }} />
      </Grouping>
    </>
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
