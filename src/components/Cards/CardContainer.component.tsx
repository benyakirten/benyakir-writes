import React from "react";
import styled from "styled-components";

import { media } from "@/styles/queries";
import { FONT_LG, FONT_XL, SIZE_LG } from "@/styles/variables";

const StyledCardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_LG};
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));

    ${media.phone} {
        grid-template-columns: 1fr;
    }
`;

const NoResults = styled.p`
    ${FONT_XL}
`;

function CardContainer<T extends { slug: string }>({
	Card,
	items,
	type,
}: { Card: React.FC<T>; items: T[]; type: string }) {
	if (items.length === 0) {
		return <NoResults>No {type}s found.</NoResults>;
	}

	return (
		<StyledCardContainer>
			{items.map((item) => {
				return <Card key={item.slug} {...item} />;
			})}
		</StyledCardContainer>
	);
}

export default CardContainer;
