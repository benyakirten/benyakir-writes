import { styled } from "styled-components";
import React from "react";

import { SIZE_XS } from "@/styles/variables";

const StyledFilterText = styled.span`
    flex-grow: 1;
    text-transform: capitalize;
`;

const InnerFilterText = styled.span`
    display: grid;
    place-items: center;

    height: 100%;
    width: max-content;

    margin-top: 1px;
    padding: ${SIZE_XS};
`;

// TODO: Figure out why margin-top is required

const FilterText: React.FC<ChildrenProp> = ({ children }) => {
	return (
		<StyledFilterText>
			<InnerFilterText>{children}</InnerFilterText>
		</StyledFilterText>
	);
};

export default FilterText;
