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
import { Button } from "@/components/General";
import { TRANSITION_SLOW } from "@/styles/variables";
import { FillIn } from "@/components/General";

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

const NewFilter: React.FC<NewFilterProps> = ({ onCreate, options }) => {
	const menuRef = React.useRef<HTMLButtonElement>(null);
	const [menuOpenTop, menuOpen, setSoftOpen, setHardOpen] = useFlyout(menuRef);

	const selectItem = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: string,
	) => {
		e.stopPropagation();
		setHardOpen(false);
		setSoftOpen(false);
		onCreate(option);
	};

	return (
		<FilterPillButton
			ref={menuRef}
			onMouseEnter={() => setSoftOpen(true)}
			onMouseLeave={() => setSoftOpen(false)}
			onClick={() => setHardOpen((open) => !open)}
		>
			<FilterMenu
				pointUpwards={menuOpenTop}
				aria-expanded={menuOpen}
				onMouseEnter={() => setSoftOpen(true)}
				onMouseLeave={() => setSoftOpen(false)}
			>
				{options.map((option) => (
					<li key={option}>
						<Button onClick={(e) => selectItem(e, option)}>{option}</Button>
					</li>
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
