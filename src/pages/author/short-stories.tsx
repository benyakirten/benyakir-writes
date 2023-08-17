import * as React from 'react'

import { Grouping, Page } from '@Styles/general-components'

import { LeadPage, Paginate } from '@Layout'
import { StoryFilter } from '@Posts'
import { StoryCard } from '@Variants'

import { usePagination } from '@Hooks'

import storiesJson from '@WPData/Author/stories.json'

import { FlattenedStoryCard } from '@Types/posts'

export const Head: React.FC = () => (
  <>
    <title>Benyakir Writes - Stories</title>
    <meta
      name="description"
      content="A view of all of my short stories. They can be filtered by their release date and keywords.
            Get an overview of them on this page before reading them individually and seeing more details about them."
    />
  </>
)

const ShortstoriesPage: React.FC = () => {
  const stories = React.useMemo<FlattenedStoryCard[]>(
    () =>
      storiesJson.map((s: FlattenedStoryCard) => ({
        ...s,
        published: { ...s.published, date: new Date(s.published.date) },
      })),
    [storiesJson]
  )
  const storyPagination = usePagination<FlattenedStoryCard>(stories)

  return (
    <Page>
      <LeadPage
        title="Short Stories"
        filter={
          <StoryFilter
            stories={stories}
            onFilter={storyPagination.setCurrentItems}
          />
        }
      >
        <Grouping>
          <Paginate {...storyPagination} El={StoryCard} />
        </Grouping>
      </LeadPage>
    </Page>
  )
}

export default ShortstoriesPage
