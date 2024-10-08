import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { media } from "@/styles/queries";
import {
	SHADOW_CARD_HOVER,
	SHADOW_CARD_NORMAL,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_FAST,
	TRANSITION_SLOW,
} from "@/styles/variables";

const StyledCardExterior = styled.article<{ $columns: string }>`
	display: grid;
	position: relative;
	grid-template-columns: ${(props) => props.$columns};
	height: 100%;
	gap: ${SIZE_SM};

	padding: ${SIZE_SM};

	${media.phone} {
		padding: ${SIZE_SM} ${SIZE_XS};
	}

	border: 1px solid ${(props) => props.theme.base.border};
	border-radius: ${SIZE_XS};
	
	transition: box-shadow ${TRANSITION_SLOW} ease;

	box-shadow: ${(props) => `${SHADOW_CARD_NORMAL} ${props.theme.card.boxShadow}`};;
	&:hover {
		box-shadow: ${(props) => `${SHADOW_CARD_HOVER} ${props.theme.card.boxShadow}`};

		& > [data-arrow] {
			opacity: 1;
			clip-path: polygon(0% 35%, 99% 35%, 99% 0, 100% 50%, 99% 100%, 99% 65%, 0% 65%);
		}
	}
`;

const ExternalArrow = styled.div`
	position: absolute;
	display: inline-block;

	bottom: -12px;
	left: 4px;

	width: 99%;
	height: 8px;
	background-color: white;

	opacity: 0;
	clip-path: polygon(0% 35%, 1% 35%, 1% 0, 2% 50%, 1% 100%, 1% 65%, 0% 65%);
	background-color: ${(props) => props.theme.card.arrowColor};
	transition: clip-path ${TRANSITION_SLOW} ease ${TRANSITION_FAST};
	transition: opacity: ${TRANSITION_FAST} ease;
`;

const CardExterior: React.FC<
	{ slug: string; columns: string; rows?: string } & ChildrenProp
> = ({ slug, children, columns, rows }) => {
	return (
		<li>
			<Link to={slug}>
				<StyledCardExterior
					style={{ gridTemplateRows: rows }}
					$columns={columns}
				>
					<ExternalArrow data-arrow />
					{children}
				</StyledCardExterior>
			</Link>
		</li>
	);
};

export default CardExterior;
