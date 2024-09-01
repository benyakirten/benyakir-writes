import * as React from "react";
import { styled } from "styled-components";

import { useAlternation } from "@/hooks";
import { Subtitle } from "@/styles/general-components";
import { SIZE_SM } from "@/styles/variables";
import ModifyTheme from "./ModifyTheme/ModifyTheme.component";
import ThemeControls from "./ThemeControls/ThemeControl.component";

const ThemeCardContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
`;

const ThemeCard: React.FC = () => {
	const [selectedTheme, setSelectedTheme] = useAlternation();

	return (
		<ThemeCardContainer>
			<ThemeControls
				selectedTheme={selectedTheme}
				setSelectedTheme={setSelectedTheme}
			/>
			<Subtitle style={{ marginBottom: 0 }}>Modify Theme</Subtitle>
			<ModifyTheme selectedTheme={selectedTheme} />
		</ThemeCardContainer>
	);
};

export default ThemeCard;
