import * as React from "react";

import { ColorPicker } from "@/components/Input";

import { getThemePropRecursive } from "@/utils/other";
import { titleCase } from "@/utils/strings";

import { useAppDispatch } from "@/store/hooks";
import { changePropOnTheme } from "@/store/theme/theme.slice";
import { convertHexToHSL, convertHSLToCSSColor } from "@/utils/colors";

const SettingsGroup: React.FC<SettingsGroupProps> = ({
	preface,
	controls,
	open,
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
		<>
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
		</>
	);
};

export default SettingsGroup;
