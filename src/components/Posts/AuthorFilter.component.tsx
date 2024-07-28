import * as React from "react";

import { SubHeading } from "@Styles/general-components";

import { Foldout } from "@Gen";
import { DatePicker, Filter } from "@Input";

import { useAlternation } from "@Hooks";
import { hasSomeContent } from "@Utils/search";

import type { AuthorFilterProps } from "@Types/props/post-components";
import { AuthoredItemCard } from "@/types/posts";
import { deepEquals } from "@/utils/other";

const AuthorFilter: React.FC<AuthorFilterProps> = ({ items, onFilter }) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		items[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		items[items.length - 1].published.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	function filterBooks(
		publishedBefore: Date,
		publishedAfter: Date,
		filterWords: string[],
		items: AuthoredItemCard[],
		onFilter: (stories: AuthoredItemCard[]) => void,
	) {
		let filteredItems = items
			.filter((b) => b.published.date.getTime() <= publishedBefore.getTime())
			.filter((b) => b.published.date.getTime() >= publishedAfter.getTime());

		if (hasSomeContent(filterWords)) {
			filteredItems = filteredItems.filter((b) =>
				filterWords.every((w) => b.meta[w] || b.meta[w.toLowerCase()]),
			);
		}

		if (deepEquals(filteredItems, items)) {
			return;
		}

		onFilter(filteredItems);
	}
	filterBooks(publishedBefore, publishedAfter, filterWords, items, onFilter);

	return (
		<Filter name="books" onSearch={(val) => setFilterWords(val.split(" "))}>
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

export default AuthorFilter;
