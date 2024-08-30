import * as React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePropOnTheme } from "@/store/theme/theme.slice";
import {
	convertHexToHSL,
	convertHSLToCSSColor,
	convertHSLToHex,
	parseHSLString,
} from "@/utils/colors";
import { BigParagraph } from "@/styles/general-components";
import { styled } from "styled-components";
import { getThemePropRecursive } from "@/utils/other";
import { camelToTitleCase, capitalize } from "@/utils/strings";
import { FONT_LG, SIZE_SM, SIZE_XS, Z_ABOVE } from "@/styles/variables";
import ColorPicker from "./ColorPicker/ColorPicker.component";

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
		const name = accessors.join("-");
		const label = accessors
			.slice(1)
			.reduce<string[]>((acc, next) => {
				const nextTitled = camelToTitleCase(next);
				const nextCap = capitalize(nextTitled);

				acc.push(nextCap);

				return acc;
			}, [])
			.join(" > ");

		if (accessors.at(-1)?.toLowerCase().includes("gradient")) {
			return null;
		}

		let val = control;
		if (val.startsWith("hsl")) {
			const hslString = parseHSLString(val);
			if (hslString) {
				val = convertHSLToHex(hslString);
			}
		}

		return (
			<ColorPicker
				label={label}
				name={name}
				value={val}
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
	position: relative;

	display: grid;
	gap: ${SIZE_SM};
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

	padding: ${SIZE_SM};
	border-radius: ${SIZE_XS};
	background-color: ${({ theme }) => theme.base.background};
	border: 1px solid ${({ theme }) => theme.base.border};

	&::after {
		content: attr(data-name);

		${FONT_LG};

		position: absolute;
		top: calc(-1 * (${SIZE_SM} + 4px));
		left: ${SIZE_SM};

		background-color: ${({ theme }) => theme.base.background};
		z-index: ${Z_ABOVE};
		padding: 0 ${SIZE_XS};

		text-transform: capitalize;
	}
`;

const SettingsGroup: React.FC<SettingsGroupProps> = ({ name, id }) => {
	const themes = useAppSelector((state) => state.theme.themes);
	const selectedTheme = themes.find((theme) => theme.id === id);

	if (!selectedTheme) {
		return <BigParagraph>Unable to find selected theme.</BigParagraph>;
	}

	return (
		<SettingsGroupContainer data-name={name}>
			{Object.keys(selectedTheme[name]).map((key) => {
				const accessors = [name, key];
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
