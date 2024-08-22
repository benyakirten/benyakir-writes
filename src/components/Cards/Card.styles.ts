import styled from "styled-components";

import { FONT_XS, FONT_XXS, SIZE_LG, SIZE_XS } from "@/styles/variables";
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
`;

export const TagContainer = styled.div`
	grid-column: 2 / 3;

	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	align-items: center;
	gap: ${SIZE_XS};

	${media.phone} {
		gap: 2px;
	}
`;

export const FullContainer = styled.p`
	grid-column: span 2;
`;

export const PublishedContainer = styled.p`
	grid-column: span 2;
	color: ${(props) => props.theme.base.pillText};
	font-size: ${FONT_XXS};
`;

export const ImageContainer = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 4;
`;

export const AuthorTitle = styled.h3`
    font-weight: bold;
    grid-column: span 1;
`;

export const AuthorContent = styled.p`
    grid-column: span 1;
`;
