import * as React from "react";

import { Foldout } from "@Gen";
import { DatePicker, Filter, MultipleChoice } from "@Input";
import { SubHeading } from "@Styles/general-components";

import { useAlternation, useMultiSelect } from "@Hooks";

import { createChoiceSet } from "@Utils/filter";
import { hasSomeContent } from "@Utils/search";

import type { BlogFilterProps } from "@Types/props/post-components";
import { FlattenedBlogCard } from "@/types/posts";

const BlogFilter: React.FC<BlogFilterProps> = ({ allPosts, onFilter }) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		allPosts[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		allPosts[allPosts.length - 1].published.date,
	);

	const posts = React.useMemo(() => allPosts, [allPosts]);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const categories = React.useMemo(
		() => createChoiceSet(allPosts, "categories"),
		[allPosts],
	);
	const tags = React.useMemo(
		() => createChoiceSet(allPosts, "tags"),
		[allPosts],
	);

	const [_, setCategoryChoices, filterByCategories] = useMultiSelect();
	const [_2, setTagChoices, filterByTags] = useMultiSelect();

	function filterBlogPosts(
		publishedBefore: Date,
		publishedAfter: Date,
		filterWords: string[],
		onFilter: (posts: FlattenedBlogCard[]) => void,
		allPosts: FlattenedBlogCard[],
		filterByCategories: (
			posts: FlattenedBlogCard[],
			filter: (post: FlattenedBlogCard) => string[],
		) => FlattenedBlogCard[],
		filterByTags: (
			posts: FlattenedBlogCard[],
			filter: (post: FlattenedBlogCard) => string[],
		) => FlattenedBlogCard[],
	) {
		let filteredPosts = allPosts
			.filter((p) => p.published.date.getTime() <= publishedBefore.getTime())
			.filter((p) => p.published.date.getTime() >= publishedAfter.getTime());

		if (hasSomeContent(filterWords)) {
			filteredPosts = filteredPosts.filter((p) =>
				filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()]),
			);
		}

		filteredPosts = filterByCategories(
			filteredPosts,
			(post) => post.categories ?? [""],
		);
		filteredPosts = filterByTags(filteredPosts, (post) => post.tags ?? [""]);

		onFilter(filteredPosts);
	}

	filterBlogPosts(
		publishedBefore,
		publishedAfter,
		filterWords,
		onFilter,
		posts,
		filterByCategories,
		filterByTags,
	);

	console.log("RENDERED");

	return (
		<Filter name="projects" onSearch={(val) => setFilterWords(val.split(" "))}>
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
					onSelect={setCategoryChoices}
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
					onSelect={setTagChoices}
				/>
			</Foldout>
		</Filter>
	);
};

export default BlogFilter;
