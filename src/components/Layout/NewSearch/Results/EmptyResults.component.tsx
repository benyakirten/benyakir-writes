import React from "react";
import styled from "styled-components";

import { SIZE_SM } from "@/styles/variables";

const EmptyContainer = styled.div`
    padding: ${SIZE_SM};
`;

const PossibleSearch = styled.button`
`;

const EmptyResults: React.FC<{
	alternatives: string[];
	onSelect: (q: string) => void;
}> = ({ alternatives, onSelect }) => {
	return (
		<EmptyContainer>
			<p>No results found. Maybe you were looking for one of these?</p>
			<p>
				{alternatives.map((alternative, i) => (
					<PossibleSearch
						key={alternative}
						onClick={() => onSelect(alternative)}
					>
						{alternative}
						{i < alternatives.length - 1 ? ", " : ""}
					</PossibleSearch>
				))}
			</p>
		</EmptyContainer>
	);
};

export default EmptyResults;
