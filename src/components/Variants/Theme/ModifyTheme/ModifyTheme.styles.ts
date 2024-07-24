import styled from "styled-components";

import { fadeIn } from "@/styles/animations";
import { FONT_MD } from "@StyleVars";

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FONT_MD};
`;

export const ThemeAppearance = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s ease-in forwards;
`;
