import * as React from "react";

import { useAppSelector } from "@/store/hooks";
import type { SVGData } from "@/types/portfolio";
import SVGLine from "./SVGLine.component";

const Segment2: React.FC<SVGData> = ({ xMovement, yMovement }) => {
	const themeStore = useAppSelector((root) => root.theme);
	return (
		<SVGLine xMovement={xMovement} yMovement={yMovement}>
			<path
				d="M10 50 C30 10, 70 90, 90 50"
				fill="none"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>
		</SVGLine>
	);
};

export default Segment2;
