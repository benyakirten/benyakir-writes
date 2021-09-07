import * as React from "react"

import Filter from "@Input/Filter/Filter.component"
import DatePicker from "@Input/DatePicker/DatePicker.component"
import MultipleChoice from "@Input/MultipleChoice/MultipleChoice.component"
import Foldout from "@Gen/Foldout/Foldout.component"

import useDropdown from "@Hooks/useDropdown"

import { SubHeading} from "@Styles/general-components"

import { ProjectsFilterProps } from "@Types/props"
import { getMultipleChoiceHeight, getValuesForSelected } from "@Utils/filter"

const ProjectFilter: React.FC<ProjectsFilterProps> = ({
    allProjects,
    allHosts,
    allTechs,
    onFilter
}) => {
    const [dropdownOpen, setDropdown] = useDropdown()

    // Min and day range is based on first and latest repo published
    const [publishedBefore, setPublishedBefore] = React.useState<Date>(allProjects[0].firstReleased.date)
    const [publishedAfter, setPublishedAfter] = React.useState<Date>(allProjects[allProjects.length - 1].firstReleased.date)

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
        // This is highly ineffecient - this is (potentially) o^3 time. However, it works and is readable
        // It's really allProjects.length * filterWords.length * project.meta.length
        // allProjects.length is currently something like 9. It could increase to more, on the other hand
        // filterWords.length is not likely more to be more than 1 or 2. At most it'll be something like 5 or 6
        // project.meta.length is not longer than 50 at most
        // That said, this is not a particularly efficient solution and won't scale well
        // However, this is for my personal blog site, so whatevs - the at most 1-2 megabytes of ram used to perform
        // this search won't tax modern computers. It would tax the computer I had as a child in 1996

        // However, the efficiency of this could be improved by changing all the techchoices and such to hashtables
        // I may do that at some point in the future
        let _projects = allProjects
            .filter(p => filterWords.every((w) => p.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(p => p.firstReleased.date.getTime() <= publishedBefore.getTime())
            .filter(p => p.firstReleased.date.getTime() >= publishedAfter.getTime())
        // It doesn't get any better here - I just am glad modern
        // computers are much more powerful than they used to be
        if (techChoices.some((t) => t.selected)) {
            const _techs = getValuesForSelected(techChoices)
            _projects = _projects.filter((p) =>_techs.every((t) => p.longTechnologies.includes(t)))
        }
        if (hostChoices.some((h) => h.selected)) {
            const _hosts = getValuesForSelected(hostChoices)
            _projects = _projects
                .filter((p) => !!p.hostedOn)
                .filter((p) => _hosts.every((h) => p.hostedOn!.includes(h)))
        }
        onFilter(_projects)
    }, [
        publishedBefore,
        publishedAfter,
        filterWords,
        techChoices,
        hostChoices,
    ])

    function setSearchString(filterString: string) {
        setFilterWords(filterString ? filterString.split(" ") : [" "])
    }

    return (
        <Filter name="projects" onSearch={setSearchString}>
            <Foldout
                topbar={<SubHeading>Filter by date</SubHeading>}
                open={dropdownOpen === "date"}
                onClick={() => setDropdown("date")}
                height="10rem"
            >
                <DatePicker
                    name="proect-published-before"
                    value={publishedBefore}
                    label="Published before"
                    onChange={setPublishedBefore}
                />
                <DatePicker
                    name="project-published-after"
                    value={publishedAfter}
                    label="Published after"
                    onChange={setPublishedAfter}
                />
            </Foldout>
            <Foldout
                topbar={<SubHeading>Filter by host</SubHeading>}
                open={dropdownOpen === "host"}
                onClick={() => setDropdown("host")}
                height={getMultipleChoiceHeight(hostChoices)}
            >
                <MultipleChoice
                    choices={hostChoices}
                    onSelect={setHostChoices}
                />
            </Foldout>
            <Foldout
                topbar={<SubHeading>Filter by technology</SubHeading>}
                open={dropdownOpen === "tech"}
                onClick={() => setDropdown("tech")}
                height={getMultipleChoiceHeight(techChoices)}
                heightMultiplierOnPhone={4.1}
                heightMultiplierOnTablet={2}
            >
                <MultipleChoice
                    choices={techChoices}
                    onSelect={setTechChoices}
                />
            </Foldout>
        </Filter>
    )
}

export default ProjectFilter
