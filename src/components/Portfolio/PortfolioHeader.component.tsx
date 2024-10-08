import React from "react";
import styled from "styled-components";

import { LeadHeading } from "@/styles/general-components";
import { SANS_SERIF_FONT, SIZE_SM } from "@/styles/variables";

const StyledPortfolioHeader = styled.div`
  display: grid;
  gap: ${SIZE_SM};
  font-family: ${SANS_SERIF_FONT};
  justify-content: center;
`;

const PortfolioHeader: React.FC = () => {
	return (
		<StyledPortfolioHeader>
			<LeadHeading>Portfolio</LeadHeading>
		</StyledPortfolioHeader>
	);
};

export default PortfolioHeader;
