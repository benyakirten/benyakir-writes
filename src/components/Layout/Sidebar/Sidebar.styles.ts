import styled from "styled-components";

import {
	SERIF_FONT,
	FONT_SIZE_XL,
	FONT_SIZE_XXL,
	SHADOW_MD,
	TRANSITION_NORMAL,
	TRANSITION_SLOW,
	Z_ABOVE,
	Z_RAISED,
	SIZE_SM,
	FONT_SIZE_XXS,
	SIZE_XS,
} from "@StyleVars";
import { media } from "@Styles/queries";
import { convertHexToRGBA } from "@Utils/colors";

export const StyledSidebar = styled.nav<{ open?: boolean }>`
  position: fixed;
  z-index: ${Z_RAISED};

  width: 15rem;
  height: 100vh;
  overflow: auto;

  padding-top: 1rem;
  padding-left: 1rem;

  transform: translateX(${(props) => (props.open ? "0%" : "-80%")});

  font-family: ${SERIF_FONT};
  font-size: ${FONT_SIZE_XXL};

  user-select: none;

  background-color: red;

  background-image: ${(props) => `linear-gradient(
    to right,
    ${props.theme.sidebar.primaryColor} ${props.theme.sidebar.primaryColorEnd}%,
    ${props.theme.sidebar.secondaryColor}
  )`};
  border-right: 2px solid ${(props) => props.theme.base.border};
  box-shadow: ${(props) =>
		`${SHADOW_MD} ${convertHexToRGBA(props.theme.sidebar.shadowColor, 0.4)}`};

  transition: transform ${TRANSITION_SLOW};
`;

export const SidebarContents = styled.div<{ open: boolean }>`
  position: relative;
  transform: translateX(${(props) => (props.open ? "0" : "-100%")});
`;

export const ArrowButton = styled.button<{ open: boolean }>`
  position: relative;

  font-size: ${FONT_SIZE_XL};

  ${media.phone} {
    font-size: ${FONT_SIZE_XXL};
  }

  color: ${(props) => props.theme.base.textColor};

  transition: all ${TRANSITION_SLOW} ease;
  rotate: ${(props) => (props.open ? "180" : "0")}deg;
  left: ${(props) => (props.open ? "0%" : "83%")};
`;

export const VisibleGroup = styled.div<{ open: boolean }>`
  opacity: ${(props) => (props.open ? "1" : "0")};

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const NavGroup = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: ${SIZE_XS};
  margin: ${SIZE_SM} 0;
`;

export const SubLinks = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;

  margin-left: 1rem;

  transform-origin: top;
  transition: all ${TRANSITION_SLOW} ease;
  height: ${(props) => (props.open ? "5rem" : "0")};
  opacity: ${(props) => (props.open ? "1" : "0")};
`;

export const LegalBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LegalItem = styled.span`
  font-size: ${FONT_SIZE_XXS};
  color: ${(props) => props.theme.base.textColor};
`;

export const SidebarBackdrop = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};

  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: ${Z_ABOVE};

  backdrop-filter: blur(${(props) => (props.open ? "4" : "0")}px);
  transition: backdrop-filter ${TRANSITION_NORMAL} ease;
`;
