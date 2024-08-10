import styled from "styled-components";
import React from "react";
import { SIZE_SM } from "@/styles/variables";
import NewFilter from "./New.component";

const FilterBar = styled.div`
    position: fixed;
    inset: 0;
    padding: ${SIZE_SM} ${SIZE_SM};

    display: flex;
    flex-wrap: wrap;
    gap: ${SIZE_SM};
`;

const Filter: React.FC<FilterProps> = ({
	onCreate,
	onRemove,
	onModify,
	options,
	filters,
}) => {
	return (
		<FilterBar>
			<NewFilter onCreate={onCreate} options={options} />
		</FilterBar>
	);
};

export default Filter;
