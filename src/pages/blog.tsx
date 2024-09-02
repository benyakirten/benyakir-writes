import * as React from "react";

import { BlogCard, CardContainer } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import { HeadBase } from "@/components/SEO";
import {
	blogDescription,
	postCategories,
	postTags,
	posts,
} from "@/data/search";
import usePagination from "@/hooks/usePagination.hook";
import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@/styles/general-components";
import { CreateFilterOption, FilterOption, ItemFilter } from "@/types/filters";
import type { FlattenedBlogCard } from "@/types/posts";
import {
	createAddDateFilterFn,
	createAddKeywordFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterByKeywordFn,
	createFilterBySearchFn,
	createModifyFilterFns,
} from "@/utils/filter";

export const Head: React.FC = () => (
	<HeadBase title="Blog" description={blogDescription} />
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

	const filterBySearch = createFilterBySearchFn<FlattenedBlogCard>(
		(post, word) => {
			const lcWord = word.toLocaleLowerCase();
			return (
				!!post.meta[word] ||
				post.title.toLocaleLowerCase().includes(lcWord) ||
				post.excerpt?.toLocaleLowerCase().includes(lcWord) ||
				post.content?.toLocaleLowerCase().includes(lcWord) ||
				!!post.tags?.find((tag) => tag.toLocaleLowerCase().includes(lcWord)) ||
				!!post.categories?.find((cat) =>
					cat.toLocaleLowerCase().includes(lcWord),
				)
			);
		},
	);
	const filterByKeywords = createFilterByKeywordFn<FlattenedBlogCard>(
		(post, id) => (id === "tags" ? post.tags : post.categories) ?? [],
	);
	const filterByDate = createFilterByDateFn<FlattenedBlogCard>(
		(post) => post.published.date,
	);

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
					<CardContainer
						Card={BlogCard}
						items={postPagination.visibleItems}
						type="post"
					/>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default BlogPage;
