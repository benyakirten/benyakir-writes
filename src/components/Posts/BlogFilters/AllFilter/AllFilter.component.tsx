import * as React from 'react'

import { SubHeading } from '@Styles/general-components'
import { Filter, DatePicker, MultipleChoice } from '@Input'
import { Foldout } from '@Gen'

import { useAlternation } from '@Hooks'

import { getMultipleChoiceHeight, getValuesForSelected } from '@Utils/filter'
import { hasSomeContent } from '@Utils/search'
import { multiplyCSSNumber } from '@Utils/strings'

import { AllBlogFilterProps } from '@Types/props/post-components'

const AllFilter: React.FC<AllBlogFilterProps> = ({ allPosts, onFilter }) => {
  const [dropdownOpen, setDropdown] = useAlternation()

  // Min and day range is based on first and latest repo published
  const [publishedBefore, setPublishedBefore] = React.useState<Date>(
    allPosts[0].published.date
  )
  const [publishedAfter, setPublishedAfter] = React.useState<Date>(
    allPosts[allPosts.length - 1].published.date
  )

  const [filterWords, setFilterWords] = React.useState<string[]>([])

  const _categories = React.useMemo(
    () => [
      ...new Set(allPosts.flatMap((p) => p.categories!).filter((c) => !!c)),
    ],
    allPosts
  )
  const [categoryChoices, setCategoryChoices] = React.useState<
    PotentialChoice[]
  >(
    _categories.map((p) => ({
      value: p,
      selected: false,
    }))
  )

  const _tags = React.useMemo(
    () => [...new Set(allPosts.flatMap((p) => p.tags!).filter((t) => !!t))],
    allPosts
  )
  const [tagChoices, setTagChoices] = React.useState<PotentialChoice[]>(
    _tags.map((t) => ({
      value: t,
      selected: false,
    }))
  )

  React.useEffect(() => {
    let _posts = allPosts
      .filter((p) => p.published.date.getTime() <= publishedBefore.getTime())
      .filter((p) => p.published.date.getTime() >= publishedAfter.getTime())

    if (hasSomeContent(filterWords)) {
      _posts = _posts.filter((p) =>
        filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()])
      )
    }

    if (categoryChoices.some((c) => c.selected)) {
      const _cats = getValuesForSelected(categoryChoices)
      _posts = _posts.filter((p) =>
        _cats.every((c) => p.categories && p.categories.includes(c))
      )
    }

    if (tagChoices.some((t) => t.selected)) {
      const _ts = getValuesForSelected(tagChoices)
      _posts = _posts.filter((p) =>
        _ts.every((t) => p.tags && p.tags.includes(t))
      )
    }

    onFilter(_posts)
  }, [
    publishedBefore,
    publishedAfter,
    filterWords,
    categoryChoices,
    tagChoices,
  ])

  function setSearchString(filterString: string) {
    // This line is redundant because there are already checks for empty strings
    // However, testing fails otherwise because the useDebounce hook will
    // cause an internal state change as the component is rendering
    // This line prevents that state change and allows the tests to work
    if (!filterString && !hasSomeContent(filterWords)) return
    setFilterWords(filterString ? filterString.split(' ') : [''])
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
          tabIndex={dropdownOpen === 'date' ? 0 : -1}
          name="project-published-before"
          value={publishedBefore}
          label="Published before"
          onChange={setPublishedBefore}
        />
        <DatePicker
          tabIndex={dropdownOpen === 'date' ? 0 : -1}
          name="project-published-after"
          value={publishedAfter}
          label="Published after"
          onChange={setPublishedAfter}
        />
      </Foldout>
      <Foldout
        topbar={<SubHeading>Filter by category</SubHeading>}
        open={dropdownOpen === 'category'}
        onClick={() => setDropdown('category')}
        height={multiplyCSSNumber(
          getMultipleChoiceHeight(categoryChoices),
          1.4
        )}
        heightMultiplierOnPhone={2.4}
        heightMultiplierOnTablet={2}
        cyId="foldout-categories"
      >
        <MultipleChoice
          tabIndex={dropdownOpen === 'category' ? 0 : -1}
          choices={categoryChoices}
          onSelect={setCategoryChoices}
        />
      </Foldout>
      <Foldout
        topbar={<SubHeading>Filter by tags</SubHeading>}
        open={dropdownOpen === 'tags'}
        onClick={() => setDropdown('tags')}
        height="auto"
        cyId="foldout-tags"
      >
        <MultipleChoice
          tabIndex={dropdownOpen === 'tags' ? 0 : -1}
          choices={tagChoices}
          onSelect={setTagChoices}
        />
      </Foldout>
    </Filter>
  )
}

export default AllFilter
