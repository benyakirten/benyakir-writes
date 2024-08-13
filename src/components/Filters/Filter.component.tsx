import styled from "styled-components";
import React from "react";

import { SIZE_SM, Z_RAISED } from "@/styles/variables";
import { DateFilter, KeywordFilter, NewFilter, SearchFilter } from "./Filter";

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
				onSearch={(search) => onModifySearch(filter.label, search)}
				onChangeType={(type) => onModifyWordFilterType(filter.label, type)}
			/>
		);
	}

	return (
		<KeywordFilter
			{...filter}
			onRemove={onRemoveFilter}
			onModify={(keywords) => onModifyKeywords(filter.label, keywords)}
			onChangeType={(type) => onModifyWordFilterType(filter.label, type)}
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
	children,
}) => {
	return (
		<FilterBar data-filter>
			{children}
			<NewFilter onCreate={onCreate} options={options} />
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
