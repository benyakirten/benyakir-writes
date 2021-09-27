import * as React from "react";

import Filter from "@Input/Filter/Filter.component";
import DatePicker from "@Input/DatePicker/DatePicker.component";
import MultipleChoice from "@Input/MultipleChoice/MultipleChoice.component";
import Foldout from "@Gen/Foldout/Foldout.component";

import { getMultipleChoiceHeight, getValuesForSelected } from "@Utils/filter";
import useDropdown from "@Hooks/useDropdown";

import { SubHeading } from "@Styles/general-components";

import { AllBlogFilterProps } from "@Types/props";
import { hasSomeContent } from "@/utils/search";

const CategoryFilter: React.FC<AllBlogFilterProps> = ({
    allPosts,
    onFilter,
}) => {
    const [dropdownOpen, setDropdown] = useDropdown();

    // Min and day range is based on first and latest repo published
    const [publishedBefore, setPublishedBefore] = React.useState<Date>(
        allPosts.length > 0 ? allPosts[0].published.date : new Date()
    );
    const [publishedAfter, setPublishedAfter] = React.useState<Date>(
        allPosts.length > 0
            ? allPosts[allPosts.length - 1].published.date
            : new Date()
    );

    const [filterWords, setFilterWords] = React.useState<string[]>([]);

    const _tags = React.useMemo(
        () => [...new Set(allPosts.flatMap((p) => p.tags!))],
        allPosts
    );
    const [tagChoices, setTagChoices] = React.useState<PotentialChoice[]>(
        _tags.map((t) => ({
            value: t,
            selected: false,
        }))
    );

    React.useEffect(() => {
        let _posts = allPosts
            .filter(
                (p) => p.published.date.getTime() <= publishedBefore.getTime()
            )
            .filter(
                (p) => p.published.date.getTime() >= publishedAfter.getTime()
            );

        if (hasSomeContent(filterWords)) {
            _posts = _posts.filter((p) =>
                filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()])
            );
        }

        if (tagChoices.some((t) => t.selected)) {
            const _ts = getValuesForSelected(tagChoices);
            _posts = _posts.filter((p) =>
                _ts.every((t) => p.tags && p.tags.includes(t))
            );
        }

        onFilter(_posts);
    }, [publishedBefore, publishedAfter, filterWords, tagChoices]);

    function setSearchString(filterString: string) {
        // This line is redundant because there are already checks for empty strings
        // However, testing fails otherwise because the useDebounce hook will
        // cause an internal state change as the component is rendering
        // This line prevents that state change and allows the tests to work
        if (!filterString && !hasSomeContent(filterWords)) return;
        setFilterWords(filterString ? filterString.split(" ") : [" "]);
    }

    return (
        <Filter name="projects" onSearch={setSearchString}>
            <Foldout
                topbar={<SubHeading>Filter by date</SubHeading>}
                open={dropdownOpen === "date"}
                onClick={() => setDropdown("date")}
                height="10rem"
                cyId="foldout-dates"
            >
                <DatePicker
                    tabIndex={dropdownOpen === "date" ? 0 : -1}
                    name="proect-published-before"
                    value={publishedBefore}
                    label="Published before"
                    onChange={setPublishedBefore}
                />
                <DatePicker
                    tabIndex={dropdownOpen === "date" ? 0 : -1}
                    name="project-published-after"
                    value={publishedAfter}
                    label="Published after"
                    onChange={setPublishedAfter}
                />
            </Foldout>
            {allPosts.length > 0 && (
                <Foldout
                    topbar={<SubHeading>Filter by tags</SubHeading>}
                    open={dropdownOpen === "tags"}
                    onClick={() => setDropdown("tags")}
                    height={getMultipleChoiceHeight(tagChoices)}
                    heightMultiplierOnPhone={4.2}
                    heightMultiplierOnTablet={3}
                    heightMultiplierOnLarger={1.45}
                    cyId="foldout-tags"
                >
                    <MultipleChoice
                        tabIndex={dropdownOpen === "tags" ? 0 : -1}
                        choices={tagChoices}
                        onSelect={setTagChoices}
                    />
                </Foldout>
            )}
        </Filter>
    );
};

export default CategoryFilter;
