import React, { useRef } from "react";

import { FilterPillButton, IconContainer } from "./Filters.styles";
import styled from "styled-components";
import { AddIcon } from "../Icons";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { SIZE_SM, Z_RAISED } from "@/styles/variables";

const NewFilterText = styled.div`
    flex-grow: 1;
`;

const FilterMenu = styled.ul<{ pointUpwards: boolean }>`
	display: none;
	z-index: ${Z_RAISED};

	position: absolute;
	left: 0;
	${(props) => (props.pointUpwards ? "bottom: calc(100% + 2px);" : "top: calc(100% + 2px);")}

	min-width: calc(90% - ${SIZE_SM});
	height: max-content;

	background-color: ${(props) => props.theme.base.background};
	padding: ${SIZE_SM};

	border: 1px solid ${(props) => props.theme.base.textColor};

	&[aria-expanded='true'] {
		display: flex;
		flex-direction: column;
		gap: ${SIZE_SM};
	}
`;

const FilterOption = styled.button`

`;

const NewFilter: React.FC<NewFilterProps> = ({ onCreate, options }) => {
	const shouldMenuOpenTop = React.useCallback(() => {
		const windowHeight = window.innerHeight;
		const buttonTop = buttonRef.current?.getBoundingClientRect().top || 0;

		return buttonTop > windowHeight / 2;
	}, []);

	React.useEffect(() => {
		const calculateIfMenuShouldOpenTop = () => {
			const shouldOpenTop = shouldMenuOpenTop();
			setMenuOpenTop(shouldOpenTop);
		};

		window.addEventListener("scroll", calculateIfMenuShouldOpenTop);
		return () => {
			window.removeEventListener("scroll", calculateIfMenuShouldOpenTop);
		};
	}, [shouldMenuOpenTop]);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [menuOpen, setLightOpen, setHardOpen] = useFlyout();
	const [menuOpenTop, setMenuOpenTop] = React.useState(shouldMenuOpenTop());

	const selectItem = (option: string) => {
		setLightOpen(false);
		setHardOpen(false);
		onCreate(option);
	};

	return (
		<FilterPillButton
			ref={buttonRef}
			onMouseEnter={() => setLightOpen(true)}
			onMouseLeave={() => setLightOpen(false)}
			onClick={() => setHardOpen((open) => !open)}
		>
			<FilterMenu pointUpwards={menuOpenTop} aria-expanded={menuOpen}>
				{options.map((option) => (
					<li key={option}>{option}</li>
				))}
			</FilterMenu>
			<IconContainer>
				<AddIcon />
			</IconContainer>
			<NewFilterText>New Filter</NewFilterText>
		</FilterPillButton>
	);
};

export default NewFilter;
