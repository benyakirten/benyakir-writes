import React from "react";
import styled from "styled-components";

import { SearchIcon, CloseIcon } from "@/components/Icons";
import { SearchBarProps } from "./types";
import {
	SIZE_XXL,
	SIZE_SM,
	FONT_LG,
	SIZE_MD,
	FONT_XS,
	FONT_XXS,
} from "@/styles/variables";
import { media } from "@/styles/queries";

const StyledSearchBar = styled.div`
    display: flex;
    height: ${SIZE_XXL};
    gap: ${SIZE_SM};

    padding: 0 ${SIZE_SM} 0 ${SIZE_SM};
`;

const SearchInput = styled.input`
    border: 0;
    outline: none;
	width: 50%;
	font-size: ${FONT_LG};
	flex-grow: 1;
`;

const SearchCount = styled.span`
	font-size: ${FONT_XS};
	text-transform: uppercase;
	opacity: 0.8;
	align-self: center;
	width: max-content;
	${media.phone} {
		display: none;
	}
`;

const SearchIconContainer = styled.label`
    display: grid;
    place-items: center;
    width: ${SIZE_MD};
`;

const CloseButton = styled.button`
    width: ${SIZE_MD};
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
`;

const SearchSuggestions: React.FC<{ suggestions: string[]; id: string }> = ({
	id,
	suggestions,
}) => (
	<datalist id={id}>
		{suggestions.map((suggestion) => (
			<option key={suggestion} value={suggestion} />
		))}
	</datalist>
);

const SearchBar: React.FC<SearchBarProps> = ({
	showResultCount,
	numResults,
	suggestions,
	search,
	onClose,
	setSearch,
}) => {
	return (
		<StyledSearchBar>
			<SearchIconContainer htmlFor="global-search-input">
				<SearchIcon />
			</SearchIconContainer>
			<SearchInput
				autoFocus
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
				id="global-search-input"
				aria-label="Search"
				list="search-suggestions"
			/>
			{showResultCount && search !== "" && (
				<SearchCount>
					{numResults} result
					{numResults === 1 ? "" : "s"}
				</SearchCount>
			)}
			<SearchSuggestions suggestions={suggestions} id="search-suggestions" />
			<CloseButton aria-label="Close Modal" type="button" onClick={onClose}>
				<CloseIcon />
			</CloseButton>
		</StyledSearchBar>
	);
};

export default SearchBar;
