import * as React from 'react'
import { Link, navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Button, CustomLink, HoverImage } from '@Gen'
import {
  GroupingBox,
  RowUntilPhone,
  CardSection,
  List,
  LItem,
  Column,
  SubHeading,
} from '@Styles/general-components'

import { getPrettyDate } from '@Utils/dates'
import { rigorousTextFormat } from '@Utils/posts'

import { StoryHeaderProps } from '@Types/props/post-components'

const StoryHeader: React.FC<StoryHeaderProps> = ({ story }) => {
  return (
    <GroupingBox>
      <RowUntilPhone style={{ flexWrap: 'nowrap', alignItems: 'start' }}>
        <CardSection>
          <List>
            <LItem>Published on: {getPrettyDate(story.published.date)}</LItem>
            {story.book && (
              <>
                <LItem>
                  {story.book.relationship} of{' '}
                  <CustomLink to={`/book/${story.book.slug}`}>
                    {story.book.title}
                  </CustomLink>
                  : {rigorousTextFormat(story.book.content)}
                </LItem>
              </>
            )}
            {story.project && (
              <>
                <LItem>
                  Related Project:{' '}
                  <CustomLink to={`/project/${story.project.slug}`}>
                    {story.project.title}
                  </CustomLink>
                  . {story.project.description}
                </LItem>
              </>
            )}
          </List>
        </CardSection>
        {story.book && (
          <Link to={story.book.slug} aria-label={story.book.title}>
            {story.book.cover ? (
              <CardSection>
                <GatsbyImage image={story.book.cover} alt={story.book.title} />
              </CardSection>
            ) : (
              <CardSection>
                <HoverImage
                  publicURL={story.fallbackCover}
                  name={story.book!.title}
                />
              </CardSection>
            )}
          </Link>
        )}
        {story.alternateLinks && (
          <CardSection>
            <Column>
              <SubHeading>Alternate Links</SubHeading>
              <List>
                {story.alternateLinks.map((link, idx) => (
                  <LItem key={link.name + idx}>
                    <Button onClick={() => navigate(link.link)}>
                      On {link.name}
                    </Button>
                  </LItem>
                ))}
              </List>
            </Column>
          </CardSection>
        )}
      </RowUntilPhone>
    </GroupingBox>
  )
}

export default StoryHeader
