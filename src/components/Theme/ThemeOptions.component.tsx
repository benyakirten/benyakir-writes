import * as React from "react";

import {
	BigParagraph,
	Box,
	Column,
	Paragraph,
	Subtitle,
} from "@/styles/general-components";

import { Toggle } from "@/components/Input";
import ModifyTheme from "./ModifyTheme/ModifyTheme.component";
import ThemeControls from "./ThemeControls/ThemeControl.component";

import { useAlternation } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleUseComputerPreferences } from "@/store/theme/theme.slice";
import { SIZE_MD } from "@/styles/variables";

const ThemeCard: React.FC = () => {
	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const [selectedTheme, setSelectedTheme] = useAlternation();

	return (
		<Column style={{ gap: "1rem" }}>
			<ThemeControls
				selectedTheme={selectedTheme}
				setSelectedTheme={setSelectedTheme}
			/>
			<Subtitle>Modify Theme</Subtitle>
			<ModifyTheme selectedTheme={selectedTheme} />
		</Column>
	);
};

export default ThemeCard;
