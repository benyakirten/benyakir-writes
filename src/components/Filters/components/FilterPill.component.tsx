import React from "react";
import { styled } from "styled-components";

import { SIZE_MD } from "@/styles/variables";
import { CloseIcon } from "@/components/Icons";
import FilterButton from "./FilterButton.component";
import IconContainer from "./IconContainer.component";
import { FilterPillProps } from "@/types/filters";

export const StyledFilterPill = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid ${(props) => props.theme.base.border};

    border-radius: ${SIZE_MD};

    & > *:not(:last-child) {
        border-right: 1px solid ${(props) => props.theme.base.border};
    }
`;

const FilterPill = React.forwardRef<HTMLDivElement, FilterPillProps>(
	({ children, onRemove }, ref) => {
		return (
			<StyledFilterPill ref={ref}>
				<FilterButton
					borderRadiusCorners={{ topLeft: "2rem", bottomLeft: "2rem" }}
					type="button"
					onClick={onRemove}
				>
					<IconContainer>
						<CloseIcon />
					</IconContainer>
				</FilterButton>
				{children}
			</StyledFilterPill>
		);
	},
);

export default FilterPill;
