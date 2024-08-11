import styled from "styled-components";
import React from "react";
import { SIZE_SM, VERTICAL_SM, Z_ABOVE } from "@/styles/variables";
import NewFilter from "./NewFilter.component";
import DateFilter from "./DateFilter.component";
import KeywordFilter from "./KeywordFilter.component";

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
	onModifyKeywords: (id: string, keywords: string[]) => void;
	onRemove: (id: string) => void;
}> = ({ filter, onModifyDate, onModifyKeywords, onRemove }) => {
	if ("before" in filter) {
		return (
			<DateFilter
				onModify={onModifyDate}
				onRemove={() => onRemove("date")}
				{...filter}
			/>
		);
	}

	return (
		<KeywordFilter
			{...filter}
			onRemove={() => onRemove(filter.label)}
			onModify={onModifyKeywords}
		/>
	);
};

const Filter: React.FC<FilterProps> = ({
	onCreate,
	onRemove,
	onModifyDate,
	onModifyKeywords,
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
				/>
			))}
		</FilterBar>
	);
};

export default Filter;
