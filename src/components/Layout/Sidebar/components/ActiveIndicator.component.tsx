import React from "react";

import { StyledActiveIndicator } from "./ActiveIndicator.style";

const Activeindicator: React.FC<ActiveIndicatorProps> = ({ refs }) => {
	const activeLink = refs.find(
		(ref) => ref.current?.getAttribute("aria-current") === "page",
	);

	if (!activeLink?.current) {
		return null;
	}

	return <StyledActiveIndicator top={activeLink.current.offsetTop} />;
};

export default Activeindicator;
