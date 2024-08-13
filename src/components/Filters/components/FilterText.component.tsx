import { styled } from "styled-components";
import React from "react";

import { SIZE_XS } from "@/styles/variables";

const StyledFilterText = styled.span`
    flex-grow: 1;
    text-transform: capitalize;
`;

const InnerFilterText = styled.span<{ hideBackground?: boolean }>`
    display: grid;
    place-items: center;

    height: 100%;
    width: max-content;

    margin-top: 1px;
    padding: ${SIZE_XS};

    background-color: ${(props) => (props.hideBackground ? "none" : props.theme.colors.background)};
`;

const FilterText: React.FC<ChildrenProp & { hideBackground?: boolean }> = ({
	children,
	hideBackground,
}) => {
	return (
		<StyledFilterText>
			<InnerFilterText hideBackground={hideBackground}>
				{children}
			</InnerFilterText>
		</StyledFilterText>
	);
};

export default FilterText;
