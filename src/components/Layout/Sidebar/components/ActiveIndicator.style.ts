import { FONT_LG, TRANSITION_FAST } from "@/styles/variables";
import styled from "styled-components";

export const StyledActiveIndicator = styled.div<{ top: number }>`
    position: absolute;
    left: -12%;
    top: ${({ top }) => top}px;
    transition: top ${TRANSITION_FAST} ease-in-out;
    height: ${FONT_LG};
    width: 10%;
    background-color: ${(props) => props.theme.link.dark};
`;
