import * as React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePropOnTheme } from "@/store/theme/theme.slice";
import { convertHexToHSL, convertHSLToCSSColor } from "@/utils/colors";
import { BigParagraph } from "@/styles/general-components";
import { styled } from "styled-components";

const SettingsItem: React.FC<SettingsItemProps> = ({
	accessors,
	control,
	id,
}) => {
	const dispatch = useAppDispatch();

	const handleChange = (e: string, control: string[]) => {
		const val = convertHexToHSL(e);
		dispatch(
			changePropOnTheme({
				id,
				props: control,
				newVal: convertHSLToCSSColor(val),
			}),
		);
	};
	return null;
};

const SettingsGroupContainer = styled.div``;

const SettingsGroup: React.FC<SettingsGroupProps> = ({ name, id }) => {
	const themes = useAppSelector((state) => state.theme.themes);
	const selectedTheme = themes.find((theme) => theme.id === id);

	if (!selectedTheme) {
		return <BigParagraph>Unable to find selected theme.</BigParagraph>;
	}

	return null;
	// return (
	// 	<>
	// 		{controls.map((control) => {
	// 			const name = control.join("-");
	// 			const label = titleCase(
	// 				control.slice(1).flatMap((ctrl) => ctrl.split(/(?=[A-Z])/)),
	// 			);
	// 			return (
	// 				<ColorPicker
	// 					key={`${preface}-${name}`}
	// 					tabIndex={open ? 0 : -1}
	// 					label={label}
	// 					name={name}
	// 					value={getThemePropRecursive(theme, control)}
	// 					onChange={(e) => handleChange(e, control)}
	// 				/>
	// 			);
	// 		})}
	// 	</>
	// );
};

export default SettingsGroup;
