import * as React from "react";

import Filter from "@Input/Filter/Filter.component";
import DatePicker from "@Input/DatePicker/DatePicker.component";
import Foldout from "@Gen/Foldout/Foldout.component";

import useDropdown from "@Hooks/useDropdown";

import { SubHeading} from "@Styles/general-components";

import { BookFilterProps } from "@Types/props";

const BookFilter: React.FC<BookFilterProps> = ({
    books,
    onFilter
}) => {
    const [dropdownOpen, setDropdown] = useDropdown();

    // Min and day range is based on first and latest repo published
    const [publishedBefore, setPublishedAfter] = React.useState<Date>(books[0].published.date)
    const [publishedAfter, setPublishedBefore] = React.useState<Date>(books[books.length - 1].published.date)

    const [filterWords, setFilterWords] = React.useState<string[]>([])

    React.useEffect(() => {
        const filteredBooks = books
            .filter(b => filterWords.every((w) => b.meta.indexOf(w.toLowerCase()) !== -1))
            .filter(b => b.published.date.getTime() <= publishedBefore.getTime())
            .filter(b => b.published.date.getTime() >= publishedAfter.getTime());

        onFilter(filteredBooks)
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

export default BookFilter;
