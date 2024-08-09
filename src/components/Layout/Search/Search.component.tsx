import React from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { SearchProps, SearchResultItems } from "./types";
import { search } from "./search";
import { useDebounce } from "@/hooks";
import { autocomplete } from "@/data/search";
import { getRandomSuggestions } from "@/utils/search";
import { Z_SEARCH, SIZE_MD } from "@/styles/variables";
import { media } from "@/styles/queries";

const SearchModal = styled.dialog`
    position: fixed;
    top: 30%;
    left: 50%;
    z-index: ${Z_SEARCH};

    border-radius: ${SIZE_MD};
    width: 50%;

	transform: translateX(-50%);
    
    &::backdrop {
		height: 200vh;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
    }

	${media.desktop} {
		width: 70%;
	}

	${media.tablet} {
		width: 80%;
	}

	${media.phone} {
		width: 90%;
`;

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const [showResultCount, setShowResultCount] = React.useState(false);
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
				setShowResultCount(false);
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
			setShowResultCount(true);
		};

		const numResults = results
			? results.books.length +
				results.stories.length +
				results.posts.length +
				results.projects.length +
				results.pages.length
			: 0;

		return (
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar
					showResultCount={showResultCount}
					numResults={numResults}
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
