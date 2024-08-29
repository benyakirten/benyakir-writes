import * as React from "react";

import { Foldout } from "@/components/General";
import { ColorPicker } from "@/components/Input";
import { BigParagraph } from "@/styles/general-components";

import { getThemePropRecursive } from "@/utils/other";
import { titleCase } from "@/utils/strings";

import { useAppDispatch } from "@/store/hooks";
import { changePropOnTheme } from "@/store/theme/theme.slice";
import {
	convertHexToHSL,
	convertHSLToCSSColor,
	parseHSLString,
} from "@/utils/colors";

const SettingsGroup: React.FC<SettingsGroupProps> = ({
	title,
	preface,
	controls,
	open,
	onOpen,
	theme,
}) => {
	const dispatch = useAppDispatch();
	const handleChange = (e: string, control: ThemeAccessors) => {
		const val = convertHexToHSL(e);
		dispatch(
			changePropOnTheme({
				id: theme.id,
				props: control,
				newVal: convertHSLToCSSColor(val),
			}),
		);
	};
	return (
		<Foldout
			onClick={onOpen}
			topbar={<BigParagraph>{title}</BigParagraph>}
			open={open}
			height="auto"
		>
			{controls.map((control) => {
				const name = control.join("-");
				const label = titleCase(
					control.slice(1).flatMap((ctrl) => ctrl.split(/(?=[A-Z])/)),
				);
				return (
					<ColorPicker
						key={`${preface}-${name}`}
						tabIndex={open ? 0 : -1}
						label={label}
						name={name}
						value={getThemePropRecursive(theme, control)}
						onChange={(e) => handleChange(e, control)}
					/>
				);
			})}
		</Foldout>
	);
};

export default SettingsGroup;
