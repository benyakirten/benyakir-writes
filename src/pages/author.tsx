import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@/styles/general-components";
import { usePagination } from "@/hooks";
import type { AuthoredItemCard } from "@/types/posts";
import { authorDescription, books, stories } from "@/data/search";
import { CardContainer, BookCard, StoryCard } from "@/components/Cards";
import {
	ItemFilter,
	FilterOption,
	CreateFilterOption,
	KeywordFilter,
} from "@/types/filters";
import { Filter } from "@/components/Filters";
import {
	createAddDateFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterBySearchFn,
	createModifyFilterFns,
} from "@/utils/filter";
import { HeadBase } from "@/components/SEO";

export const Head: React.FC = () => (
	<HeadBase title="Author" description={authorDescription} />
);

const AuthorCard: React.FC<{ item: AuthoredItemCard }> = ({ item }) => {
	if ("book" in item) {
		return <StoryCard story={item} />;
	}
	return <BookCard book={item} />;
};

const AuthorPage: React.FC = () => {
	const items = React.useMemo<AuthoredItemCard[]>(() => {
		return [...books, ...stories].sort(
			(a, b) => b.published.date.valueOf() - a.published.date.valueOf(),
		);
	}, []);
	const itemPagination = usePagination<AuthoredItemCard>(items);

	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	const options: FilterOption[] = [
		{
			label: "Publish Date",
			id: "date",
			disabled: filters.some((filter) => filter.id === "date"),
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
				items[items.length - 1].published.date,
				items[0].published.date,
				setFilters,
			),
		},
		{
			match: "search",
			fn: createAddSearchFilterFn(setFilters),
		},
	];

	const filterBySearch = createFilterBySearchFn<AuthoredItemCard>(
		(item, word) => {
			const lcWord = word.toLocaleLowerCase();
			return (
				item.meta[word] ||
				item.title.toLocaleLowerCase().includes(lcWord) ||
				item.content?.toLocaleLowerCase().includes(lcWord)
			);
		},
	);

	const filterByKeywords = (
		_: KeywordFilter,
		items: AuthoredItemCard[],
	): AuthoredItemCard[] => items;

	const filterByDate = createFilterByDateFn<AuthoredItemCard>(
		(item) => item.published.date,
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
		itemPagination.setItems,
		items,
	);

	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Written Work</LeadHeading>
				<Filter
					onCreate={createFilter}
					onRemove={removeFilter}
					onModifyDate={modifyDate}
					onModifyKeywords={modifyKeywords}
					onModifyWordFilterType={modifyFilterType}
					onModifySearch={modifySearch}
					options={options}
					filters={filters}
					currentPage={itemPagination.page}
					numPages={itemPagination.numPages}
					setPage={itemPagination.setPage}
				/>
				<Grouping>
					<CardContainer>
						{itemPagination.visibleItems.map((item) => (
							<AuthorCard item={item} key={item.slug} />
						))}
					</CardContainer>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default AuthorPage;
