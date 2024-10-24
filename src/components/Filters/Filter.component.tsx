import React, { useRef } from "react";
import styled from "styled-components";

import { useFlyout } from "@/hooks/useFlyout.hook";
import { media } from "@/styles/queries";
import { SIZE_MD, SIZE_SM, SIZE_XXL, Z_RAISED } from "@/styles/variables";
import { FilterProps, ItemFilter, WordFilterType } from "@/types/filters";
import { PotentialChoice } from "@/types/general";
import { setOneQueryParam } from "@/utils/queries";
import { DateFilter, KeywordFilter, NewFilter, SearchFilter } from "./Filter";
import { CurrentPage } from "./Pagination";
import { useFilterComponent } from "./useFilterComponent.hook";

const FilterBar = styled.div`
  position: fixed;
  top: ${SIZE_MD};
  right: 2%;

  width: fit-content;

  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: ${SIZE_SM};

  z-index: ${Z_RAISED};

  ${media.phone} {
    top: calc(1.5 * ${SIZE_XXL});
    margin-bottom: ${SIZE_SM};
  }
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

	useFilterComponent(filterBarRef, newFilterRef, pageRef, setPage);

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
