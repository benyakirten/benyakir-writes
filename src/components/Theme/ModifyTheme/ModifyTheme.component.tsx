import * as React from "react";
import styled from "styled-components";

import { Text } from "@/components/Input";
import {
	BigParagraph,
	Box,
	Column,
	Paragraph,
} from "@/styles/general-components";
import SettingsGroup from "./SettingsGroup.component";

import { useMultiple } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	changeThemeName,
	flattenedThemeShape,
} from "@/store/theme/theme.slice";
import { capitalize } from "@/utils/strings";
import { fadeIn } from "@/styles/animations";
import { FONT_MD } from "@/styles/variables";

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${FONT_MD};
`;

const ThemeAppearance = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-in forwards;
`;

const ModifyTheme: React.FC<ModifyThemeProps> = ({ selectedTheme }) => {
	const dispatch = useAppDispatch();
	const themes = useAppSelector((root) => root.theme.themes);
	const theme = React.useMemo(
		() => themes.find((theme) => theme.id === selectedTheme),
		[selectedTheme, themes],
	);
	const groupNames = React.useMemo(
		() => flattenedThemeShape.map((groups) => groups[0][0]),
		[],
	);
	const [openGroups, toggleOpenGroups] = useMultiple(groupNames);

	return (
		<ControlsContainer>
			{theme ? (
				<ThemeAppearance>
					<BigParagraph>Change the properties of {theme.name}:</BigParagraph>
					<Box>
						<Paragraph>Name:</Paragraph>
						<Text
							value={theme.name}
							onChange={(e) =>
								dispatch(
									changeThemeName({
										id: theme.id,
										newVal: e,
									}),
								)
							}
							name="theme-name-change"
							label="Name"
						/>
					</Box>
					<Column style={{ gap: "1rem" }}>
						{flattenedThemeShape.map((group) => {
							const groupName = group[0][0];
							return (
								<SettingsGroup
									key={groupName}
									preface={groupName}
									theme={theme}
									controls={group}
									title={capitalize(groupName)}
									open={openGroups[groupName]}
									onOpen={() => toggleOpenGroups(groupName)}
								/>
							);
						})}
					</Column>
				</ThemeAppearance>
			) : (
				<BigParagraph>Select a theme to modify it here</BigParagraph>
			)}
		</ControlsContainer>
	);
};

export default ModifyTheme;
