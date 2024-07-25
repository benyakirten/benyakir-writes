import * as React from "react";

import { ColorInput, Container, Label } from "./ColorPicker.styles";

import { COLOR_REGEX } from "@Constants";

const ColorPicker: React.FC<ColorPickerProps> = ({
	name,
	label,
	tabIndex = 0,
	value,
	onChange,
}) => {
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
				value={value}
				tabIndex={tabIndex}
				onChange={handleChange}
			/>
		</Container>
	);
};

export default ColorPicker;
