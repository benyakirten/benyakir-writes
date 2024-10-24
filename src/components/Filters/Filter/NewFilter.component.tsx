import React from "react";
import { styled } from "styled-components";

import { FillIn } from "@/components/General";
import { AddIcon } from "@/components/Icons";
import { SIZE_MD, SIZE_SM, TRANSITION_SLOW, Z_HIGH } from "@/styles/variables";
import { FilterOption, NewFilterProps } from "@/types/filters";
import {
	FilterMenu,
	FilterPillButtonExterior,
	FilterText,
	IconContainer,
} from "../components";
import { registerCleanupFn } from "../useFilterComponent.hook";

const InnerContainer = styled.button`
  display: flex;
  align-items: center;

  & > *:last-child {
    border-left: 1px solid ${(props) => props.theme.base.border};
    transition: all ${TRANSITION_SLOW} ease;
  }

  &:hover > *:last-child {
    border-left: 1px solid ${(props) => props.theme.base.background};
  }
`;

const OptionButton = styled.button`
  padding: ${SIZE_SM};
  white-space: nowrap;

  &:disabled {
    cursor: default;
  }
`;

const FilterChoice: React.FC<{
	option: FilterOption;
	selectItem: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: FilterOption,
	) => void;
}> = ({ option, selectItem }) => {
	return (
		<li>
			<FillIn disabled={option.disabled}>
				<OptionButton
					disabled={option.disabled}
					type="button"
					onClick={(e) => selectItem(e, option)}
				>
					{option.label}
				</OptionButton>
			</FillIn>
		</li>
	);
};

const NewFilter = React.forwardRef<HTMLButtonElement, NewFilterProps>(
	(
		{ onCreate, options, menuOpenTop, menuOpen, setSoftOpen, setHardOpen },
		ref,
	) => {
		const selectItem = (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
			option: FilterOption,
		) => {
			e.stopPropagation();
			closeAllMenus();
			onCreate(option.id);
		};

		const closeAllMenus = React.useCallback(() => {
			setSoftOpen(false);
			setHardOpen(false);
		}, [setSoftOpen, setHardOpen]);

		React.useEffect(() => {
			const cleanup = registerCleanupFn("new-filter", closeAllMenus);
			return cleanup;
		}, [closeAllMenus]);

		return (
			<FilterPillButtonExterior
				onMouseEnter={() => setSoftOpen(true)}
				onMouseLeave={() => setSoftOpen(false)}
				onClick={() => setHardOpen((open) => !open)}
			>
				<FilterMenu
					style={{ zIndex: Z_HIGH }}
					$removeSpacing
					$pointUpwards={menuOpenTop}
					aria-expanded={menuOpen}
					onMouseEnter={() => setSoftOpen(true)}
					onMouseLeave={() => setSoftOpen(false)}
				>
					{options.map((option) => (
						<FilterChoice
							key={option.id}
							option={option}
							selectItem={selectItem}
						/>
					))}
				</FilterMenu>
				<FillIn
					borderRadiusCorners={{
						bottomLeft: SIZE_MD,
						bottomRight: SIZE_MD,
						topLeft: SIZE_MD,
						topRight: SIZE_MD,
					}}
				>
					<InnerContainer ref={ref}>
						<IconContainer>
							<AddIcon />
						</IconContainer>
						<FilterText hideBackground>New Filter</FilterText>
					</InnerContainer>
				</FillIn>
			</FilterPillButtonExterior>
		);
	},
);

export default NewFilter;
