import styled from "styled-components";
import React, { useRef } from "react";

import { SIZE_SM, Z_RAISED } from "@/styles/variables";
import { DateFilter, KeywordFilter, NewFilter, SearchFilter } from "./Filter";
import { CurrentPage } from "./Pagination";
import { FilterProps, ItemFilter, WordFilterType } from "@/types/filters";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { useFilter } from "./useFilter.hook";

const FilterBar = styled.div`
    position: fixed;
    top: 2rem;
	left: 98%;

	width: 0px;

    display: flex;
    flex-wrap: wrap;
	justify-content: end;
    gap: ${SIZE_SM};

	z-index: ${Z_RAISED};
`;

const FilterComponent: React.FC<{
	filter: ItemFilter;
	onModifyDate: (time: "start" | "end", value: Date) => void;
	onModifyKeywords: (id: string, keywords: readonly PotentialChoice[]) => void;
	onModifyWordFilterType: (id: string, type: WordFilterType) => void;
	onModifySearch: (id: string, search: string) => void;
	onRemove: (id: string) => void;
}> = ({
	filter,
	onModifyDate,
	onModifyKeywords,
	onRemove,
	onModifySearch,
	onModifyWordFilterType,
}) => {
	const onRemoveFilter = () => onRemove(filter.id);
	if ("start" in filter) {
		return (
			<DateFilter
				onModify={onModifyDate}
				onRemove={onRemoveFilter}
				{...filter}
			/>
		);
	}

	if ("search" in filter) {
		return (
			<SearchFilter
				{...filter}
				onRemove={onRemoveFilter}
				onSearch={(search) => onModifySearch(filter.id, search)}
				onChangeType={(type) => onModifyWordFilterType(filter.id, type)}
			/>
		);
	}

	return (
		<KeywordFilter
			{...filter}
			onRemove={onRemoveFilter}
			onModify={(keywords) => onModifyKeywords(filter.id, keywords)}
			onChangeType={(type) => onModifyWordFilterType(filter.id, type)}
		/>
	);
};

const Filter: React.FC<FilterProps> = ({
	onCreate,
	onRemove,
	onModifyDate,
	onModifyKeywords,
	onModifySearch,
	onModifyWordFilterType,
	options,
	filters,
	currentPage,
	numPages,
	setPage,
}) => {
	const filterBarRef = useRef<HTMLDivElement>(null);
	const pageRef = useRef<HTMLInputElement>(null);
	const newFilterRef = useRef<HTMLButtonElement>(null);

	const [menuOpenTop, menuOpen, setSoftOpen, setHardOpen] =
		useFlyout(newFilterRef);

	useFilter(filterBarRef, newFilterRef, pageRef);
	return (
		<FilterBar ref={filterBarRef}>
			<CurrentPage
				currentPage={currentPage}
				numPages={numPages}
				onSetPage={setPage}
				ref={pageRef}
			/>
			<NewFilter
				ref={newFilterRef}
				onCreate={onCreate}
				options={options}
				menuOpenTop={menuOpenTop}
				menuOpen={menuOpen}
				setSoftOpen={setSoftOpen}
				setHardOpen={setHardOpen}
			/>
			{filters.map((filter) => (
				<FilterComponent
					key={filter.id}
					filter={filter}
					onModifyDate={onModifyDate}
					onModifyKeywords={onModifyKeywords}
					onRemove={onRemove}
					onModifySearch={onModifySearch}
					onModifyWordFilterType={onModifyWordFilterType}
				/>
			))}
		</FilterBar>
	);
};

export default Filter;
