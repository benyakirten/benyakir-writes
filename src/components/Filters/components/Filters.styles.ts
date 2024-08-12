import styled from "styled-components";

import { SIZE_MD, SIZE_SM, Z_RAISED } from "@/styles/variables";

export const FilterPillButton = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid ${(props) => props.theme.base.border};

    border-radius: ${SIZE_MD};

    &:focus {
		outline: 1px solid ${(props) => props.theme.base.border};
		outline-offset: 1px;
	}
`;

export const FilterMenu = styled.ul<{
	pointUpwards: boolean;
	height?: string;
	removeSpacing?: boolean;
}>`
	display: none;
	z-index: ${Z_RAISED};

	position: absolute;
	left: 0;
	${(props) => (props.pointUpwards ? "bottom: calc(100% + 2px);" : "top: calc(100% + 2px);")}

	min-width: calc(90% - ${SIZE_SM});
	height: ${(props) => props.height ?? "max-content"};

	background-color: ${(props) => props.theme.base.background};
	padding: ${(props) => (props.removeSpacing ? "0" : SIZE_SM)};

	border: 1px solid ${(props) => props.theme.base.textColor};

	&[aria-expanded='true'] {
		display: flex;
		flex-direction: column;
		gap: ${(props) => (props.removeSpacing ? "0" : SIZE_SM)};
	}
`;
