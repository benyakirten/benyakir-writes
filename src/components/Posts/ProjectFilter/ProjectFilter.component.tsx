import * as React from 'react'

import { SubHeading } from '@Styles/general-components'
import { Filter, DatePicker, MultipleChoice } from '@Input'
import { Foldout } from '@Gen'

import { useAlternation, useMultiSelect } from '@Hooks'
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

  const hosts = React.useMemo(
    () => allHosts.map((host) => ({ label: host, value: host })),
    allHosts
  )
  const techs = React.useMemo(
    () => allTechs.map((tech) => ({ label: tech, value: tech })),
    allTechs
  )
  const [hostChoices, setHostChoices] = useMultiSelect()
  const [techChoices, setTechChoices, filterByTechChoices] = useMultiSelect()

  React.useEffect(() => {
    let _projects = allProjects
      .filter(
        (p) => p.firstReleased.date.getTime() <= publishedBefore.getTime()
      )
      .filter((p) => p.firstReleased.date.getTime() >= publishedAfter.getTime())

    if (hasSomeContent(filterWords)) {
      _projects = _projects.filter((p) =>
        filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()])
      )
    }

    if (hostChoices.size > 0) {
      _projects = _projects.filter((project) =>
        hostChoices.has(project.hostedOn ?? '')
      )
    }

    console.log(_projects)
    _projects = filterByTechChoices(
      _projects,
      (project) => project.longTechnologies
    )

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
        height="20rem"
        heightMultiplierOnPhone={3}
        heightMultiplierOnTablet={1.6}
        cyId="foldout-host"
      >
        <MultipleChoice
          tabIndex={dropdownOpen === 'host' ? 0 : -1}
          choices={hosts}
          onSelect={setHostChoices}
        />
      </Foldout>
      <Foldout
        topbar={<SubHeading>Filter by technology</SubHeading>}
        open={dropdownOpen === 'tech'}
        onClick={() => setDropdown('tech')}
        height="20rem"
        cyId="foldout-tech"
      >
        <MultipleChoice
          choices={techs}
          onSelect={setTechChoices}
          tabIndex={dropdownOpen === 'tech' ? 0 : -1}
        />
      </Foldout>
    </Filter>
  )
}

export default ProjectFilter
