import * as React from "react";

import { useAppSelector } from "@/store/hooks";
import type { SVGData } from "@/types/portfolio";
import SVGShape from "./SVGShape.component";

const Wheel: React.FC<SVGData> = ({ xMovement, yMovement }) => {
	const themeStore = useAppSelector((root) => root.theme);
	return (
		<SVGShape xMovement={xMovement} yMovement={yMovement}>
			<circle
				cx="50"
				cy="50"
				r="40"
				fill="none"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>

			<line
				x1="50"
				y1="10"
				x2="50"
				y2="90"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>
			<line
				x1="10"
				y1="50"
				x2="90"
				y2="50"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>

			<line
				x1="27"
				y1="73"
				x2="73"
				y2="27"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>
		</SVGShape>
	);
};
export default Wheel;
