import * as React from "react";

import { DestinationColumn } from "./DestinationThemeList.styles";

import { DestinationItem } from "@/components/Input/Draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	copyThemeByID,
	deleteThemeByID,
	setActiveThemeByID,
	setThemePreferenceByID,
} from "@/store/theme/theme.slice";

const DestinationThemeList: React.FC<DestinationThemeListProps> = ({
	selectedTheme,
	setSelectedTheme,
}) => {
	const themeStore = useAppSelector((root) => root.theme);
	const preferredTheme = React.useMemo(
		() => themeStore.themes.find((theme) => theme.id === themeStore.prefers),
		[themeStore.prefers, themeStore.themes],
	);

	const dispatch = useAppDispatch();
	const deleteHandler = (val: string) => {
		if (selectedTheme === val) {
			setSelectedTheme("");
		}
		dispatch(deleteThemeByID(val));
	};
	return (
		<DestinationColumn>
			<DestinationItem
				title="Preferred Theme"
				onDrop={(val) => dispatch(setThemePreferenceByID(val))}
			>
				{preferredTheme ? preferredTheme.name : "Unknown"}
			</DestinationItem>
			<DestinationItem
				title="Active Theme"
				onDrop={(val) => dispatch(setActiveThemeByID(val))}
			>
				{themeStore.active.name}
			</DestinationItem>
			<DestinationItem
				title="Copy Theme"
				onDrop={(val) => dispatch(copyThemeByID(val))}
			>
				Drag and drop theme here to create a copy of it
			</DestinationItem>
			<DestinationItem title="Delete Theme" onDrop={deleteHandler}>
				Drag and drop theme here to delete it
			</DestinationItem>
		</DestinationColumn>
	);
};

export default DestinationThemeList;
