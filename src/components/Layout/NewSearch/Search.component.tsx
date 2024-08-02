import React from "react";

import {
	CloseButton,
	SearchIconContainer,
	SearchInput,
	SearchModal,
} from "./Search.styles";
import { CloseIcon, SearchIcon } from "@/components/Icons";

const Search = React.forwardRef<HTMLDialogElement, SearchProps>(
	({ onClose }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};
		return (
			// @ts-ignore
			<SearchModal ref={ref} onClick={handleClick}>
				<SearchIconContainer>
					<SearchIcon />
				</SearchIconContainer>
				<SearchInput placeholder="Search" />
				<CloseButton aria-label="Close Modal" type="button" onClick={onClose}>
					<CloseIcon />
				</CloseButton>
			</SearchModal>
		);
	},
);

export default Search;
