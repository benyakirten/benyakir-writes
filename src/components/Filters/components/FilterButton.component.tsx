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

const FilterButton: React.FC<
	ChildrenProp & { onClick: React.MouseEventHandler }
> = ({ onClick, children }) => {
	return (
		<StyledFilterButton>
			<InnerFilterButton
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onClick(e);
				}}
			>
				{children}
			</InnerFilterButton>
		</StyledFilterButton>
	);
};
