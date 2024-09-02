import React from "react";
import styled from "styled-components";

import { GrowableUnderline } from "@/components/General";
import { SearchIcon } from "@/components/Icons";
import { FONT_SIZE_MD, SIZE_SM } from "@/styles/variables";

const SearchButton = styled.button`
	display: flex;
	gap: ${SIZE_SM};
	align-items: center;
	
	width: min-content;
	color: ${(props) => props.theme.sidebar.link};
`;

const IconContainer = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	display: grid;
	place-items: center;
`;

const TextContainer = styled.span`
	font-size: ${FONT_SIZE_MD};
`;

// TODO: Update this button's styles
const OpenSearchButton: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
	return (
		<GrowableUnderline>
			<SearchButton type="button" onClick={onSearch}>
				<IconContainer>
					<SearchIcon />
				</IconContainer>
				<TextContainer>Search</TextContainer>
			</SearchButton>
		</GrowableUnderline>
	);
};

export default OpenSearchButton;
