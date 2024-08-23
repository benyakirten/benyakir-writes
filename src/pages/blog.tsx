import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";
import usePagination from "@/hooks/usePagination.hook";
import type { FlattenedBlogCard } from "@/types/posts";
import {
	createAddDateFilterFn,
	createAddKeywordFilterFn,
	createAddSearchFilterFn,
	createModifyFilterFns,
} from "@/utils/filter";
import {
	blogDescription,
	postCategories,
	posts,
	postTags,
} from "@/data/search";
import { Filter } from "@/components/Filters";
import { CardContainer, NewBlogCard } from "@/components/Cards";
import {
	CreateFilterOption,
	DateFilter,
	FilterOption,
	ItemFilter,
	KeywordFilter,
	SearchFilter,
} from "@/types/filters";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Blogs</title>
		<meta name="description" content={blogDescription} />
	</>
);

const BlogPage: React.FC = () => {
	const postPagination = usePagination(posts);
	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	const options: FilterOption[] = [
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
	];

	const newFilterOptions: CreateFilterOption[] = [
		{
			match: "date",
			fn: createAddDateFilterFn(
				posts[posts.length - 1].published.date,
				posts[0].published.date,
				setFilters,
			),
		},
		{
			match: "tags",
			fn: createAddKeywordFilterFn("tags", postTags, setFilters),
		},
		{
			match: "categories",
			fn: createAddKeywordFilterFn("categories", postCategories, setFilters),
		},
		{
			match: "search",
			fn: createAddSearchFilterFn(setFilters),
		},
	];

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
			fn((word) => {
				const lcWord = word.toLocaleLowerCase();
				return (
					post.meta[word] ||
					post.title.toLocaleLowerCase().includes(lcWord) ||
					post.excerpt?.toLocaleLowerCase().includes(lcWord) ||
					post.content?.toLocaleLowerCase().includes(lcWord) ||
					post.tags?.find((tag) => tag.toLocaleLowerCase().includes(lcWord)) ||
					post.categories?.find((cat) =>
						cat.toLocaleLowerCase().includes(lcWord),
					)
				);
			}),
		);
	}

	function filterByKeywords(
		filter: KeywordFilter,
		posts: FlattenedBlogCard[],
	): FlattenedBlogCard[] {
		if (filter.currentKeywords.length === 0) {
			return posts;
		}

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

	const {
		createFilter,
		removeFilter,
		modifyDate,
		modifyKeywords,
		modifySearch,
		modifyFilterType,
	} = createModifyFilterFns(
		newFilterOptions,
		setFilters,
		filterByDate,
		filterByKeywords,
		filterBySearch,
		postPagination.setItems,
		posts,
	);

	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Blog Posts</LeadHeading>
				<Filter
					options={options}
					filters={filters}
					onCreate={createFilter}
					onModifyKeywords={modifyKeywords}
					onModifyDate={modifyDate}
					onRemove={removeFilter}
					onModifyWordFilterType={modifyFilterType}
					onModifySearch={modifySearch}
					currentPage={postPagination.page}
					numPages={postPagination.numPages}
					setPage={postPagination.setPage}
				/>
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
