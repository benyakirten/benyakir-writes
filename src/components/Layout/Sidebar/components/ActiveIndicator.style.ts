import { FONT_SIZE_LG, TRANSITION_NORMAL } from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";
import styled from "styled-components";

export const StyledActiveIndicator = styled.div<{ $pos: number }>`
    position: absolute;
    left: 100%;
    top: ${({ $pos }) => $pos + 4}px;

    height: ${FONT_SIZE_LG};
    width: 13%;
    transition: top ${TRANSITION_NORMAL} ease-in-out;

    background: ${(props) => props.theme.base.link};
`;
