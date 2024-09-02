import * as React from "react";

import { useAppSelector } from "@/store/hooks";
import type { SVGData } from "@/types/portfolio";
import { generatePolygonPoints } from "@/utils/svgs";
import SVGShape from "./SVGShape.component";

const Polygon: React.FC<SVGData> = ({ xMovement, yMovement }) => {
	const [points] = React.useState(generatePolygonPoints());
	const themeStore = useAppSelector((root) => root.theme);
	return (
		<SVGShape xMovement={xMovement} yMovement={yMovement}>
			<polygon
				points={points}
				fill="none"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>
		</SVGShape>
	);
};

export default Polygon;
