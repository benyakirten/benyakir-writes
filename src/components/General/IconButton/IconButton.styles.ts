import styled from "styled-components";

import { TRANSITION_EXTRA_SLOW } from "@/styles/variables";
import { SVGContainer } from "@Styles/general-components";

export const StyledIconButton = styled(SVGContainer)<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? "0.4" : "0.6")};
  &:hover {
    opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  }

  transition: all ${TRANSITION_EXTRA_SLOW} ease;
`;
