import React from "react";
import { styled } from "styled-components";

import {
	FilterMenu,
	FilterPillButton,
	FilterText,
	IconContainer,
} from "../components";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { AddIcon } from "@/components/Icons";
import { SIZE_SM, TRANSITION_SLOW } from "@/styles/variables";
import { FillIn } from "@/components/General";
import { useCloseFlyouts } from "./useListenForEscape.hook";

const InnerContainer = styled.div`
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

const FilterOption: React.FC<{
	option: FilterOption;
	filters: ItemFilter[];
	selectItem: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: FilterOption,
	) => void;
}> = ({ option, filters, selectItem }) => {
	const disabled =
		option.disabled instanceof Function
			? option.disabled(filters)
			: option.disabled;
	return (
		<li>
			<FillIn disabled={disabled}>
				<OptionButton
					disabled={disabled}
					type="button"
					onClick={(e) => selectItem(e, option)}
				>
					{option.label}
				</OptionButton>
			</FillIn>
		</li>
	);
};

const NewFilter: React.FC<NewFilterProps> = ({
	onCreate,
	options,
	filters,
}) => {
	const menuRef = React.useRef<HTMLButtonElement>(null);
	const [menuOpenTop, menuOpen, setSoftOpen, setHardOpen] = useFlyout(menuRef);

	const selectItem = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: FilterOption,
	) => {
		e.stopPropagation();
		closeAllMenus();
		onCreate(option.label);
	};

	function closeAllMenus() {
		setSoftOpen(false);
		setHardOpen(false);
	}

	useCloseFlyouts(closeAllMenus);

	return (
		<FilterPillButton
			ref={menuRef}
			onMouseEnter={() => setSoftOpen(true)}
			onMouseLeave={() => setSoftOpen(false)}
			onKeyDown={(e) => e.key === "Escape" && closeAllMenus()}
			onClick={() => setHardOpen((open) => !open)}
		>
			<FilterMenu
				removeSpacing
				pointUpwards={menuOpenTop}
				aria-expanded={menuOpen}
				onMouseEnter={() => setSoftOpen(true)}
				onMouseLeave={() => setSoftOpen(false)}
			>
				{options.map((option) => (
					<FilterOption
						key={option.label}
						option={option}
						filters={filters}
						selectItem={selectItem}
					/>
				))}
			</FilterMenu>
			<FillIn
				borderRadiusCorners={{
					bottomLeft: "2rem",
					bottomRight: "2rem",
					topLeft: "2rem",
					topRight: "2rem",
				}}
			>
				<InnerContainer>
					<IconContainer>
						<AddIcon />
					</IconContainer>
					<FilterText>New Filter</FilterText>
				</InnerContainer>
			</FillIn>
		</FilterPillButton>
	);
};

export default NewFilter;
