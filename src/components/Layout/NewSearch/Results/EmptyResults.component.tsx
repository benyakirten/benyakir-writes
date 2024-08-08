import React from "react";
import styled from "styled-components";

import { FONT_SM, SIZE_SM, SIZE_XS } from "@/styles/variables";

const EmptyContainer = styled.div`
    padding: ${SIZE_SM};
	font-size: ${FONT_SM};
`;

const PossibleSearch = styled.button`
	display: inline;
	color: ${(props) => props.theme.link.dark};


	&:not(:last-child) {
		margin-right: ${SIZE_XS};
	}
`;

const EmptyResults: React.FC<{
	alternatives: string[];
	onSelect: (q: string) => void;
}> = ({ alternatives, onSelect }) => {
	return (
		<EmptyContainer>
			<p>
				No results found. Were you looking for one of these?{" "}
				{alternatives.map((alternative, i) => (
					<PossibleSearch
						key={alternative}
						onClick={() => onSelect(alternative)}
					>
						{alternative}
						{i < alternatives.length - 1 ? ",  " : " "}
					</PossibleSearch>
				))}
			</p>
		</EmptyContainer>
	);
};

export default EmptyResults;
