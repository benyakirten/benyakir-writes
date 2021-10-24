import styled from 'styled-components'

import {
    FONT_MD,
    GRAY_100,
    SECONDARY_900,
    BLACK,
    WHITE,
    Z_ABOVE,
    GRAY_800
} from '@StyleVars'
import { media } from '@/styles/queries'

export const ButtonExterior = styled.button`
    cursor: pointer;

    position: relative;
    
    padding: 1rem;

    ${media.tablet} {
        padding: 0.5rem;
    }

    min-width: 7rem;
    
    border: 2px solid ${BLACK};
    background-color: ${GRAY_100};

    overflow: hidden;

    &:not(:last-child) {
        margin-right: 1rem;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${GRAY_800};

        span {
            color: ${WHITE};
        }

        &:hover {
            div {
                transform: scale(0) !important;
            }
        }
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