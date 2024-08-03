import React from "react";

import { SearchIcon, CloseIcon } from "@/components/Icons";
import {
	CloseButton,
	SearchIconContainer,
	SearchInput,
	StyledSearchBar,
} from "./Search.styles";
import { SearchBarProps } from "./types";
import { useDebounce } from "@/hooks";

const SearchBar: React.FC<SearchBarProps> = ({ onClose, onSearch }) => {
	const [search, setSearch] = useDebounce(onSearch);
	return (
		<StyledSearchBar>
			<SearchIconContainer>
				<SearchIcon />
			</SearchIconContainer>
			<SearchInput
				autoFocus
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
			/>
			<CloseButton aria-label="Close Modal" type="button" onClick={onClose}>
				<CloseIcon />
			</CloseButton>
		</StyledSearchBar>
	);
};

export default SearchBar;
