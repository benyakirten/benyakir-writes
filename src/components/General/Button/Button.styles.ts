import styled from 'styled-components'

import {
    FONT_MD,
    GRAY_100,
    SECONDARY_900,
    BLACK,
    WHITE,
    Z_ABOVE
} from '@StyleVars'

export const ButtonExterior = styled.button`
    cursor: pointer;

    position: relative;
    
    padding: 1rem;
    
    border: 2px solid ${BLACK};
    background-color: ${GRAY_100};

    overflow: hidden;

    &:not(:last-child) {
        margin-right: 1rem;
    }

    span {
        color: ${SECONDARY_900};
        transition: color 1s ease;


        position: relative;
        font-size: ${FONT_MD};
        z-index: ${Z_ABOVE};
    }

    div {
        position: absolute;

        height: 200%;
        width: 200%;

        background-color: ${BLACK};

        transition: transform 1s ease;
        transform: scale(0);
    }

    &:hover {
        span {
            color: ${WHITE};
        }

        div {
            transform: scale(1);
        }
    }
`
// background-color: ${WHITE};
// color: ${BLACK}