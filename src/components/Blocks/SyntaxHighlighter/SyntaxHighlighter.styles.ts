import styled from "styled-components";

import { FONT_SIZE_LG, SHADOW_MD, Z_ABOVE, Z_RAISED } from "@/styles/variables";
import { convertHexToRGBA } from "@/utils/colors";

export const HighlighterContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  box-shadow: ${(props) =>
		`${SHADOW_MD} ${convertHexToRGBA(props.theme.base.shadowColor, 0.4)}`};
  padding: 0.5rem 1rem;
  margin: 2rem 0;
`;

export const HighlighterTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${FONT_SIZE_LG};
`;

export const LoadingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: ${Z_ABOVE};
  background-color: rgba(255, 255, 255, 0.6);
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: ${Z_RAISED};
`;
