import * as React from 'react'

import { SubHeading } from '@Styles/general-components'
import { Filter, DatePicker, MultipleChoice } from '@Input'
import { Foldout } from '@Gen'

import { useAlternation } from '@Hooks'
import { getMultipleChoiceHeight, getValuesForSelected } from '@Utils/filter'
import { hasSomeContent } from '@Utils/search'

import { ProjectsFilterProps } from '@Types/props/post-components'

const ProjectFilter: React.FC<ProjectsFilterProps> = ({
  allProjects,
  allHosts,
  allTechs,
  onFilter,
}) => {
  const [dropdownOpen, setDropdown] = useAlternation()

  const [publishedBefore, setPublishedBefore] = React.useState<Date>(
    allProjects[0].firstReleased.date
  )
  const [publishedAfter, setPublishedAfter] = React.useState<Date>(
    allProjects[allProjects.length - 1].firstReleased.date
  )

  const [filterWords, setFilterWords] = React.useState<string[]>([])

  const [hostChoices, setHostChoices] = React.useState<PotentialChoice[]>(
    allHosts.map((p) => ({
      value: p as string,
      selected: false,
    }))
  )

  const [techChoices, setTechChoices] = React.useState<PotentialChoice[]>(
    allTechs.map((t) => ({
      value: t,
      selected: false,
    }))
  )

  React.useEffect(() => {
    // Consult previous commits to compare this with previous forms
    let _projects = allProjects
      .filter(
        (p) => p.firstReleased.date.getTime() <= publishedBefore.getTime()
      )
      .filter((p) => p.firstReleased.date.getTime() >= publishedAfter.getTime())

    // The main change here is the change of every projects' meta from a string to a hashtable
    // This decreases the complexity from O(n + m + o) to O(n + m)
    // n is the number of projects and the largest element of the three
    // m is the number of filter words (usually 1 or 2)
    // o used to be the indexing of a string but is now constant time because it's looking up values in a hashtable
    if (hasSomeContent(filterWords)) {
      _projects = _projects.filter((p) =>
        filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()])
      )
    }

    if (techChoices.some((t) => t.selected)) {
      const _techs = getValuesForSelected(techChoices)
      _projects = _projects.filter((p) =>
        _techs.every((t) => p.longTechnologies.includes(t))
      )
    }
    if (hostChoices.some((h) => h.selected)) {
      const _hosts = getValuesForSelected(hostChoices)
      _projects = _projects
        .filter((p) => !!p.hostedOn)
        .filter((p) => _hosts.every((h) => p.hostedOn!.includes(h)))
    }
    onFilter(_projects)
  }, [publishedBefore, publishedAfter, filterWords, techChoices, hostChoices])

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
      <Foldout
        topbar={<SubHeading>Filter by host</SubHeading>}
        open={dropdownOpen === 'host'}
        onClick={() => setDropdown('host')}
        height={getMultipleChoiceHeight(hostChoices)}
        heightMultiplierOnPhone={3}
        heightMultiplierOnTablet={1.6}
        cyId="foldout-host"
      >
        <MultipleChoice
          tabIndex={dropdownOpen === 'host' ? 0 : -1}
          choices={hostChoices}
          onSelect={setHostChoices}
        />
      </Foldout>
      <Foldout
        topbar={<SubHeading>Filter by technology</SubHeading>}
        open={dropdownOpen === 'tech'}
        onClick={() => setDropdown('tech')}
        height="auto"
        cyId="foldout-tech"
      >
        <MultipleChoice
          choices={techChoices}
          onSelect={setTechChoices}
          tabIndex={dropdownOpen === 'tech' ? 0 : -1}
        />
      </Foldout>
    </Filter>
  )
}

export default ProjectFilter
