import * as React from "react"

import Filter from "@Input/Filter/Filter.component"
import DatePicker from "@Input/DatePicker/DatePicker.component"
import MultipleChoice from "@Input/MultipleChoice/MultipleChoice.component"
import Foldout from "@Gen/Foldout/Foldout.component"

import useDropdown from "@Hooks/useDropdown"

import { SubHeading} from "@Styles/general-components"

import { AllBlogFilterProps } from "@Types/props"
import { getMultipleChoiceHeight, getValuesForSelected } from "@Utils/filter"

const AllFilter: React.FC<AllBlogFilterProps> = ({
    allPosts,
    onFilter
}) => {
    const [dropdownOpen, setDropdown] = useDropdown()

    // Min and day range is based on first and latest repo published
    const [publishedBefore, setPublishedBefore] = React.useState<Date>(allPosts[0].published.date)
    const [publishedAfter, setPublishedAfter] = React.useState<Date>(allPosts[allPosts.length - 1].published.date)

    const [filterWords, setFilterWords] = React.useState<string[]>([])

    const _categories = React.useMemo(() => [...new Set(allPosts.flatMap(p => p.categories))], allPosts)
    const [categoryChoices, setCategoryChoices] = React.useState<PotentialChoice[]>(
        _categories.map((p) => ({
            value: p,
            selected: false,
        }))
    )

    const _tags = React.useMemo(() => [...new Set(allPosts.flatMap(p => p.tags))], allPosts)
    const [tagChoices, setTagChoices] = React.useState<PotentialChoice[]>(
        _tags.map(t => ({
            value: t,
            selected: false
        }))
    )

    React.useEffect(() => {
        let _posts = allPosts
            .filter(p => filterWords.every((w) => p.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(p => p.published.date.getTime() <= publishedBefore.getTime())
            .filter(p => p.published.date.getTime() >= publishedAfter.getTime())
        // It doesn't get any better here - I just am glad modern
        // computers are much more powerful than they used to be
        if (categoryChoices.some((c) => c.selected)) {
            const _cats = getValuesForSelected(categoryChoices)
            _posts = _posts.filter((p) => _cats.every((c) => p.categories.includes(c)))
        }

        if (tagChoices.some((t) => t.selected)) {
            const _ts = getValuesForSelected(tagChoices)
            console.log(_ts)
            _posts = _posts.filter((p) => _ts.every((t) => p.tags.includes(t)))
        }

        onFilter(_posts)
    }, [
        publishedBefore,
        publishedAfter,
        filterWords,
        categoryChoices,
        tagChoices
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
                topbar={<SubHeading>Filter by category</SubHeading>}
                open={dropdownOpen === "category"}
                onClick={() => setDropdown("category")}
                height={getMultipleChoiceHeight(categoryChoices)}
            >
                <MultipleChoice
                    choices={categoryChoices}
                    onSelect={setCategoryChoices}
                />
            </Foldout>
            <Foldout
                topbar={<SubHeading>Filter by tags</SubHeading>}
                open={dropdownOpen === "tags"}
                onClick={() => setDropdown("tags")}
                height={getMultipleChoiceHeight(tagChoices)}
                heightMultiplierOnPhone={4.05}
                heightMultiplierOnTablet={2}
            >
                <MultipleChoice
                    choices={tagChoices}
                    onSelect={setTagChoices}
                />
            </Foldout>
        </Filter>
    )
}

export default AllFilter
