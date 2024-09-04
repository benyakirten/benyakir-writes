import styled from "styled-components";

import { TRANSITION_SLOW, Z_ABOVE } from "@/styles/variables";
import { BorderRadiusCorners } from "@/types/filters";

export const FillInExterior = styled.div<{
	$borderRadiusCorners: BorderRadiusCorners;
}>`
  position: relative;
  
  height: 100%;
  
  overflow: hidden;
  
  background-color: ${(props) => props.theme.fillIn.default.background};

  border-top-right-radius: ${(props) => props.$borderRadiusCorners.topRight};
  border-bottom-right-radius: ${(props) => props.$borderRadiusCorners.bottomRight};
  border-bottom-left-radius: ${(props) => props.$borderRadiusCorners.bottomLeft};
  border-top-left-radius: ${(props) => props.$borderRadiusCorners.topLeft};

  span {
    color: ${(props) => props.theme.fillIn.default.textColor};
    transition: color ${TRANSITION_SLOW} ease;

    position: relative;
    z-index: ${Z_ABOVE};
  }

  &[data-disabled='true'] {
    cursor: default;
    background-color: ${(props) => props.theme.fillIn.disabled.background};

    span {
      color: ${(props) => props.theme.fillIn.disabled.textColor};
    }

    &:hover {
      span {
        color: ${(props) => props.theme.fillIn.disabled.textColor};
      }
      div[data-fill-in] {
        transform: scale(0) !important;
      }
    }
  }

  div[data-fill-in] {
    position: absolute;

    height: 200%;
    width: 200%;

    background-color: ${(props) => props.theme.fillIn.hover.background};

    transition: transform ${TRANSITION_SLOW} ease;
    transform: scale(0);
  }

  &:hover, &:focus-within, &[data-force-fill-in='true'] {
    span {
      color: ${(props) => props.theme.fillIn.hover.textColor};
    }

    div[data-fill-in] {
      transform: scale(1);
    }
  }
`;
