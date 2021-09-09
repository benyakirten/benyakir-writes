import styled from "styled-components"

import { ABS_BLACK, BLACK, FONT_LG, FONT_XXS, GRAY_400 } from "@StyleVars"
import { media } from "@Styles/queries"

export const TextInputContainer = styled.div`
    position: relative;
    
    label {
        position: absolute;
        top: 1.2rem;
        left: 0.75rem;

        cursor: text;
        
        color: ${ABS_BLACK};
        font-size: ${FONT_LG};

        transition: all 1s ease;
    }

    input {
        padding: 1.2rem 0.5rem;
        outline: 2px solid ${GRAY_400};

        font-size: ${FONT_LG};
        color: ${ABS_BLACK};

        ${media.phone} {
            min-width: 10rem;
        }

        &:hover + label,
        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: 0.5rem;
            font-size: ${FONT_XXS};
        }
    }
`