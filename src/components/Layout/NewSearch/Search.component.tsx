import React from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { SearchProps, SearchResultItems } from "./types";
import { search } from "./search";
import { useDebounce } from "@/hooks";
import { autocomplete } from "@/data/search";
import { getRandomSuggestions } from "@/utils/search";
import { Z_SEARCH, SIZE_MD, TRANSITION_SLOW } from "@/styles/variables";

const SearchModal = styled.dialog`
    display: none;
    
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: ${Z_SEARCH};

    transform: translate(-50%, -40%);
    border-radius: ${SIZE_MD};
    width: 70%;
	max-height: 40vh;
	overflow: auto;

    &[open] {
        display: block;
    }
    
    &::backdrop {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0px);
        transition: all ${TRANSITION_SLOW} ease;
    }
    
    &[open]::backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
    }
`;

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		const [results, setResults] = React.useState<SearchResultItems | null>(
			null,
		);

		const onSearch = React.useCallback((query: string) => {
			const results = search(query);
			setResults(results);
		}, []);

		const [suggestions, setSuggestions] = React.useState<string[]>([]);
		const [searchAutocomplete, setSearchAutocomplete] = React.useState<
			string[]
		>([]);
		const [query, _setQuery] = useDebounce(onSearch);

		const setQuery = (query: string) => {
			_setQuery(query);
			if (query === "") {
				setSuggestions([]);
				setSearchAutocomplete([]);
				return;
			}

			const suggestions = autocomplete.suggest(query);
			if (suggestions === null || suggestions.length === 0) {
				setSearchAutocomplete([]);

				const randomSuggestions = getRandomSuggestions(autocomplete);
				setSuggestions(randomSuggestions);

				return;
			}
			const allSuggestions = suggestions.map((s) => s.word);

			setSearchAutocomplete(allSuggestions);
			setSuggestions(allSuggestions);
		};

		return (
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar
					suggestions={searchAutocomplete}
					search={query}
					setSearch={setQuery}
					onClose={onClose}
				/>
				<SearchResults
					results={results}
					onClose={onClose}
					onSetQuery={setQuery}
					alternatives={suggestions}
				/>
			</SearchModal>
		);
	},
);

export default Search;
