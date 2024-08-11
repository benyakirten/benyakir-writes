import { SIZE_XS } from "@/styles/variables";
import React from "react";
import { styled } from "styled-components";

const StyledFilterButton = styled.div`
    
`;

const InnerFilterButton = styled.button`
    padding: ${SIZE_XS};
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const FilterButton: React.FC<FilterButtonProps> = ({
	children,
	...buttonProps
}) => {
	return (
		<StyledFilterButton>
			<InnerFilterButton type="button" {...buttonProps}>
				{children}
			</InnerFilterButton>
		</StyledFilterButton>
	);
};

export default FilterButton;
