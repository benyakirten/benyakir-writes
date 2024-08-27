import * as React from "react";

import { useAppSelector } from "@Store/hooks";
import type { SVGData } from "@/types/portfolio";
import SVGLine from "./SVGLine.component";

const Segment1: React.FC<SVGData> = ({ xMovement, yMovement }) => {
	const themeStore = useAppSelector((root) => root.theme);
	return (
		<SVGLine xMovement={xMovement} yMovement={yMovement}>
			<path
				d="M20,50 C40,10 60,90 80,50 S120,10 140,50 C160,90 180,10 200,50"
				fill="none"
				stroke={themeStore.active.base.textColor}
				strokeWidth="2"
			/>
		</SVGLine>
	);
};

export default Segment1;
