import React, { useRef } from "react";

import { FilterMenu, FilterPillButton } from "./components/Filters.styles";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { AddIcon } from "../Icons";
import { Button } from "../General";
import FilterText from "./components/FilterText.component";
import IconContainer from "./components/IconContainer.component";

const NewFilter: React.FC<NewFilterProps> = ({ onCreate, options }) => {
	const menuRef = useRef<HTMLButtonElement>(null);
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
			<FilterMenu pointUpwards={menuOpenTop} aria-expanded={menuOpen}>
				{options.map((option) => (
					<li key={option}>
						<Button onClick={(e) => selectItem(e, option)}>{option}</Button>
					</li>
				))}
			</FilterMenu>
			<IconContainer>
				<AddIcon />
			</IconContainer>
			<FilterText>New Filter</FilterText>
		</FilterPillButton>
	);
};

export default NewFilter;
