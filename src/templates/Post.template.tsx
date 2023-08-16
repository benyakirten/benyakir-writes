import { graphql } from 'gatsby'
import * as React from 'react'

import { Grouping, LeadHeading, Page } from '@Styles/general-components'

import { createBlocks, preprocessWPEntry } from '@Utils/blocks/identify-blocks'
import { formatBlogPost } from '@Utils/blog'
import { formatWpText } from '@Utils/posts'
import { firstWords } from '@Utils/strings'

import { WpPost } from '@Types/query'
import { PostHeader } from '@Variants'

export const Head: React.FC<WpPost> = ({ data }) => {
  const post = formatBlogPost(data.wpPost)
  return (
    <>
      <title>Benyakir Writes - {post.title}</title>
      <meta
        name="description"
        content={firstWords(formatWpText(post.excerpt!), 150)}
      />
    </>
  )
}

const Post: React.FC<WpPost> = ({ data }) => {
  const entry = preprocessWPEntry(data.wpPost.content!)
  const blocks = createBlocks(entry)
  const post = formatBlogPost(data.wpPost)

  return (
    <Page>
      <LeadHeading>{post.title}</LeadHeading>
      <PostHeader post={post} />
      <Grouping>
        {blocks.map((block, idx) => (
          <div key={idx}>{block}</div>
        ))}
      </Grouping>
    </Page>
  )
}

export default Post

export const query = graphql`
  query ($id: String) {
    wpPost(id: { eq: $id }) {
      excerpt
      content
      title
      slug
      date
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
  }
`
