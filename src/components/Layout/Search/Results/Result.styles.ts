import styled from "styled-components";

import {
	SANS_SERIF_FONT,
	SERIF_FONT,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
	VERTICAL_SM,
} from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";
import { media } from "@/styles/queries";

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

export const InnerContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	gap: ${SIZE_SM};

	${media.phone} {
		flex-direction: column;
	}
`;

export const ContentContainer = styled.div`
	flex: 3;
	display: grid;
	gap: ${SIZE_XS};
`;

export const TitleContainer = styled.div`
	display: grid;
	gap: ${SIZE_XS};
`;

export const SlubTitle = styled.span`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
`;

export const BookCoverContainer = styled.div`
	display: flex;
	padding-left: 1rem;
	max-height: 7rem;
    flex: 1;

	${media.phone} {
		display: none;
	}
`;
