import React from "react";
import styled from "styled-components";

import { SANS_SERIF_FONT, FONT_MD, FONT_LG, SIZE_SM } from "@/styles/variables";

const StyledPortfolioHeader = styled.div`
  display: grid;
  gap: ${SIZE_SM};
  font-family: ${SANS_SERIF_FONT};
  justify-content: center;
`;

const StyledName = styled.h2`
    font-size: ${FONT_LG};
    text-align: center;
`;

const StyledRole = styled.p`
    font-size: ${FONT_MD};
    text-align: center;
`;

const PortfolioHeader: React.FC = () => {
	return (
		<StyledPortfolioHeader>
			<StyledName>Ben Horowitz</StyledName>
			<StyledRole>Software Engineer</StyledRole>
		</StyledPortfolioHeader>
	);
};

export default PortfolioHeader;
