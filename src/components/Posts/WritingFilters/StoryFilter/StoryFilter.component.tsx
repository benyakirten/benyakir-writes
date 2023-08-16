import * as React from 'react'

import { SubHeading } from '@Styles/general-components'

import { Filter, DatePicker } from '@Input'
import { Foldout } from '@Gen'

import { useAlternation } from '@Hooks'
import { hasSomeContent } from '@Utils/search'

import { StoryFilterProps } from '@Types/props/post-components'

const StoryFilter: React.FC<StoryFilterProps> = ({ stories, onFilter }) => {
  const [dropdownOpen, setDropdown] = useAlternation()

  // Min and day range is based on first and latest repo published
  const [publishedBefore, setPublishedBefore] = React.useState<Date>(
    stories[0].published.date
  )
  const [publishedAfter, setPublishedAfter] = React.useState<Date>(
    stories[stories.length - 1].published.date
  )

  const [filterWords, setFilterWords] = React.useState<string[]>([])

  React.useEffect(() => {
    let filteredStories = stories
      .filter((s) => s.published.date.getTime() <= publishedBefore.getTime())
      .filter((s) => s.published.date.getTime() >= publishedAfter.getTime())

    if (hasSomeContent(filterWords)) {
      filteredStories = filteredStories.filter((s) =>
        filterWords.every((w) => s.meta[w] || s.meta[w.toLowerCase()])
      )
    }

    onFilter(filteredStories)
  }, [publishedBefore, publishedAfter, filterWords])

  function setSearchString(filterString: string) {
    // This first line is redundant because there are already checks for empty strings
    // However, testing fails otherwise because the useDebounce hook will
    // cause an internal state change as the component is rendering
    // This line prevents that state change and allows the tests to work
    if (!filterString && !hasSomeContent(filterWords)) return
    setFilterWords(filterString ? filterString.split(' ') : [' '])
  }

  return (
    <Filter name="projects" onSearch={setSearchString}>
      <Foldout
        topbar={<SubHeading>Filter by date</SubHeading>}
        open={dropdownOpen === 'date'}
        onClick={() => setDropdown('date')}
        height="10rem"
        cyId="foldout-dates"
      >
        <DatePicker
          name="proect-published-before"
          value={publishedBefore}
          label="Published before"
          onChange={setPublishedBefore}
          tabIndex={dropdownOpen === 'date' ? 0 : -1}
        />
        <DatePicker
          name="project-published-after"
          value={publishedAfter}
          label="Published after"
          onChange={setPublishedAfter}
          tabIndex={dropdownOpen === 'date' ? 0 : -1}
        />
      </Foldout>
    </Filter>
  )
}

export default StoryFilter
