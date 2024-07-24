import type * as React from "react";
import { TechnologyCheckox, TechnologyLabel } from "./Portfolio.styles";

const TextCheckbox: React.FC<{
	checked: boolean;
	onToggle: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	children: React.ReactNode;
}> = ({ children, checked, onToggle, onMouseEnter, onMouseLeave }) => {
	return (
		<TechnologyLabel
			checked={checked}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
			<TechnologyCheckox
				type="checkbox"
				checked={checked}
				onChange={onToggle}
			/>
		</TechnologyLabel>
	);
};

export default TextCheckbox;
