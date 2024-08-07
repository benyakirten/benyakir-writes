import React from "react";

import { SearchModal } from "./Search.styles";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { SearchProps, SearchResultItems } from "./types";
import { search } from "./search";

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
		return (
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar onSearch={onSearch} onClose={onClose} />
				<SearchResults results={results} onClose={onClose} />
			</SearchModal>
		);
	},
);

export default Search;
