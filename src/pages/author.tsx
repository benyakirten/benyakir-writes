import * as React from "react";

import { CardContainer } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import { HeadBase } from "@/components/SEO";
import { authorDescription, books, stories } from "@/data/search";
import { usePagination } from "@/hooks";
import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@/styles/general-components";
import {
	CreateFilterOption,
	FilterOption,
	ItemFilter,
	KeywordFilter,
} from "@/types/filters";
import type { AuthoredItemCard } from "@/types/posts";
import {
	createAddDateFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterBySearchFn,
	createModifyFilterFns,
} from "@/utils/filter";
import { AuthorCard } from "@/components/General";

export const Head: React.FC = () => (
	<HeadBase title="Author" description={authorDescription} />
);

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
					<CardContainer
						items={itemPagination.visibleItems}
						Card={AuthorCard}
						type="books or storie"
					/>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default AuthorPage;
