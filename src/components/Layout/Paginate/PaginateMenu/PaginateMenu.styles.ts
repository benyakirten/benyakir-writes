import styled from 'styled-components'

import { FONT_LG, FONT_XL, GRAY_700, SECONDARY_800, SECONDARY_900, Z_ABOVE } from '@StyleVars'

export const PageFlip = styled.button<{ left?: boolean }>`
    cursor: pointer;

    font-size: ${FONT_XL};
    background-color: transparent;
    color: ${SECONDARY_900};

    outline: none;
    border: none;

    transform: rotate(${props => props.left ? '180' : '0'}deg);

    &:disabled {
        opacity: 0.6;
        color: ${GRAY_700};
        cursor: not-allowed;
    }
`

export const PageNumber = styled.span`
    position: relative;
    z-index: ${Z_ABOVE};
    
    margin: 0 1rem;
    font-size: ${FONT_LG};
    color: ${SECONDARY_800};
`