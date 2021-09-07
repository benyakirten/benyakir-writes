import * as React from "react";

import Filter from "@Input/Filter/Filter.component";
import DatePicker from "@Input/DatePicker/DatePicker.component";
import Foldout from "@Gen/Foldout/Foldout.component";

import useDropdown from "@Hooks/useDropdown";

import { SubHeading} from "@Styles/general-components";

import { StoryFilterProps } from "@Types/props";

const StoryFilter: React.FC<StoryFilterProps> = ({
    stories,
    onFilter
}) => {
    const [dropdownOpen, setDropdown] = useDropdown();

    // Min and day range is based on first and latest repo published
    const [publishedBefore, setPublishedAfter] = React.useState<Date>(stories[0].published.date)
    const [publishedAfter, setPublishedBefore] = React.useState<Date>(stories[stories.length - 1].published.date)

    const [filterWords, setFilterWords] = React.useState<string[]>([])

    React.useEffect(() => {
        const filteredStories = stories
            .filter(s => filterWords.every((w) => s.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(s => s.published.date.getTime() <= publishedBefore.getTime())
            .filter(s => s.published.date.getTime() >= publishedAfter.getTime());

        onFilter(filteredStories)
    }, [
        publishedBefore,
        publishedAfter,
        filterWords
    ]);

    function setSearchString(filterString: string) {
        setFilterWords(filterString ? filterString.split(' ') : [' ']);
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
        </Filter>
    );
};

export default StoryFilter;
