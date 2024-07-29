import * as React from "react";

import { Foldout } from "@Gen";
import { DatePicker, Filter, MultipleChoice } from "@Input";
import { SubHeading } from "@Styles/general-components";
import { useAlternation } from "@Hooks";
import type { BlogFilterProps } from "@Types/props/post-components";

const BlogFilter: React.FC<BlogFilterProps> = ({
	publishedBefore,
	publishedAfter,
	categories,
	tags,
	changePublishedBefore,
	changePublishedAfter,
	changeFilterWords,
	changeCategories,
	changeTags,
}) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	return (
		<Filter
			name="projects"
			onSearch={(val) => changeFilterWords(val.split(" "))}
		>
			<Foldout
				topbar={<SubHeading>Filter by date</SubHeading>}
				open={dropdownOpen === "date"}
				onClick={() => setDropdown("date")}
				height="10rem"
				cyId="foldout-dates"
			>
				<DatePicker
					tabIndex={dropdownOpen === "date" ? 0 : -1}
					name="project-published-before"
					value={publishedBefore}
					label="Published before"
					onChange={changePublishedBefore}
				/>
				<DatePicker
					tabIndex={dropdownOpen === "date" ? 0 : -1}
					name="project-published-after"
					value={publishedAfter}
					label="Published after"
					onChange={changePublishedAfter}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by category</SubHeading>}
				open={dropdownOpen === "category"}
				onClick={() => setDropdown("category")}
				height="20rem"
				cyId="foldout-categories"
			>
				<MultipleChoice
					tabIndex={dropdownOpen === "category" ? 0 : -1}
					choices={categories}
					onSelect={changeCategories}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by tags</SubHeading>}
				open={dropdownOpen === "tags"}
				onClick={() => setDropdown("tags")}
				height="20rem"
				cyId="foldout-tags"
			>
				<MultipleChoice
					tabIndex={dropdownOpen === "tags" ? 0 : -1}
					choices={tags}
					onSelect={changeTags}
				/>
			</Foldout>
		</Filter>
	);
};

export default BlogFilter;
