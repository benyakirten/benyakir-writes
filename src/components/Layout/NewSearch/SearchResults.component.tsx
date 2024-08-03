import React from "react";

import { SearchResultsContainer } from "./Search.styles";
import { SearchResultsProps } from "./types";

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
	if (results.length === 0) {
		return null;
	}

	// TODO
	return (
		<SearchResultsContainer>
			<li>AN ITEM</li>
		</SearchResultsContainer>
	);
};

export default SearchResults;
