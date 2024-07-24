import type * as React from "react";

import { CheckboxGroup } from "./Checkbox.style";

const Checkbox: React.FC<CheckboxProps> = ({
	label,
	name,
	onToggle,
	value,
	tabIndex = 0,
}) => {
	return (
		<CheckboxGroup>
			<input
				type="checkbox"
				name={name}
				id={name}
				checked={value}
				aria-labelledby={`label-${name}`}
				onChange={() => onToggle(!value)}
			/>
			<label
				onClick={() => onToggle(!value)}
				onKeyUp={(e) => e.key === "Enter" && onToggle(!value)}
				data-navtoggle="no-toggle"
				tabIndex={tabIndex}
				htmlFor={name}
			>
				<span data-navtoggle="no-toggle" aria-hidden="true">
					&#9758;
				</span>
			</label>
			<span
				onClick={() => onToggle(!value)}
				onKeyUp={(e) => e.key === "Enter" && onToggle(!value)}
				id={`label-${name}`}
			>
				{label}
			</span>
		</CheckboxGroup>
	);
};

export default Checkbox;
