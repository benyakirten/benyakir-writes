import styled from "styled-components";

import {
	FONT_SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_SLOW,
	Z_ABOVE,
} from "@/styles/variables";

export const ButtonExterior = styled.button`
  cursor: pointer;

  position: relative;

  padding: ${SIZE_SM} ${SIZE_XS};
  width: fit-content;

  border-radius: ${SIZE_XS};
  border: 2px solid ${(props) => props.theme.button.border};
  background-color: ${(props) => props.theme.button.default.background};

  overflow: hidden;

  &:disabled {
    cursor: default;
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
    font-size: ${FONT_SIZE_MD};
    z-index: ${Z_ABOVE};
  }

  div[data-fill-in] {
    position: absolute;

    height: 200%;
    width: 200%;

    background-color: ${(props) => props.theme.button.hover.background};

    transition: transform ${TRANSITION_SLOW} ease;
    transform: scale(0);
  }

  &:hover, &:focus {
    span {
      color: ${(props) => props.theme.button.hover.textColor};
    }

    div {
      transform: scale(1);
    }
  }
`;
