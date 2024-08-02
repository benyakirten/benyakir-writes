import React from "react";

import { StyledActiveIndicator } from "./ActiveIndicator.style";

const Activeindicator: React.FC<ActiveIndicatorProps> = ({ activeLinkRef }) => {
	if (!activeLinkRef?.current) {
		return null;
	}

	return <StyledActiveIndicator top={activeLinkRef.current.offsetTop} />;
};

export default Activeindicator;