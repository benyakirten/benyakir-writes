import React from "react";
import styled from "styled-components";

import {
	FONT_SM,
	FONT_XS,
	SANS_SERIF_FONT,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
} from "@/styles/variables";

const TechPill = styled.div`
	display: flex;
	align-items: center;
	justify-content: between;
	height: min-content;

	font-family: ${SANS_SERIF_FONT};

	border-radius: ${SIZE_MD};
	border: 1px solid ${(props) => props.theme.base.textColor};

	padding: ${SIZE_XS} ${SIZE_SM};
`;

const TechIcon = styled.img`
	width: ${SIZE_SM};
	height: ${SIZE_SM};
	margin-right: ${SIZE_SM};
`;

const TechName = styled.span`
	font-size: ${FONT_XS};
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
