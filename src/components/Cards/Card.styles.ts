import styled from "styled-components";

import { FONT_XS, SIZE_LG, SIZE_XS } from "@/styles/variables";
import { media } from "@/styles/queries";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_LG};
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

    ${media.phone} {
        grid-template-columns: 1fr;
    }
`;

export const CardTitle = styled.h3`
    font-weight: bold;
    grid-column: span 2;
`;

export const CategoryContainer = styled.p`
    grid-column: 1 / 2;
    align-self: center;

    font-size: ${FONT_XS};
    font-weight: bold;
    white-space: nowrap;
`;

export const TagContainer = styled.div`
	grid-column: 2 / 3;

	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	align-items: center;
	gap: ${SIZE_XS};

    width: clamp(max-content, 100%);

	${media.phone} {
		gap: 2px;
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
