import styled from "styled-components";

import {
	SANS_SERIF_FONT,
	SERIF_FONT,
	TRANSITION_NORMAL,
	VERTICAL_SM,
} from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";

export const ResultContainer = styled.button`
    width: 100%;
    padding: ${VERTICAL_SM};

    font-family: ${SERIF_FONT};

    &:not(:last-child) {
        border-bottom: 1px solid ${(props) => convertHexToRGBA(props.theme.base.textColor, 0.4)};
    }
    
    opacity: 0.6;
    transition: opacity ${TRANSITION_NORMAL} ease;

    &:hover, &:focus {
        opacity: 1;
    }
`;

export const ItemTitle = styled.h2`
	font-family: ${SANS_SERIF_FONT};
`;
