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
		setFilters((filters) => {
			const dateFilter = filters.find((filter) => filter.id === "date");
			if (!dateFilter || !("start" in dateFilter)) {
				return filters;
			}

			dateFilter[time] = value;
			filterBlogPosts(filters);

			return filters;
		});
	}

	function modifyKeywords(id: string, keywords: readonly PotentialChoice[]) {
		setFilters((filters) => {
			const keywordFilter = filters.find((filter) => filter.id === id);
			if (!keywordFilter || !("currentKeywords" in keywordFilter)) {
				return filters;
			}

			keywordFilter.currentKeywords = keywords;
			filterBlogPosts(filters);

			return filters;
		});
	}

	function modifyFilterType(id: string, type: WordFilterType) {
		setFilters((filters) => {
			const filter = filters.find((filter) => filter.id === id);
			if (!filter || !("type" in filter)) {
				return filters;
			}

			filter.type = type;
			filterBlogPosts(filters);

			return filters;
		});
	}

	function modifySearch(id: string, search: string) {
		setFilters((filters) => {
			const searchFilter = filters.find((filter) => filter.id === id);
			if (!searchFilter || !("search" in searchFilter)) {
				return filters;
			}

			searchFilter.search = search;
			filterBlogPosts(filters);

			return filters;
		});
	}

	function filterBySearch(
		filter: SearchFilter,
		posts: FlattenedBlogCard[],
	): FlattenedBlogCard[] {
		const search = filter.search.toLowerCase().split(" ");
		const fn = filter.type === "any" ? search.some : search.every;
		return posts.filter((post) => fn((word) => post.meta[word]));
	}

	function filterByKeywords(
		filter: KeywordFilter,
		posts: FlattenedBlogCard[],
	): FlattenedBlogCard[] {
		const fn =
			filter.type === "any"
				? filter.currentKeywords.some
				: filter.currentKeywords.every;
		return posts.filter((post) => {
			const keywords = filter.id === "tags" ? post.tags : post.categories;
			return fn((keyword) => keywords?.includes(keyword.value));
		});
	}

	function filterByDate(filter: DateFilter, posts: FlattenedBlogCard[]) {
		return posts.filter((post) => {
			const postDate = post.published.date.getTime();
			const start = filter.start.getTime();
			const end = filter.end.getTime();
			return postDate >= start && postDate <= end;
		});
	}

	function filterBlogPosts(filters: ItemFilter[]) {
		let filteredPosts = posts;
		for (const filter of filters) {
			if (filter.id === "date" && "start" in filter) {
				filteredPosts = filterByDate(filter, filteredPosts);
			} else if ("search" in filter) {
				filteredPosts = filterBySearch(filter, filteredPosts);
			} else if ("currentKeywords" in filter) {
				filteredPosts = filterByKeywords(filter, filteredPosts);
			}
		}

		postPagination.setCurrentItems(filteredPosts);
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
