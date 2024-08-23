import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";
import { usePagination } from "@Hooks";
import type { AuthoredItemCard } from "@Types/posts";
import { authorDescription, books, posts, stories } from "@/data/search";
import { CardContainer, NewBookCard, NewStoryCard } from "@/components/Cards";
import {
	ItemFilter,
	FilterOption,
	CreateFilterOption,
	DateFilter,
	KeywordFilter,
	SearchFilter,
} from "@/types/filters";
import { Filter } from "@/components/Filters";
import {
	createAddDateFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterBySearchFn,
	createModifyFilterFns,
} from "@/utils/filter";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Author</title>
		<meta name="description" content={authorDescription} />
	</>
);

const AuthorCard: React.FC<{ item: AuthoredItemCard }> = ({ item }) => {
	if ("book" in item) {
		return <NewStoryCard story={item} />;
	}
	return <NewBookCard book={item} />;
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
