import React from "react";

import { SearchResultsContainer } from "./Search.styles";
import { SearchResultsProps } from "./types";

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
	if (results === null) {
		return null;
	}

	console.log(results);

	// TODO
	return (
		<SearchResultsContainer>
			<li>AN ITEM</li>
		</SearchResultsContainer>
	);
};

export default SearchResults;
