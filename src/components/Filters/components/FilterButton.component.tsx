import { SIZE_XS } from "@/styles/variables";
import React from "react";
import { styled } from "styled-components";

const StyledFilterButton = styled.div`
    height: 100%;
    flex-grow: 1;
    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
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
