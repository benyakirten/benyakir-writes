import * as React from 'react'

import {
  Card,
  CardSection,
  Column,
  DisappearOnPhone,
  DisappearOnTablet,
  MinorHeading,
  Paragraph,
  Row,
  WpContentDescription,
} from '@Styles/general-components'

import { CustomLink } from '@Gen'

import { titleToKebab } from '@Utils/strings'
import { getPrettyDate } from '@Utils/dates'
import { BlogCardProps } from '@Types/props/post-components'
import { TextSection } from './BlogCard.styles'

const BlogCard: React.FC<BlogCardProps> = ({ item }) => {
  const hasCategoriesOrTags = item.categories || item.tags
  return (
    <Card style={{ height: '18rem' }}>
      <Row style={{ alignItems: 'start' }}>
        <CardSection>
          <Column>
            <TextSection>
              <MinorHeading>
                <CustomLink to={`/post/${item.slug}`}>{item.title}</CustomLink>
              </MinorHeading>
              <WpContentDescription
                fontSize="1.4rem"
                dangerouslySetInnerHTML={{
                  __html: item.excerpt!,
                }}
              />
            </TextSection>
            <DisappearOnTablet>
              <DisappearOnPhone>
                <MinorHeading>Posted on</MinorHeading>
                <Paragraph>{getPrettyDate(item.published.date)}</Paragraph>
              </DisappearOnPhone>
            </DisappearOnTablet>
          </Column>
        </CardSection>
        {hasCategoriesOrTags && (
          <DisappearOnTablet>
            <CardSection>
              <Column style={{ marginLeft: 'auto', width: '20rem' }}>
                {item.categories && (
                  <>
                    <MinorHeading>
                      {item.categories.length > 1 ? 'Categories' : 'Category'}
                    </MinorHeading>
                    <Paragraph style={{ margin: '0' }}>
                      {item.categories.map((cat) => (
                        <CustomLink
                          wholeline
                          to={`/blog/${titleToKebab(cat)}`}
                          key={cat}
                        >
                          {cat}
                        </CustomLink>
                      ))}
                    </Paragraph>
                  </>
                )}
                {item.tags && (
                  <>
                    <MinorHeading>
                      {item.tags.length > 1 ? 'Tags' : 'Tag'}
                    </MinorHeading>
                    <Paragraph style={{ margin: '0' }}>
                      {item.tags.join(', ')}
                    </Paragraph>
                  </>
                )}
              </Column>
            </CardSection>
          </DisappearOnTablet>
        )}
      </Row>
    </Card>
  )
}

export default BlogCard
