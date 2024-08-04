import styled, { createGlobalStyle } from "styled-components";

import { SANS_SERIF_FONT, TRANSITION_NORMAL } from "@StyleVars";
import { media } from "@Styles/queries";

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

  body {
    box-sizing: border-box;
    font-family: ${SANS_SERIF_FONT};
    color: ${(props) =>
			// @ts-ignore
			props.theme.base.textColor};
    background-color: ${(props) =>
			// @ts-ignore
			props.theme.base.background};
  }

  button {
      all: unset;
      cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
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
`;

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  position: relative;
  width: 100%;
  margin-left: 4rem;
  background-color: ${(props) => props.theme.base.background};
  overflow: hidden;
`;
