import * as React from "react";

import type { SVGShapeData } from "@/types/portfolio";
import { SVGShapeBase } from "./Svgs.styles";

const SVGShape: React.FC<SVGShapeData> = ({
	xMovement,
	yMovement,
	children,
}) => {
	const rotation = React.useMemo(
		() => (Math.floor(Math.random() * 3) + 3) * -60,
		[],
	);

	return (
		<SVGShapeBase
			size={80}
			$xMovement={xMovement}
			$yMovement={yMovement}
			$rotation={rotation}
		>
			{children}
		</SVGShapeBase>
	);
};

export default SVGShape;
