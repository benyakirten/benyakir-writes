import React from "react";
import styled from "styled-components";

import { autocomplete } from "@/data/search";
import { useDebounce } from "@/hooks";
import { media } from "@/styles/queries";
import {
	MODAL_BACKGROUND_COLOR,
	MODAL_TEXT_COLOR,
	SIZE_MD,
	Z_SEARCH,
} from "@/styles/variables";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { search } from "./search";
import { SearchProps, SearchResultItems } from "./types";

const SearchModal = styled.dialog`
    position: fixed;
    top: 20%;
    left: 50%;
    z-index: ${Z_SEARCH};

    border-radius: ${SIZE_MD};
    width: 50%;

	background-color: ${MODAL_BACKGROUND_COLOR};
	color: ${MODAL_TEXT_COLOR};

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
			string | undefined
		>();
		const [query, _setQuery] = useDebounce(onSearch);

		const setQuery = (query: string) => {
			_setQuery(query);
			if (query === "") {
				setShowResultCount(false);
				setSuggestions([]);
				setSearchAutocomplete(undefined);
				return;
			}

			const suggestions = autocomplete.suggest(query);
			if (suggestions === null || suggestions.length === 0) {
				setSearchAutocomplete(undefined);

				const randomSuggestions = autocomplete.getRandomSuggestions();
				setSuggestions(randomSuggestions);

				return;
			}
			const allSuggestions = suggestions.map((s) => s.word);

			setSearchAutocomplete(allSuggestions.at(0));
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
					suggestion={searchAutocomplete}
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
