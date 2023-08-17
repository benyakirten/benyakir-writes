import styled, { createGlobalStyle } from 'styled-components'

import { media } from '@Styles/queries'
import { MULISH, TRANSITION_NORMAL } from '@StyleVars'

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
    
    ${media.phone} {
      font-size: 45%;
    }
  }


  body {
    box-sizing: border-box;
    font-family: ${MULISH};
    color: ${(props) => props.theme.base.textColor};
    background-color: ${(props) => props.theme.base.background};
  }

  a {
    text-decoration: none;
  }

  .filterable-card-enter {
    opacity: 0;
    transform: scale(0);
  }
  .filterable-card-enter-active {
    opacity: 1;
    transform: scale(1);
    transform-origin: left;
    transition: all ${TRANSITION_NORMAL};
  }
  .filterable-card-exit {
    opacity: 1;
    transform: scale(1);
  }
  .filterable-card-exit-active {
    opacity: 0;
    transform: scale(0);
    transform-origin: left;
    transition: all ${TRANSITION_NORMAL};
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-90deg);
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
  background-color: ${(props) => props.theme.base.background};
  overflow: hidden;
`
