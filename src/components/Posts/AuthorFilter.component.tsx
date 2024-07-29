import * as React from "react";

import { SubHeading } from "@Styles/general-components";

import { Foldout } from "@Gen";
import { DatePicker, Filter } from "@Input";

import { useAlternation } from "@Hooks";

import type { AuthorFilterProps } from "@Types/props/post-components";

const AuthorFilter: React.FC<AuthorFilterProps> = ({
	publishedBefore,
	publishedAfter,
	changePublishedAfter,
	changePublishedBefore,
	changeFilterWords,
}) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	return (
		<Filter name="books" onSearch={(val) => changeFilterWords(val.split(" "))}>
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
					onChange={changePublishedBefore}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
				<DatePicker
					name="book-published-after"
					value={publishedAfter}
					label="Published after"
					onChange={changePublishedAfter}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
			</Foldout>
		</Filter>
	);
};

export default AuthorFilter;
