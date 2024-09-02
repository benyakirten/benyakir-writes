import React from "react";
import styled from "styled-components";

import { GrowableUnderline } from "@/components/General";
import {
	FONT_SIZE_LG,
	FONT_SIZE_MD,
	MODAL_LINK_COLOR,
	SIZE_SM,
} from "@/styles/variables";

const EmptyContainer = styled.div`
    padding: ${SIZE_SM};
	font-size: ${FONT_SIZE_MD};
	line-height: ${FONT_SIZE_LG};
`;

const PossibleSearch = styled.button`
	color: ${MODAL_LINK_COLOR};
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
						<GrowableUnderline underlineColor={MODAL_LINK_COLOR}>
							<PossibleSearch
								type="button"
								onClick={() => onSelect(alternative)}
							>
								{alternative}
							</PossibleSearch>
						</GrowableUnderline>
						<span>{i < alternatives.length - 1 ? ",  " : ""}</span>
					</span>
				))}
			</p>
		</EmptyContainer>
	);
};

export default EmptyResults;
