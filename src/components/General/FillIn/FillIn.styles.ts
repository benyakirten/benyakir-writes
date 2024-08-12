import styled from "styled-components";

import { TRANSITION_SLOW, Z_ABOVE } from "@StyleVars";

export const FillInExterior = styled.div<{
	borderRadiusCorners: BorderRadiusCorners;
}>`
  position: relative;
  background-color: ${(props) => props.theme.button.default.background};
  height: 100%;
  overflow: hidden;
  border-top-right-radius: ${(props) => props.borderRadiusCorners.topRight};
  border-bottom-right-radius: ${(props) => props.borderRadiusCorners.bottomRight};
  border-bottom-left-radius: ${(props) => props.borderRadiusCorners.bottomLeft};
  border-top-left-radius: ${(props) => props.borderRadiusCorners.topLeft};


  span {
    color: ${(props) => props.theme.button.default.textColor};
    transition: color ${TRANSITION_SLOW} ease;

    position: relative;
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

  &:hover, &:focus, &[data-force-fill-in='true'] {
    span {
      color: ${(props) => props.theme.button.hover.textColor};
    }

    div[data-fill-in] {
      transform: scale(1);
    }
  }
`;