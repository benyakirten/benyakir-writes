import React from "react";
import styled from "styled-components";

import {
	SANS_SERIF_FONT,
	FONT_SIZE_MD,
	SIZE_SM,
	FONT_SIZE_XL,
} from "@/styles/variables";

const StyledPortfolioHeader = styled.div`
  display: grid;
  gap: ${SIZE_SM};
  font-family: ${SANS_SERIF_FONT};
  justify-content: center;
`;

const StyledName = styled.h2`
    font-size: ${FONT_SIZE_XL};
    text-align: center;
`;

const StyledRole = styled.p`
    font-size: ${FONT_SIZE_MD};
    text-align: center;
`;

const PortfolioHeader: React.FC = () => {
	return (
		<StyledPortfolioHeader>
			<StyledName>Ben Horowitz</StyledName>
			<StyledRole>Full Stack Developer</StyledRole>
		</StyledPortfolioHeader>
	);
};

export default PortfolioHeader;
