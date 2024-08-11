import React from "react";

import { getFourCorners, getNearestCornerIdx } from "@/utils/coordinates";
import {
	CORNER_INDEX_TO_POSITIONING,
	TRANSFORM_ORIGIN_FOR_CORNER_INDEX,
	TRIANGLES_FOR_CORNER_INDEX,
} from "@/data/constants";
import { FillInExterior } from "./FillIn.styles";

const FillIn: React.FC<
	ChildrenProp & {
		borderRadiusCorners?: BorderRadiusCorners;
		filledIn?: boolean;
	}
> = ({ children, borderRadiusCorners = {}, filledIn }) => {
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
		<FillInExterior
			data-force-fill-in={filledIn || false}
			borderRadiusCorners={borderRadiusCorners}
			onMouseEnter={handleMouseover}
		>
			<div
				data-fill-in
				style={{
					...CORNER_INDEX_TO_POSITIONING[cornerIdx],
					transformOrigin: TRANSFORM_ORIGIN_FOR_CORNER_INDEX[cornerIdx],
					clipPath: TRIANGLES_FOR_CORNER_INDEX[cornerIdx],
				}}
			/>
			<span>{children}</span>
		</FillInExterior>
	);
};

export default FillIn;
