import React from "react";
import { styled } from "styled-components";

import { FillIn } from "@/components/General";
import { HORIZONTAL_XS } from "@/styles/variables";

const StyledFilterButtonExterior = styled.div`
	height: 100%;
    flex-grow: 1;
    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
`;

const FilterButtonInterior = styled.button<{ width?: string }>`
	height: 100%;
	white-space: nowrap;
	width: ${(props) => props.width || "auto"};
	padding: ${HORIZONTAL_XS};
	text-transform: capitalize;
`;

const FilterButton: React.FC<FilterButtonProps> = ({
	children,
	borderRadiusCorners = {},
	filledIn,
	width,
	...buttonProps
}) => {
	return (
		<StyledFilterButtonExterior>
			<FillIn filledIn={filledIn} borderRadiusCorners={borderRadiusCorners}>
				<FilterButtonInterior width={width} type="button" {...buttonProps}>
					{children}
				</FilterButtonInterior>
			</FillIn>
		</StyledFilterButtonExterior>
	);
};

export default FilterButton;
