import type * as React from "react";

import { TextAreaContainer } from "./TextArea.styles";

const TextArea: React.FC<TextProps> = ({ name, label, value, onChange }) => {
	const letters = value.replace(/\s/g, "").length;
	const words = value.length === 0 ? 0 : value.split(" ").length;
	const density = letters === 0 ? 0 : +(letters / words).toFixed(2);
	return (
		<TextAreaContainer>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				id={name}
				name={name}
				placeholder=" "
			/>
			<label htmlFor={name}>{label}</label>
			<span>
				Letters: {letters} - Words: {words} - Average Word Length: {density}
			</span>
		</TextAreaContainer>
	);
};

export default TextArea;
