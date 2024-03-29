import styled, { css } from 'styled-components'

import { FONT_XS, TRANSITION_EXTRA_SLOW, Z_ABOVE } from '@StyleVars'

export const IconContainer = styled.div<{ height: string }>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: ${(props) => css`calc(${props.height} * 5 / 3)`};

  margin-bottom: ${(props) => css`calc(${props.height} / 6)`};
  margin-right: ${(props) => css`calc(${props.height} / 3)`};

  background-color: ${(props) => props.theme.icon.default.background};

  transition: all ${TRANSITION_EXTRA_SLOW} ease;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transform-origin: center;

    height: 0;
    width: 0;

    border-radius: 50%;
    background-color: ${(props) => props.theme.icon.hover.background};

    transition: all ${TRANSITION_EXTRA_SLOW} ease;
  }

  &:hover {
    div {
      z-index: ${Z_ABOVE};
      height: ${(props) => css`calc(${props.height} * 10 / 3)`};
      width: ${(props) => css`calc(${props.height} * 10 / 3)`};
    }

    img {
      transform: scale(2);
      z-index: ${Z_ABOVE};
    }

    span {
      color: ${(props) => props.theme.icon.hover.textColor};
      z-index: ${Z_ABOVE};
      top: ${(props) => css`calc(${props.height} * 2 / 3)`};
    }
  }
`

export const IconImage = styled.img<{ height: string }>`
  position: relative;

  height: ${(props) => props.height};
  width: ${(props) => props.height};

  transition: transform ${TRANSITION_EXTRA_SLOW} ease;
`

export const IconCaption = styled.span`
  position: relative;
  top: 0.5rem;

  color: ${(props) => props.theme.icon.default.textColor};
  font-size: ${FONT_XS};

  transition: all ${TRANSITION_EXTRA_SLOW} ease;
`
