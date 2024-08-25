import React from "react";
import styled from "styled-components";

import { FONT_SIZE_LG, FONT_SIZE_MD, SIZE_SM } from "@/styles/variables";
import { GrowableUnderline } from "@/components/General";

const EmptyContainer = styled.div`
    padding: ${SIZE_SM};
	font-size: ${FONT_SIZE_MD};
	line-height: ${FONT_SIZE_LG};
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
					<span key={alternative}>
						<GrowableUnderline>
							<button type="button" onClick={() => onSelect(alternative)}>
								{alternative}
							</button>
						</GrowableUnderline>
						<span>{i < alternatives.length - 1 ? ",  " : ""}</span>
					</span>
				))}
			</p>
		</EmptyContainer>
	);
};

export default EmptyResults;
