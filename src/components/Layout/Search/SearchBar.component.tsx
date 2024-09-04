import React from "react";
import styled from "styled-components";

import { CloseIcon, SearchIcon } from "@/components/Icons";
import { media } from "@/styles/queries";
import {
	FONT_SIZE_LG,
	FONT_SIZE_XS,
	MODAL_BACKGROUND_COLOR,
	MODAL_TEXT_COLOR,
	SANS_SERIF_FONT,
	SIZE_MD,
	SIZE_SM,
	SIZE_XXL,
} from "@/styles/variables";
import { SearchBarProps } from "./types";

const StyledSearchBar = styled.div`
    display: flex;
    height: ${SIZE_XXL};
    gap: ${SIZE_SM};

    padding: 0 ${SIZE_SM};
`;

const SearchCount = styled.span`
	align-self: center;
	width: 10ch;

	font-size: ${FONT_SIZE_XS};
	color: ${MODAL_TEXT_COLOR};
	text-transform: uppercase;
	
	opacity: 0.8;
	
	${media.phone} {
		display: none;
	}
`;

const SearchIconContainer = styled.label`
    display: grid;
    place-items: center;
    width: ${SIZE_MD};
`;

const IconButton = styled.button`
    width: ${SIZE_MD};
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
`;

const StyledSearchContainer = styled.div`
	flex-grow: 1;
	width: 50%;

	position: relative;
`;

const StyledSearchInput = styled.input`
	height: 100%;
	width: 100%;

    border: 0;
    outline: none;
	font-size: ${FONT_SIZE_LG};
	font-family: ${SANS_SERIF_FONT};

	background-color: ${MODAL_BACKGROUND_COLOR};
	color: ${MODAL_TEXT_COLOR};
`;

const HiddenInputContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	
	display: block;
	visibility: hidden;
	
	border: 0;
    outline: none;

	font-size: ${FONT_SIZE_LG};
	font-family: ${SANS_SERIF_FONT};

	&::after {
		content: attr(data-suggestion);

		position: absolute;
		visibility: visible;
		left: 100%;
		opacity: 0.6;
	}
`;

const SearchInput: React.FC<{
	search: string;
	setSearch: (val: string) => void;
	suggestion?: string;
}> = ({ search, setSearch, suggestion }) => {
	const suggestionRemainder = suggestion
		? suggestion.slice(search.length)
		: null;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape" && search) {
			setSearch("");
			e.stopPropagation();
			e.preventDefault();
			return;
		}

		if ((e.key === "Tab" || e.key === "Enter") && suggestionRemainder) {
			setSearch(suggestion as string);
			e.preventDefault();
			return;
		}
	};
	return (
		<StyledSearchContainer>
			<StyledSearchInput
				autoFocus
				value={search}
				onKeyDown={handleKeyDown}
				onChange={(e) => setSearch(e.currentTarget.value)}
				placeholder="Search"
				id="global-search-input"
				aria-autocomplete="inline"
				aria-describedby="search-autosuggest"
				aria-live="polite"
				type="search"
			/>
			{suggestion && (
				<span id="search-autosuggest" className="sr-only" aria-live="assertive">
					Press Tab or Enter to accept the suggestion: {suggestion}
				</span>
			)}
			<HiddenInputContainer data-suggestion={suggestionRemainder}>
				{search}
			</HiddenInputContainer>
		</StyledSearchContainer>
	);
};

const SearchBar: React.FC<SearchBarProps> = ({
	showResultCount,
	numResults,
	suggestion,
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
				search={search}
				setSearch={setSearch}
				suggestion={suggestion}
			/>
			{showResultCount && search !== "" && (
				<SearchCount>
					{numResults} result
					{numResults === 1 ? "" : "s"}
				</SearchCount>
			)}
			<IconButton aria-label="Close Modal" type="button" onClick={onClose}>
				<CloseIcon />
			</IconButton>
		</StyledSearchBar>
	);
};

export default SearchBar;
