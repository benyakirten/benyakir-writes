import * as React from "react";

import { Button } from "@/components/General";
import { CardContainer, CardHalf } from "./ThemeControls.styles";
import DraggableThemeList from "./ThemeLists/DraggableList/DraggableThemeList.component";

import { useAppDispatch } from "@/store/hooks";
import { resetThemeOptions } from "@/store/theme/theme.slice";

const ThemeControls: React.FC<ThemeControlProps> = ({
	selectedTheme,
	setSelectedTheme,
}) => {
	const dispatch = useAppDispatch();
	return (
		<CardContainer>
			<CardHalf>
				<DraggableThemeList
					onSelect={setSelectedTheme}
					selectedTheme={selectedTheme}
				/>
				<Button onClick={() => dispatch(resetThemeOptions())}>
					Remove all custom themes
				</Button>
			</CardHalf>
		</CardContainer>
	);
};

export default ThemeControls;
