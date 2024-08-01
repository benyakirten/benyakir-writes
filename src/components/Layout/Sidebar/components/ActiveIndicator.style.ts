import {
	FONT_LG,
	TRANSITION_EXTRA_SLOW,
	TRANSITION_FAST,
	TRANSITION_NORMAL,
} from "@/styles/variables";
import styled from "styled-components";

export const StyledActiveIndicator = styled.div<{ top: number }>`
    position: absolute;
    right: 0;
    top: ${({ top }) => top}px;

    height: ${FONT_LG};
    width: 10%;
    transition: top ${TRANSITION_NORMAL} ease-in-out;

    background-color: ${(props) => props.theme.link.dark};
`;
