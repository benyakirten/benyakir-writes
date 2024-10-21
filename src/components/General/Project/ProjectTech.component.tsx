import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/store/hooks";
import {
	FONT_SIZE_XS,
	SANS_SERIF_FONT,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
} from "@/styles/variables";
import { isBgDark } from "@/utils/colors";

export const TechPill = styled.div<{ $borderColor?: string }>`
  display: flex;
  align-items: center;
  gap: ${SIZE_XS};

  width: fit-content;
  height: min-content;

  font-family: ${SANS_SERIF_FONT};

  border-radius: ${SIZE_MD};
  border: 1px solid
    ${(props) => props.$borderColor ?? props.theme.base.textColor};

  padding: ${SIZE_XS} ${SIZE_SM};
`;

const TechIcon = styled.img<{ $isDark: boolean }>`
  filter: invert(${(props) => (props.$isDark ? 1 : 0)});
  width: calc(${SIZE_SM} * 1.2);
  height: calc(${SIZE_SM} * 1.2);
`;

const TechName = styled.span<{ $textColor?: string }>`
  font-size: ${FONT_SIZE_XS};
  color: ${(props) => props.$textColor ?? props.theme.base.textColor};
`;

const ProjectTech: React.FC<{
	publicURL: string;
	tech: string;
	override?: {
		borderColor: string;
		keepIconColor: boolean;
		textColor: string;
	};
	shouldInvertInDark?: boolean;
}> = ({ publicURL, tech, override = null, shouldInvertInDark = false }) => {
	const theme = useAppSelector((root) => root.theme.active);
	const shouldUseDark = override?.keepIconColor
		? false
		: shouldInvertInDark &&
			isBgDark(theme.id, theme.name, theme.base.background);

	return (
		<TechPill $borderColor={override?.borderColor}>
			<TechIcon $isDark={shouldUseDark} src={publicURL} alt={tech} />
			<TechName $textColor={override?.textColor}>{tech}</TechName>
		</TechPill>
	);
};

export default ProjectTech;
