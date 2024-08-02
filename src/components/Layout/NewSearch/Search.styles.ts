import styled from "styled-components";

import {
	FONT_LG,
	HORIZONTAL_XS,
	SIZE_MD,
	SIZE_SM,
	SIZE_XXL,
	Z_SEARCH,
} from "@/styles/variables";

export const SearchModal = styled.dialog`
    display: none;

    &[open] {
        position: fixed;
        top: 40%;
        left: 50%;
        z-index: ${Z_SEARCH};
    
        transform: translate(-50%, -50%);
        
        display: flex;
        width: 50%;
        height: ${SIZE_XXL};
        gap: ${SIZE_SM};
        border-radius: ${SIZE_MD};
        padding: 0 ${SIZE_SM} 0 ${SIZE_SM};
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

export const SearchInput = styled.input`
    border: 0;
    outline: none;
    font-size: ${FONT_LG};
    flex: 1;
`;
