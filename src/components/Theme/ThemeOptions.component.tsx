import * as React from "react";

import {
	BigParagraph,
	Box,
	Column,
	Paragraph,
} from "@/styles/general-components";

import { Toggle } from "@/components/Input";
import ModifyTheme from "./ModifyTheme/ModifyTheme.component";
import ThemeControls from "./ThemeControls/ThemeControl.component";

import { useAlternation, useMultiple } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleUseComputerPreferences } from "@/store/theme/theme.slice";
import { SIZE_MD } from "@/styles/variables";

const ThemeCard: React.FC = () => {
	const [allowsHover, setAllowsHover] = React.useState<boolean>();
	React.useEffect(() => {
		const _allowshover = window.matchMedia
			? window.matchMedia("(any-hover: hover)").matches
			: true;
		setAllowsHover(_allowshover);
	}, []);

	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const [selectedTheme, setSelectedTheme] = useAlternation();

	return (
		<Column style={{ gap: "1rem" }}>
			<BigParagraph>General Options</BigParagraph>
			<Box style={{ margin: `${SIZE_MD} 0` }}>
				<Paragraph>Use Computer Theme Preferences:</Paragraph>
				<Toggle
					label={themeStore.ignoreComputerPreferences ? "Off" : "On"}
					name="theme-ignore-computer-preferences"
					onToggle={() => dispatch(toggleUseComputerPreferences())}
					value={!themeStore.ignoreComputerPreferences}
				/>
			</Box>
			<ThemeControls
				selectedTheme={selectedTheme}
				setSelectedTheme={(e) => {
					if (e === "0" || e === "1") {
						return;
					}
					setSelectedTheme(e);
				}}
				allowsHover={!!allowsHover}
			/>
			<BigParagraph>Modify Theme</BigParagraph>
			<ModifyTheme selectedTheme={selectedTheme} />
		</Column>
	);
};

export default ThemeCard;
