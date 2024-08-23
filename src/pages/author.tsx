import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";

import { usePagination } from "@Hooks";
import type { AuthoredItemCard } from "@Types/posts";
import { authorDescription, books, stories } from "@/data/search";
import { CardContainer, NewBookCard, NewStoryCard } from "@/components/Cards";
import { ItemFilter, FilterOption, WordFilterType } from "@/types/filters";
import { Filter } from "@/components/Filters";

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

	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Written Work</LeadHeading>
				<Filter
					onCreate={(id: string): void => {
						throw new Error("Function not implemented.");
					}}
					onRemove={(id: string): void => {
						throw new Error("Function not implemented.");
					}}
					onModifyDate={(time: "start" | "end", value: Date): void => {
						throw new Error("Function not implemented.");
					}}
					onModifyKeywords={(
						id: string,
						keywords: readonly PotentialChoice[],
					): void => {
						throw new Error("Function not implemented.");
					}}
					onModifyWordFilterType={(id: string, type: WordFilterType): void => {
						throw new Error("Function not implemented.");
					}}
					onModifySearch={(id: string, search: string): void => {
						throw new Error("Function not implemented.");
					}}
					options={options}
					filters={filters}
					currentPage={0}
					numPages={0}
					setPage={(value: React.SetStateAction<number>): void => {
						throw new Error("Function not implemented.");
					}}
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
