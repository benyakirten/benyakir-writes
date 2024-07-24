import type * as React from "react";

import { StyledArrow } from "./DownArrow.styles";

const DownArrow: React.FC<DownArrowProps> = ({
	open = false,
	tabIndex = -1,
	onClick = undefined,
	cyId,
}) => {
	return (
		<StyledArrow
			role="button"
			open={open}
			tabIndex={tabIndex}
			onClick={onClick}
			data-cy={cyId ? cyId : "submenu-open"}
		>
			&#8609;
		</StyledArrow>
	);
};

export default DownArrow;
