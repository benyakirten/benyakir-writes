import * as React from "react";

import { Grouping, Page, PageContents } from "@Styles/general-components";

import { Paginate } from "@Layout";
import { BlogCard } from "@Variants";
import usePagination from "@/hooks/usePagination.hook";
import type { FlattenedBlogCard } from "@/types/posts";
import { createChoiceSet } from "@/utils/filter";
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
	const categories = React.useMemo(
		() => createChoiceSet(posts, "categories"),
		[],
	);
	const tags = React.useMemo(() => createChoiceSet(posts, "tags"), []);

	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	const options: FilterOption[] = React.useMemo(
		() => [
			{
				label: "Publish Date",
				id: "date",
				disabled: filters.some((filter) => filter.id === "date"),
			},
			{
				label: "Tags",
				id: "tags",
				disabled: false,
			},
			{
				label: "Categories",
				id: "categories",
				disabled: false,
			},
			{
				label: "Search",
				id: "search",
				disabled: false,
			},
		],
		[filters],
	);

	function handleFilterCreate(id: string) {
		switch (id) {
			case "date":
				createPublishDateFilter();
				break;
			case "tags":
				createTagFilter();
				break;
			case "categories":
				createCategoryFilter();
				break;
			case "search":
				createSearchFilter();
				break;
		}
	}

	function createPublishDateFilter() {
		const start = posts[0].published.date;
		const end = posts[posts.length - 1].published.date;
		setFilters((filters) => [
			...filters,
			{ label: "Date", id: "date", start, end },
		]);
	}

	function createTagFilter() {
		const tagFilter: KeywordFilter = {
			id: "tags",
			label: "Tags",
			type: "any",
			currentKeywords: [],
			allKeywords: tags,
		};
		setFilters((filters) => [...filters, tagFilter]);
	}

	function createCategoryFilter() {
		const categoryFilter: KeywordFilter = {
			id: "categories",
			label: "Categories",
			type: "any",
			currentKeywords: [],
			allKeywords: categories,
		};
		setFilters((filters) => [...filters, categoryFilter]);
	}

	function createSearchFilter() {
		const searchFilter: SearchFilter = {
			label: "search",
			id: Math.random().toString(),
			search: "",
			type: "any",
		};
		setFilters((filters) => [...filters, searchFilter]);
	}

	function removeFilter(id: string) {
		setFilters((filters) => filters.filter((filter) => filter.id !== id));
	}

	function modifyDate(time: "start" | "end", value: Date) {
		// TODO
	}

	function modifyKeywords(id: string, keywords: readonly PotentialChoice[]) {
		// TODO
	}

	function modifyFilterType(id: string, type: WordFilterType) {
		// TODO
	}

	function modifySearch(id: string, search: string) {
		// TODO
	}

	function filterBlogPosts(filters: ItemFilter[], posts: FlattenedBlogCard[]) {
		// TODO
	}

	return (
		<Page>
			<PageContents>
				<Filter
					options={options}
					filters={filters}
					onCreate={handleFilterCreate}
					onModifyKeywords={modifyKeywords}
					onModifyDate={modifyDate}
					onRemove={removeFilter}
					onModifyWordFilterType={modifyFilterType}
					onModifySearch={modifySearch}
				/>
				<Grouping>
					<Paginate<FlattenedBlogCard> {...postPagination} El={BlogCard} />
				</Grouping>
			</PageContents>
		</Page>
	);
};

export default BlogPage;
