import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/store/hooks";
import ThemeItem from "./ThemeItem.component";
import { Subtitle } from "@/styles/general-components";
import { SIZE_SM } from "@/styles/variables";

const ThemeContainer = styled.ul`
	display: grid;
	gap: ${SIZE_SM};
`;

const ThemeList: React.FC<ThemeListProps> = ({ onSelect, selectedTheme }) => {
	const themeStore = useAppSelector((root) => root.theme);

	return (
		<ThemeContainer>
			<Subtitle>Settings</Subtitle>
			{themeStore.themes.map((theme) => (
				<ThemeItem
					id={theme.id}
					name={theme.name}
					key={theme.id}
					onSelect={onSelect}
					selectedTheme={selectedTheme}
				/>
			))}
		</ThemeContainer>
	);
};

export default ThemeList;
