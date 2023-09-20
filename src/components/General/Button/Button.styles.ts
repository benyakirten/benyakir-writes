import styled from 'styled-components'

import { media } from '@/styles/queries'
import {
  FONT_MD,
  TRANSITION_EXTRA_SLOW,
  TRANSITION_NORMAL,
  TRANSITION_SLOW,
  Z_ABOVE,
} from '@StyleVars'

export const ButtonExterior = styled.button`
  cursor: pointer;

  position: relative;

  padding: 1rem;

  ${media.tablet} {
    padding: 0.5rem;
  }

  min-width: 7rem;

  border: 2px solid ${(props) => props.theme.button.border};
  background-color: ${(props) => props.theme.button.default.background};

  overflow: hidden;

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.button.disabled.background};

    span {
      color: ${(props) => props.theme.button.disabled.textColor};
    }

    &:hover {
      span {
        color: ${(props) => props.theme.button.disabled.textColor};
      }
      div {
        transform: scale(0) !important;
      }
    }
  }

  span {
    color: ${(props) => props.theme.button.default.textColor};
    transition: color ${TRANSITION_SLOW} ease;

    position: relative;
    font-size: ${FONT_MD};
    z-index: ${Z_ABOVE};
  }

  div {
    position: absolute;

    height: 200%;
    width: 200%;

    background-color: ${(props) => props.theme.button.hover.background};

    transition: transform ${TRANSITION_SLOW} ease;
    transform: scale(0);
  }

  &:hover {
    span {
      color: ${(props) => props.theme.button.hover.textColor};
    }

    div {
      transform: scale(1);
    }
  }
`
