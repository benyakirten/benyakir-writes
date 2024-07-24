import type * as React from "react";

import { Icon } from "@Gen";
import { StyledBox } from "./IconGrid.styles";

const IconGrid: React.FC<IconGridProps> = ({ icons, height = "3rem" }) => {
	return (
		<StyledBox>
			{icons.map((i) => (
				<Icon key={i.name} height={height} icon={i} />
			))}
		</StyledBox>
	);
};

export default IconGrid;
