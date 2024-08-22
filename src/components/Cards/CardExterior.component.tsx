import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { media } from "@/styles/queries";
import {
	SIZE_SM,
	SIZE_XS,
	TRANSITION_SLOW,
	SHADOW_CARD_NORMAL,
	SHADOW_CARD_HOVER,
	TRANSITION_FAST,
} from "@/styles/variables";

const StyledCardExterior = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: auto 1fr;
	height: 100%;
	gap: ${SIZE_SM};

	padding: ${SIZE_SM};

	${media.phone} {
		padding: ${SIZE_SM} ${SIZE_XS};
	}

	border: 1px solid ${(props) => props.theme.base.border};
	border-radius: ${SIZE_XS};
	
	transition: box-shadow ${TRANSITION_SLOW} ease;

	box-shadow: ${SHADOW_CARD_NORMAL};
	&:hover {
		box-shadow: ${SHADOW_CARD_HOVER};

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
	transition: clip-path ${TRANSITION_SLOW} ease ${TRANSITION_FAST};
	transition: opacity: ${TRANSITION_FAST} ease;
`;

const CardExterior: React.FC<{ slug: string } & ChildrenProp> = ({
	slug,
	children,
}) => {
	return (
		<li>
			<Link to={slug}>
				<StyledCardExterior>
					<ExternalArrow data-arrow />
					{children}
				</StyledCardExterior>
			</Link>
		</li>
	);
};

export default CardExterior;
