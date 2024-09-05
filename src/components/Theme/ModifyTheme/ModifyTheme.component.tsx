import * as React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/store/hooks";
import { fadeIn } from "@/styles/animations";
import { BigParagraph, Subtitle } from "@/styles/general-components";
import { FONT_MD } from "@/styles/variables";
import ThemeSettings from "./ThemeSettings.component";

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
	const themes = useAppSelector((root) => root.theme.themes);
	const theme = themes.find((theme) => theme.id === selectedTheme);

	return (
		<>
			<Subtitle style={{ marginBottom: 0 }}>Modify Theme</Subtitle>
			<ControlsContainer>
				{theme ? (
					<ThemeAppearance>
						<ThemeSettings theme={theme} />
					</ThemeAppearance>
				) : (
					<BigParagraph>Select a theme to modify it here</BigParagraph>
				)}
			</ControlsContainer>
		</>
	);
};

export default ModifyTheme;
