import React from "react";
import styled from "styled-components";

import {
	FONT_XS,
	FONT_XXS,
	SANS_SERIF_FONT,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
} from "@/styles/variables";

const TechPill = styled.div`
	display: flex;
	align-items: center;
	gap: ${SIZE_XS};
	height: min-content;

	font-family: ${SANS_SERIF_FONT};

	border-radius: ${SIZE_MD};
	border: 1px solid ${(props) => props.theme.base.textColor};

	padding: ${SIZE_XS} ${SIZE_SM};
`;

const TechIcon = styled.img`
	width: ${FONT_XS};
	height: ${FONT_XS};
`;

const TechName = styled.span`
	font-size: ${FONT_XXS};
`;

const ProjectTech: React.FC<{ publicURL: string; tech: string }> = ({
	publicURL,
	tech,
}) => {
	return (
		<TechPill>
			<TechIcon src={publicURL} alt={tech} />
			<TechName>{tech}</TechName>
		</TechPill>
	);
};

export default ProjectTech;
