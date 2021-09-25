import styled, { createGlobalStyle } from 'styled-components';

import { MULISH } from '@StyleVars';
import { media } from '@Styles/queries';

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    ${media.reducedMotion} {
        * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important; 
            transition-duration: 0.001ms !important;
        }
    }

    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        font-family: ${MULISH};
    }

    a {
        text-decoration: none;
    }

    .nav-toggle-open {
        cursor: w-resize;
    }

    .nav-toggle-close {
        cursor: e-resize;
    }

    .filterable-card-enter {
        opacity: 0;
        transform: scale(0);
    }
    .filterable-card-enter-active {
        opacity: 1;
        transform: scale(1);
        transform-origin: left;
        transition: all 800ms;
    }
    .filterable-card-exit {
        opacity: 1;
        transform: scale(1);
    }
    .filterable-card-exit-active {
        opacity: 0;
        transform: scale(0);
        transform-origin: left;
        transition: all 800ms;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }
`

export const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
`

export const MainContainer = styled.main`
    position: relative;
    width: 100%;
    padding: 2rem 4rem;
    overflow: hidden;
`;