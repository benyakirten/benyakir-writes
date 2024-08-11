import React from "react";
import { styled } from "styled-components";

import FillIn from "@/components/General/FillIn/FillIn.component";
import { HORIZONTAL_XS } from "@/styles/variables";

const StyledFilterButtonExterior = styled.div`
	height: 100%;
    flex-grow: 1;
    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
`;

const FilterButtonInterior = styled.button`
	height: 100%;
	display: flex;
	align-items: center;
	padding: ${HORIZONTAL_XS};
`;

const FilterButton: React.FC<FilterButtonProps> = ({
	children,
	borderRadiusCorners = {},
	filledIn,
	...buttonProps
}) => {
	return (
		<StyledFilterButtonExterior>
			<FillIn filledIn={filledIn} borderRadiusCorners={borderRadiusCorners}>
				<FilterButtonInterior type="button" {...buttonProps}>
					{children}
				</FilterButtonInterior>
			</FillIn>
		</StyledFilterButtonExterior>
	);
};

export default FilterButton;
