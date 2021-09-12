import * as React from "react";

import Filter from "@Input/Filter/Filter.component";
import DatePicker from "@Input/DatePicker/DatePicker.component";
import MultipleChoice from "@Input/MultipleChoice/MultipleChoice.component";
import Foldout from "@Gen/Foldout/Foldout.component";

import useDropdown from "@Hooks/useDropdown";
import { getMultipleChoiceHeight, getValuesForSelected } from "@Utils/filter";

import { SubHeading} from "@Styles/general-components";

import { AuthorFilterProps } from "@Types/props";
import { multiplyCSSNumber } from "@/utils/strings";

const AuthorFilter: React.FC<AuthorFilterProps> = ({
    allBooks,
    allStories,
    onFilter
}) => {
    const [dropdownOpen, setDropdown] = useDropdown();
    
    // Min and max date are determined by what's the first book or story published and idem for the latest one published
    const earliestPubDate = Math.min(allBooks[allBooks.length - 1].published.date.getTime(), allStories[allStories.length - 1].published.date.getTime())
    const latestPubDate = Math.max(allBooks[0].published.date.getTime(), allStories[0].published.date.getTime())
    
    const [publishedBefore, setPublishedBefore] = React.useState<Date>(new Date(latestPubDate))
    const [publishedAfter, setPublishedAfter] = React.useState<Date>(new Date(earliestPubDate))

    const [filterWords, setFilterWords] = React.useState<string[]>([])
    const [bookChoices, setBookChoices] = React.useState<PotentialChoice[]>(
        allBooks.map(b => ({
            value: b.title,
            selected: false
        }))
    )

    React.useEffect(() => {
        
        let filteredBooks = allBooks
            .filter(b => filterWords.every((w) => b.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(b => b.published.date.getTime() <= publishedBefore.getTime())
            .filter(b => b.published.date.getTime() >= publishedAfter.getTime());
        
        let filteredStories = allStories
            .filter(s => filterWords.every((w) => s.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(s => s.published.date.getTime() <= publishedBefore.getTime())
            .filter(s => s.published.date.getTime() >= publishedAfter.getTime());


        if (bookChoices.some(b => b.selected)) {
            const _bookChoices = getValuesForSelected(bookChoices)
            console.log(_bookChoices)
            console.log(filteredStories.filter(s => !!s.book).map(s => s.book?.title))
            filteredBooks = filteredBooks.filter(b => _bookChoices.some(c => c === b.title))
            filteredStories = filteredStories.filter(s => _bookChoices.some(c => c === s.book?.title))
        }
        
        onFilter(filteredBooks, filteredStories)
    }, [
        publishedBefore,
        publishedAfter,
        filterWords,
        bookChoices
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
            <Foldout
                topbar={<SubHeading>Filter by book</SubHeading>}
                open={dropdownOpen === "book"}
                onClick={() => setDropdown("book")}
                height={getMultipleChoiceHeight(bookChoices)}
                heightMultiplierOnPhone={3.4}
                heightMultiplierOnTablet={2}
                heightMultiplierOnLarger={1.4}
            >
                <MultipleChoice
                    choices={bookChoices}
                    onSelect={setBookChoices}
                />
            </Foldout>
        </Filter>
    );
};

export default AuthorFilter;
