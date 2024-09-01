import styled from "styled-components";

import { FONT_SM, SIZE_XS } from "@/styles/variables";
import { media } from "@/styles/queries";
import { limitLines } from "@/styles/style-mixins";

export const CardTitle = styled.h3`
    font-weight: bold;
    grid-column: span 2;

    ${limitLines(1)}
`;

export const CategoryContainer = styled.p`
    grid-column: 1 / 2;
    align-self: center;

    ${FONT_SM};
    font-weight: bold;
`;

export const TagContainer = styled.div`
	grid-column: 2 / 3;

	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	align-items: center;
	gap: ${SIZE_XS};

    min-width: max-content;
    max-width: 100%;

	${media.phone} {
		gap: 2px;
        width: 100%;
        justify-self: end;

        min-width: unset;
        max-width: unset;
	}
`;

export const FullContainer = styled.p`
	grid-column: span 2;
`;

export const ImageContainer = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 4;
`;

export const SpanOneTitle = styled.h3`
    display: grid;
    align-content: center;
    
    font-weight: bold;
    grid-column: span 1;
`;

export const SpanOneContent = styled.p`
    grid-column: span 1;
`;
