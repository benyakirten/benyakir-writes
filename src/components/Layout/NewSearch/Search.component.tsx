import React from "react";

import { SearchModal } from "./Search.styles";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { pageSearch, SearchProps, SearchResultItems } from "./types";

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		const [results, setResults] = React.useState<SearchResultItems | null>(
			null,
		);

		const onSearch = React.useCallback((query: string) => {
			if (!query) {
				setResults(null);
				return;
			}

			// TODO: Search logic
		}, []);
		return (
			// @ts-ignore
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar onSearch={onSearch} onClose={onClose} />
				<SearchResults results={results} onClose={onClose} />
			</SearchModal>
		);
	},
);

export default Search;
