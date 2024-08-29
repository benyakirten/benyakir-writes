import * as React from "react";

import { Button } from "@/components/General";
import { CardContainer, CardHalf } from "./ThemeControls.styles";
import DestinationThemeList from "./ThemeLists/DestinationThemeList/DestinationThemeList.component";
import DraggableThemeList from "./ThemeLists/DraggableList/DraggableThemeList.component";

import { useAppDispatch } from "@/store/hooks";
import { createTheme, resetThemeOptions } from "@/store/theme/theme.slice";

const ThemeControls: React.FC<ThemeControlProps> = ({
	selectedTheme,
	setSelectedTheme,
	allowsHover,
}) => {
	const dispatch = useAppDispatch();
	return (
		<CardContainer>
			<CardHalf>
				<DraggableThemeList
					onSelect={setSelectedTheme}
					selectedTheme={selectedTheme}
				/>
				<Button onClick={() => dispatch(createTheme())}>
					Create New Theme
				</Button>
				<Button onClick={() => dispatch(resetThemeOptions())}>Reset</Button>
			</CardHalf>
			{allowsHover && (
				<CardHalf>
					<DestinationThemeList
						selectedTheme={selectedTheme}
						setSelectedTheme={setSelectedTheme}
					/>
				</CardHalf>
			)}
		</CardContainer>
	);
};

export default ThemeControls;
