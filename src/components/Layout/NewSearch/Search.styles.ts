import styled from "styled-components";

import {
	FONT_LG,
	SIZE_MD,
	SIZE_SM,
	SIZE_XXL,
	Z_SEARCH,
} from "@/styles/variables";

export const SearchModal = styled.dialog`
    display: none;
    
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: ${Z_SEARCH};

    transform: translate(-50%, -50%);
    border-radius: ${SIZE_MD};
    width: 70%;
    
    &[open] {
        display: block;
    }
    
    &::backdrop {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0px);
        transition: all 300ms ease;
    }
    
    &[open]::backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
    }
`;

export const StyledSearchBar = styled.div`
    display: flex;
    height: ${SIZE_XXL};
    gap: ${SIZE_SM};

    padding: 0 ${SIZE_SM} 0 ${SIZE_SM};
`;

export const SearchInput = styled.input`
    border: 0;
    outline: none;
    font-size: ${FONT_LG};
    flex: 1;
`;

export const SearchIconContainer = styled.div`
    display: grid;
    place-items: center;
    width: ${SIZE_MD};
`;

export const CloseButton = styled.button`
    width: ${SIZE_MD};
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
`;

export const SearchResultsContainer = styled.ul`
    width: 100%;
    padding: ${SIZE_SM};
    display: grid;
    gap: ${SIZE_SM};
`;
