import * as React from "react";

import { Button } from "@/components/General";
import { CardContainer, CardHalf } from "./ThemeControls.styles";
import DestinationThemeList from "./ThemeLists/DestinationThemeList/DestinationThemeList.component";
import DraggableThemeList from "./ThemeLists/DraggableList/DraggableThemeList.component";

import { useAppDispatch } from "@Store/hooks";
import { createTheme, resetThemeOptions } from "@Store/theme/theme.slice";

const ThemeControls: React.FC<ThemeControlProps> = ({
	selectedTheme,
	setSelectedTheme,
	open,
	allowsHover,
}) => {
	const dispatch = useAppDispatch();
	return (
		<CardContainer>
			<CardHalf>
				<DraggableThemeList
					open={open}
					onSelect={setSelectedTheme}
					selectedTheme={selectedTheme}
				/>
				<Button
					tabIndex={open ? 0 : -1}
					onClick={() => dispatch(createTheme())}
				>
					Create New Theme
				</Button>
				<Button
					tabIndex={open ? 0 : -1}
					onClick={() => dispatch(resetThemeOptions())}
				>
					Reset
				</Button>
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
