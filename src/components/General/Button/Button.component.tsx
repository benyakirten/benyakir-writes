import * as React from "react";

import { ButtonExterior } from "./Button.styles";

import { getFourCorners, getNearestCornerIdx } from "@Utils/coordinates";

import {
	CORNER_INDEX_TO_POSITIONING,
	TRANSFORM_ORIGIN_FOR_CORNER_INDEX,
	TRIANGLES_FOR_CORNER_INDEX,
} from "@Constants";

const Button: React.FC<ButtonProps> = ({
	disabled = false,
	type = "button",
	children,
	onClick = () => {},
	tabIndex = 0,
}) => {
	const [cornerIdx, setCornerIdx] = React.useState<number>(0);

	const handleMouseover: React.MouseEventHandler = (e) => {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}
		const mouseLoc: Coord = { x: e.clientX, y: e.clientY };
		const corners: Corners = getFourCorners(e.target.getBoundingClientRect());
		const _cornerIdx = getNearestCornerIdx(mouseLoc, corners);
		setCornerIdx(_cornerIdx);
	};

	return (
		<ButtonExterior
			type={type}
			disabled={disabled}
			onMouseEnter={handleMouseover}
			onClick={onClick}
			tabIndex={tabIndex}
		>
			<div
				style={{
					...CORNER_INDEX_TO_POSITIONING[cornerIdx],
					transformOrigin: TRANSFORM_ORIGIN_FOR_CORNER_INDEX[cornerIdx],
					clipPath: TRIANGLES_FOR_CORNER_INDEX[cornerIdx],
				}}
			/>
			<span>{children}</span>
		</ButtonExterior>
	);
};

export default Button;
