import * as React from "react";

import { SubHeading } from "@Styles/general-components";

import { Foldout } from "@Gen";
import { DatePicker, Filter } from "@Input";

import { useAlternation } from "@Hooks";
import { hasSomeContent } from "@Utils/search";

import type { BookFilterProps } from "@Types/props/post-components";

const BookFilter: React.FC<BookFilterProps> = ({ books, onFilter }) => {
	const memoizedBooks = React.useMemo(() => books, [books]);
	const memoizedFilterCb = React.useCallback(onFilter, []);
	const [dropdownOpen, setDropdown] = useAlternation();

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		books[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		books[books.length - 1].published.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	React.useEffect(() => {
		let filteredBooks = memoizedBooks
			.filter((b) => b.published.date.getTime() <= publishedBefore.getTime())
			.filter((b) => b.published.date.getTime() >= publishedAfter.getTime());

		if (hasSomeContent(filterWords)) {
			filteredBooks = filteredBooks.filter((b) =>
				filterWords.every((w) => b.meta[w] || b.meta[w.toLowerCase()]),
			);
		}

		memoizedFilterCb(filteredBooks);
	}, [
		publishedBefore,
		publishedAfter,
		filterWords,
		memoizedBooks,
		memoizedFilterCb,
	]);

	function setSearchString(filterString: string) {
		// This first line is redundant because there are already checks for empty strings
		// However, testing fails otherwise because the useDebounce hook will
		// cause an internal state change as the component is rendering
		// This line prevents that state change and allows the tests to work
		if (!filterString && !hasSomeContent(filterWords)) return;
		setFilterWords(filterString ? filterString.split(" ") : [""]);
	}

	return (
		<Filter name="books" onSearch={setSearchString}>
			<Foldout
				topbar={<SubHeading>Filter by date</SubHeading>}
				open={dropdownOpen === "date"}
				onClick={() => setDropdown("date")}
				height="10rem"
				cyId="foldout-dates"
			>
				<DatePicker
					name="book-published-before"
					value={publishedBefore}
					label="Published before"
					onChange={setPublishedBefore}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
				<DatePicker
					name="book-published-after"
					value={publishedAfter}
					label="Published after"
					onChange={setPublishedAfter}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
			</Foldout>
		</Filter>
	);
};

export default BookFilter;
