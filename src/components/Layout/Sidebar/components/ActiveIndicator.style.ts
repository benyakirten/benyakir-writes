import styled from "styled-components";

import { FONT_SIZE_LG, SIZE_XS, TRANSITION_NORMAL } from "@/styles/variables";

export const StyledActiveIndicator = styled.div<{ $pos: number }>`
    position: absolute;
    left: -${SIZE_XS};
    top: ${({ $pos }) => $pos + 4}px;

    height: ${FONT_SIZE_LG};
    width: calc(${SIZE_XS} * 0.5);
    transition: top ${TRANSITION_NORMAL} ease-in-out;

    background: ${(props) => props.theme.sidebar.link};
`;
