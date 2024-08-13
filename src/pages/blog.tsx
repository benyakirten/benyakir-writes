import * as React from "react";

import { Grouping, Page, PageContents } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { BlogFilter } from "@Posts";
import { BlogCard } from "@Variants";
import usePagination from "@/hooks/usePagination.hook";
import type { FlattenedBlogCard } from "@/types/posts";
import { useMultiSelect } from "@/hooks";
import { createChoiceSet } from "@/utils/filter";
import { hasSomeContent } from "@/utils/search";
import { blogDescription, posts } from "@/data/search";
import { Filter } from "@/components/Filters";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Blogs</title>
		<meta name="description" content={blogDescription} />
	</>
);

const BlogPage: React.FC = () => {
	const postPagination = usePagination<FlattenedBlogCard>(posts);

	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	function handlePublishDate() {
		const before = new Date("2020-01-01");
		const after = new Date("2020-01-01");
		setFilters((filters) => [
			...filters,
			{ label: "Date", id: "date", before, after },
		]);
	}

	function handleSearch() {
		const label = "search";
		const id = Math.random().toString();
		const search = "";
		const type = "any";
		setFilters((filters) => [...filters, { label, search, type, id }]);
	}

	function handleKeywords() {
		const label = "Keywords";
		const currentKeywords = [
			{ label: "Test1", value: "test1" },
			{ label: "Test2", value: "test2" },
			{ label: "Test3", value: "test3" },
			{ label: "Test4", value: "test4" },
		];
		const allKeywords = [
			{ label: "Test1", value: "test1" },
			{ label: "Test2", value: "Test2" },
			{ label: "Test3", value: "test3" },
			{ label: "Test4", value: "Test4" },
			{ label: "Test5", value: "test5" },
			{ label: "Test6", value: "Test6" },
			{ label: "Test7", value: "test7" },
			{ label: "Test8", value: "Test8" },
			{ label: "Test9", value: "test9" },
			{ label: "Test10", value: "Test10" },
			{ label: "Test11", value: "test11" },
			{ label: "Test21", value: "Test12" },
		];
		const id = "keywords";
		const type = "all";
		setFilters((filters) => [
			...filters,
			{ label, id, type, currentKeywords, allKeywords },
		]);
	}

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		posts[0].published.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		posts[posts.length - 1].published.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const categories = React.useMemo(
		() => createChoiceSet(posts, "categories"),
		[],
	);
	const tags = React.useMemo(() => createChoiceSet(posts, "tags"), []);

	return (
		<Page>
			<PageContents>
				<Filter
					options={["Publish Date", "Keywords", "Search"]}
					onCreate={(id) => {
						if (id === "Publish Date") {
							handlePublishDate();
						} else if (id === "Search") {
							handleSearch();
						} else {
							handleKeywords();
						}
					}}
					onModifyKeywords={(id, keywords) => console.log(id, keywords)}
					onModifyDate={(time, value) => console.log(time, value)}
					onRemove={(id) => console.log(id)}
					filters={filters}
					onModifyWordFilterType={console.log}
					onModifySearch={console.log}
				/>
				<Grouping>
					<Paginate<FlattenedBlogCard> {...postPagination} El={BlogCard} />
				</Grouping>
			</PageContents>
		</Page>
	);
};

export default BlogPage;
