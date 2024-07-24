import * as React from "react";

import { Foldout } from "@Gen";
import { DatePicker, Filter, MultipleChoice } from "@Input";
import { SubHeading } from "@Styles/general-components";

import { useAlternation, useMultiSelect } from "@Hooks";

import { createChoiceSet } from "@Utils/filter";
import { hasSomeContent } from "@Utils/search";

import type { AllBlogFilterProps } from "@Types/props/post-components";

const CategoryFilter: React.FC<AllBlogFilterProps> = ({
	allPosts,
	onFilter,
}) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	// Min and day range is based on first and latest repo published
	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		allPosts.length > 0 ? allPosts[0].published.date : new Date(),
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		allPosts.length > 0
			? allPosts[allPosts.length - 1].published.date
			: new Date(),
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const _tags = React.useMemo(
		// TODO: Replace this with a function call
		() => [...new Set(allPosts.flatMap((p) => p.tags).filter((t) => !!t))],
		[allPosts],
	);

	const tags = React.useMemo(
		() => createChoiceSet(allPosts, "tags"),
		[allPosts],
	);
	const [tagChoices, setTagChoices, filterByTags] = useMultiSelect();

	React.useEffect(() => {
		let _posts = allPosts
			.filter((p) => p.published.date.getTime() <= publishedBefore.getTime())
			.filter((p) => p.published.date.getTime() >= publishedAfter.getTime());

		if (hasSomeContent(filterWords)) {
			_posts = _posts.filter((p) =>
				filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()]),
			);
		}

		_posts = filterByTags(_posts, (post) => post.tags);

		onFilter(_posts);
	}, [
		publishedBefore,
		publishedAfter,
		filterWords,
		onFilter,
		allPosts,
		filterByTags,
	]);

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
					height="20rem"
					cyId="foldout-tags"
				>
					<MultipleChoice
						tabIndex={dropdownOpen === "tags" ? 0 : -1}
						choices={tags}
						onSelect={setTagChoices}
					/>
				</Foldout>
			)}
		</Filter>
	);
};

export default CategoryFilter;
