import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";

import usePagination from "@/hooks/usePagination.hook";
import type { FlattenedBlogCard } from "@/types/posts";
import { createChoiceSet } from "@/utils/filter";
import { blogDescription, posts } from "@/data/search";
import { Filter } from "@/components/Filters";
import { CardContainer, NewBlogCard } from "@/components/Cards";
import {
	DateFilter,
	FilterOption,
	ItemFilter,
	KeywordFilter,
	SearchFilter,
	WordFilterType,
} from "@/types/filters";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Blogs</title>
		<meta name="description" content={blogDescription} />
	</>
);

const BlogPage: React.FC = () => {
	const postPagination = usePagination(posts);
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
		const start = posts[posts.length - 1].published.date;
		const end = posts[0].published.date;
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
		setFilters((filters) => {
			const newFilters = filters.filter((filter) => filter.id !== id);
			filterBlogPosts(newFilters);
			return newFilters;
		});
	}

	function modifyDate(time: "start" | "end", value: Date) {
		setFilters((filters) => {
			const dateFilter = filters.find((filter) => filter.id === "date");
			if (!dateFilter || !("start" in dateFilter)) {
				return filters;
			}

			dateFilter[time] = value;
			filterBlogPosts(filters);

			return structuredClone(filters);
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

			return structuredClone(filters);
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

			return structuredClone(filters);
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

			return structuredClone(filters);
		});
	}

	function filterBySearch(
		filter: SearchFilter,
		posts: FlattenedBlogCard[],
	): FlattenedBlogCard[] {
		if (filter.search === "") {
			return posts;
		}

		const search = filter.search.toLowerCase().split(" ");
		const fn =
			filter.type === "any"
				? search.some.bind(search)
				: search.every.bind(search);
		return posts.filter((post) =>
			fn(
				(word) =>
					post.meta[word] ||
					post.title.includes(word) ||
					post.excerpt?.includes(word) ||
					post.content?.toLowerCase().includes(word) ||
					post.tags?.find((tag) => tag.includes(word)) ||
					post.categories?.find((cat) => cat.includes(word)),
			),
		);
	}

	function filterByKeywords(
		filter: KeywordFilter,
		posts: FlattenedBlogCard[],
	): FlattenedBlogCard[] {
		const fn =
			filter.type === "any"
				? filter.currentKeywords.some.bind(filter.currentKeywords)
				: filter.currentKeywords.every.bind(filter.currentKeywords);
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

		postPagination.setItems(filteredPosts);
	}

	return (
		<Page>
			<PaginatedPageContents>
				<Filter
					options={options}
					filters={filters}
					onCreate={handleFilterCreate}
					onModifyKeywords={modifyKeywords}
					onModifyDate={modifyDate}
					onRemove={removeFilter}
					onModifyWordFilterType={modifyFilterType}
					onModifySearch={modifySearch}
					currentPage={postPagination.page}
					numPages={postPagination.numPages}
					setPage={postPagination.setPage}
				/>
				<LeadHeading>Blog Posts</LeadHeading>
				<Grouping>
					<CardContainer>
						{postPagination.visibleItems.map((post) => (
							<NewBlogCard key={post.slug} post={post} />
						))}
					</CardContainer>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default BlogPage;
