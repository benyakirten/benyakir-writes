import styled from "styled-components";
import React from "react";

import { SIZE_SM, VERTICAL_SM, Z_ABOVE } from "@/styles/variables";
import { DateFilter, KeywordFilter, NewFilter, SearchFilter } from "./Filter";

const FilterBar = styled.div`
    position: sticky;
    top: 0;
	left: 0;
	width: 100%;
    padding: ${VERTICAL_SM};

    display: flex;
    flex-wrap: wrap;
    gap: ${SIZE_SM};

	background-color: ${(props) => props.theme.base.background};
	z-index: ${Z_ABOVE};
`;

const FilterComponent: React.FC<{
	filter: ItemFilter;
	onModifyDate: (time: "before" | "after", value: Date) => void;
	onModifyKeywords: (id: string, keywords: PotentialChoice[]) => void;
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
	if ("before" in filter) {
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
}) => {
	return (
		<FilterBar>
			<NewFilter onCreate={onCreate} options={options} />
			{filters.map((filter) => (
				<FilterComponent
					key={filter.label}
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
