import styled from 'styled-components'

import {
    FONT_MD,
    Z_ABOVE
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
    
    border: 2px solid ${props => props.theme.button.border};
    background-color: ${props => props.theme.button.default.background};

    overflow: hidden;

    &:disabled {
        cursor: not-allowed;
        background-color: ${props => props.theme.button.disabled.background};

        span {
            color: ${props => props.theme.button.disabled.textColor};
        }

        &:hover {
            span {
                color: ${props => props.theme.button.disabled.textColor};
            }
            div {
                transform: scale(0) !important;
            }
        }
    }

    span {
        color: ${props => props.theme.button.default.textColor};
        transition: color 400ms ease;


        position: relative;
        font-size: ${FONT_MD};
        z-index: ${Z_ABOVE};
    }

    div {
        position: absolute;

        height: 200%;
        width: 200%;

        background-color: ${props => props.theme.button.hover.background};

        transition: transform 400ms ease;
        transform: scale(0);
    }

    &:hover {
        span {
            color: ${props => props.theme.button.hover.textColor};
        }

        div {
            transform: scale(1);
        }
    }
`