import React from "react";

import data from "@Data/searchData.json";
import { SearchModal } from "./Search.styles";
import SearchBar from "./SearchBar.component";
import SearchResults from "./SearchResults.component";
import { pageSearch, SearchProps, SearchResult } from "./types";

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		const [results, setResults] = React.useState<SearchResult[]>([]);

		const onSearch = React.useCallback((query: string) => {
			if (!query) {
				setResults([]);
				return;
			}

			const search = query.toLowerCase().split(" ");
			const dataResults = data.filter(
				// @ts-ignore
				(datum) => search.some((word) => datum.meta[word]),
			);

			const pageResults = pageSearch.filter((page) =>
				search.some(
					(word) =>
						page.title.toLowerCase().includes(word) ||
						page.description.toLowerCase().includes(word),
				),
			);

			// @ts-ignore
			const allResult: SearchResult[] = dataResults.concat(pageResults);
			setResults(allResult);
		}, []);
		return (
			// @ts-ignore
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchBar onSearch={onSearch} onClose={onClose} />
				<SearchResults results={results} />
			</SearchModal>
		);
	},
);

export default Search;
