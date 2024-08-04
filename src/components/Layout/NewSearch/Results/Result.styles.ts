import styled from "styled-components";

import {
	SANS_SERIF_FONT,
	SERIF_FONT,
	TRANSITION_NORMAL,
} from "@/styles/variables";

export const ResultContainer = styled.button`
    font-family: ${SERIF_FONT};

    opacity: 0.7;
    transition: opacity ${TRANSITION_NORMAL} ease;
    &:hover, &:focus {
        opacity: 1;
    }
`;

export const ItemTitle = styled.h2`
	font-family: ${SANS_SERIF_FONT};
`;
