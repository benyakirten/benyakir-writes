import * as React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePropOnTheme } from "@/store/theme/theme.slice";
import { convertHexToHSL, convertHSLToCSSColor } from "@/utils/colors";
import { BigParagraph } from "@/styles/general-components";
import { styled } from "styled-components";
import { getThemePropRecursive } from "@/utils/other";
import { capitalize } from "@/utils/strings";
import { SIZE_SM, SIZE_XS } from "@/styles/variables";
import { ColorPicker } from "@/components/Input";

const ColorPickerContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
`;

const SettingsItem: React.FC<SettingsItemProps> = ({
	accessors,
	theme,
	id,
}) => {
	const dispatch = useAppDispatch();

	const control = getThemePropRecursive(theme, accessors);

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

	if (typeof control === "string") {
		const allAccessors = [...accessors, control];
		const name = allAccessors.join("-");
		const label = allAccessors.map(capitalize).join(" > ");

		if (accessors[-1].toLowerCase().includes("gradient")) {
			// TODO: Render different control for gradient
			return null;
		}

		return (
			<ColorPicker
				label={label}
				name={name}
				value={control}
				onChange={(e) => handleChange(e, accessors)}
			/>
		);
	}

	return (
		<>
			{Object.keys(control).map((key) => {
				const controls = [...accessors, key];
				const itemKey = controls.join("-");
				return (
					<SettingsItem
						key={itemKey}
						accessors={controls}
						theme={theme}
						id={id}
					/>
				);
			})}
		</>
	);
};

const SettingsGroupContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

	padding: ${SIZE_SM};
	border-radius: ${SIZE_XS};
	background-color: ${({ theme }) => theme.base.background};
	border: 1px solid ${({ theme }) => theme.base.border};
`;

const SettingsGroup: React.FC<SettingsGroupProps> = ({ name, id }) => {
	const themes = useAppSelector((state) => state.theme.themes);
	const selectedTheme = themes.find((theme) => theme.id === id);

	if (!selectedTheme) {
		return <BigParagraph>Unable to find selected theme.</BigParagraph>;
	}

	return (
		<SettingsGroupContainer>
			{Object.keys(selectedTheme[name]).map((key) => {
				const accessors = [key];
				return (
					<SettingsItem
						key={key}
						accessors={accessors}
						theme={selectedTheme}
						id={id}
					/>
				);
			})}
		</SettingsGroupContainer>
	);
};

export default SettingsGroup;
