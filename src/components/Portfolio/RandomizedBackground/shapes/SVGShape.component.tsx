import * as React from "react";

import type { SVGShapeData } from "@/types/portfolio";
import { SVGShapeBase } from "./Svgs.styles";

const SVGShape: React.FC<SVGShapeData> = ({
	xMovement,
	yMovement,
	children,
}) => (
	<SVGShapeBase size={40} $xMovement={xMovement} $yMovement={yMovement}>
		{children}
	</SVGShapeBase>
);

export default SVGShape;
