import { Link } from "gatsby";
import styled from "styled-components";

import { FONT_LG, TRANSITION_NORMAL, TRANSITION_SLOW } from "@StyleVars";

export const StyledNavLink = styled(Link)<{
	active: boolean;
}>`
  position: relative;

  text-decoration: none;
  font-size: ${FONT_LG};
  width: fit-content;

  color: ${(props) => props.theme.link.dark};

  transition: color ${TRANSITION_NORMAL} ease;

  &::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;

    height: 2px;
    width: 100%;

    background-color: ${(props) => props.theme.link.dark};

    transition: scale ${TRANSITION_SLOW} ease;
    scale: 0 1;
    transform-origin: center;
  }

  &:hover, &:focus {
    color: ${(props) => props.theme.link.hoverColor};
    &::before {
      scale: 1 1;
    }
  }

  @media (any-hover: none) {
     &::after {
      scale: 1 1;
    }
  }
`;
