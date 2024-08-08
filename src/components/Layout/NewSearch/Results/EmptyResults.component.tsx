import React from "react";
import styled from "styled-components";

import { FONT_MD, FONT_SM, SIZE_SM, SIZE_XS } from "@/styles/variables";

const EmptyContainer = styled.div`
    padding: ${SIZE_SM};
	font-size: ${FONT_SM};
	line-height: ${FONT_MD};
`;

const PossibleSearchItem = styled.div`
	display: inline;
`;

const PossibleSearch = styled.button`
	color: ${(props) => props.theme.link.dark};

	background-color: transparent;
	background-image: linear-gradient(${(props) => props.theme.link.dark}, ${(props) => props.theme.link.dark});
	background-repeat: no-repeat;
	background-size: 0px 2px;
	background-position: 0 100%;
	text-decoration: none;

	transition: background-size 0.3s;

	&:hover, &:focus {
		background-size: 100% 2px;
	}
`;

const EmptyResults: React.FC<{
	alternatives: string[];
	onSelect: (q: string) => void;
}> = ({ alternatives, onSelect }) => {
	return (
		<EmptyContainer>
			<p>
				No results found. Did you mean:{" "}
				{alternatives.map((alternative, i) => (
					<PossibleSearchItem key={alternative}>
						<PossibleSearch onClick={() => onSelect(alternative)}>
							{alternative}
						</PossibleSearch>
						<span>{i < alternatives.length - 1 ? ",  " : " "}</span>
					</PossibleSearchItem>
				))}
			</p>
		</EmptyContainer>
	);
};

export default EmptyResults;
