import React, { useRef } from "react";

import { FilterMenu, FilterPillButton, IconContainer } from "./Filters.styles";
import styled from "styled-components";
import { AddIcon } from "../Icons";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { Button } from "../General";

const NewFilterText = styled.div`
    flex-grow: 1;
`;

const NewFilter: React.FC<NewFilterProps> = ({ onCreate, options }) => {
	const menuRef = useRef<HTMLButtonElement>(null);
	const [menuOpenTop, menuOpen, setLightOpen, setHardOpen] = useFlyout(menuRef);

	const selectItem = (option: string) => {
		setLightOpen(false);
		onCreate(option);
	};

	return (
		<FilterPillButton
			ref={menuRef}
			onMouseEnter={() => setLightOpen(true)}
			onMouseLeave={() => setLightOpen(false)}
			onClick={() => setHardOpen((open) => !open)}
		>
			<FilterMenu pointUpwards={menuOpenTop} aria-expanded={menuOpen}>
				{options.map((option) => (
					<li key={option}>
						<Button onClick={() => selectItem(option)}>{option}</Button>
					</li>
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
