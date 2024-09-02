import * as React from "react";

import { ColorInput, Container, Label } from "./ColorPicker.styles";

import { COLOR_REGEX } from "@/data/constants";
import { convertHSLToHex, parseHSLString } from "@/utils/colors";

const ColorPicker: React.FC<ColorPickerProps> = ({
	name,
	label,
	tabIndex = 0,
	value,
	onChange,
}) => {
	let val = value;
	if (val.startsWith("hsl")) {
		const hsl = parseHSLString(val);
		if (hsl) {
			val = convertHSLToHex(hsl);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = e.target.value;
		if (COLOR_REGEX.test(newVal)) {
			onChange(newVal);
		}
	};
	return (
		<Container tabIndex={tabIndex}>
			<Label htmlFor={name}>{label}</Label>
			<ColorInput
				type="color"
				name={name}
				id={name}
				value={val}
				tabIndex={tabIndex}
				onChange={handleChange}
			/>
		</Container>
	);
};

export default ColorPicker;
