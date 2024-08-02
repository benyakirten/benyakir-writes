import React from "react";

import { SearchInput, SearchModal } from "./Search.styles";
import { SearchIcon } from "@/components/Icons";

const Search = React.forwardRef<HTMLDialogElement, unknown>((_, ref) => {
	return (
		// @ts-ignore
		<SearchModal ref={ref}>
			<SearchIcon />
			<SearchInput placeholder="Search" />
		</SearchModal>
	);
});

export default Search;
