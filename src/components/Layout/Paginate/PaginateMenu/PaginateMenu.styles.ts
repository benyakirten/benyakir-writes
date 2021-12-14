import styled from 'styled-components'

import { FONT_LG, FONT_XL, Z_ABOVE } from '@StyleVars'

export const PageFlip = styled.button<{ left?: boolean }>`
    cursor: pointer;

    font-size: ${FONT_XL};
    background-color: transparent;
    color: ${props => props.theme.paginate.arrowColor};

    outline: none;
    border: none;

    transform: rotate(${props => props.left ? '180' : '0'}deg);

    &:disabled {
        opacity: 0.6;
        color: ${props => props.theme.base.disabled};
        cursor: not-allowed;
    }
`

export const PageNumber = styled.span`
    position: relative;
    z-index: ${Z_ABOVE};
    
    margin: 0 1rem;
    font-size: ${FONT_LG};
    color: ${props => props.theme.paginate.pageNumberColor};
`