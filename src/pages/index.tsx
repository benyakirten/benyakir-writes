import * as React from 'react'

import { CustomLink } from '@Gen'
import {
  BigParagraph,
  Grouping,
  LeadHeading,
  Page,
  Subtitle,
} from '@Styles/general-components'

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - Home</title>
    <meta
      name="description"
      content="Benyakir Writes is a portal to my latest work. Learn about the latest books, projects and short stories I've written.
            Or check out my blog posts, reviews of books or podcast episodes."
    />
  </>
)

const IndexPage: React.FC = () => {
  return (
    <Page>
      <LeadHeading>Welcome to Benyakir Writes</LeadHeading>
      <Grouping>
        <BigParagraph>
          Hello stranger or welcome back. Struggling to find a better term, I
          call this website an outlet. As an author, I write about the oncoming
          future and how us humans face the chaos of our own making. As a
          programmer, I participate in it and embrace the wonders that our
          modernity can provide. Plus, it's not that hard to make something that
          looks halfway decent--let's not talk about mobile right now, okay?
          Sidebars are great on a tablet or desktop, but they are dangerous and
          need to be carefully managed on mobile.
        </BigParagraph>
      </Grouping>
      <Grouping>
        <Subtitle>To get started, click on the bar to the left.</Subtitle>
        <BigParagraph>
          Inside you'll find the nav menu. From there you can read articles from
          my blog, about me as an author or as a programmer and web designer.
          Also you can unfold each subsection and directly access what you want
          to see.
        </BigParagraph>
      </Grouping>
      <Grouping>
        <Subtitle>Need to contact me?</Subtitle>
        <BigParagraph>
          If you want to learn about what I can offer you (in terms of web
          design or programming), you can look at my{' '}
          <CustomLink to="/portfolio">portfolio</CustomLink>. Or you can send me
          an email at{' '}
          <CustomLink outside to="mailto:ben@benyakiredits.com">
            ben@benyakiredits.com
          </CustomLink>
          .
        </BigParagraph>
      </Grouping>
    </Page>
  )
}

export default IndexPage
