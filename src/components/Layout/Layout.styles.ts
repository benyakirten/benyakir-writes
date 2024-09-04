import styled, { createGlobalStyle } from "styled-components";

import { media } from "@/styles/queries";
import {
	SANS_SERIF_FONT,
	SERIF_FONT,
	TRANSITION_NORMAL,
} from "@/styles/variables";

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
    font-family: ${SERIF_FONT};
    color: ${(props) =>
			// @ts-ignore
			props.theme.base.textColor};
    background-color: ${(props) =>
			// @ts-ignore
			props.theme.base.background};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${SANS_SERIF_FONT};
  }

  button {
      all: unset;
      cursor: pointer;

      &:disabled {
          cursor: default;
      }
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
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
  margin-left: 3rem;
  background-color: ${(props) => props.theme.base.background};
  overflow: hidden;
`;
