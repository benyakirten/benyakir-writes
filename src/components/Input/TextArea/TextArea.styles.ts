import styled from 'styled-components'

import { ABS_BLACK, FONT_LG, FONT_XXS, GRAY_400, MULISH } from '@StyleVars'

export const TextAreaContainer = styled.div`
    position: relative;

    textarea {
        resize: none;

        width: 100%;
        height: 100%;

        padding: 1.2rem 0.5rem;

        font-size: ${FONT_LG};
        font-family: ${MULISH};
        color: ${ABS_BLACK};
        outline: 2px solid ${GRAY_400};

        &:hover + label,
        &:focus + label,
        &:not(:placeholder-shown) + label {
            top: 0.5rem;
            font-size: ${FONT_XXS};
        }
    }

    label {
        position: absolute;
        top: 1.2rem;
        left: 0.75rem;

        cursor: text;

        color: ${ABS_BLACK};
        font-size: ${FONT_LG};

        transition: all 1s ease;
    }
`