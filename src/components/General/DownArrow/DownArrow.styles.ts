import { FONT_SIZE_LG, TRANSITION_SLOW } from "@/styles/variables";
import styled from "styled-components";

export const StyledArrow = styled.span<{ open: boolean }>`
  position: absolute;
  left: -1.5rem;

  outline: none;

  font-size: ${FONT_SIZE_LG};

  transition: all ${TRANSITION_SLOW} ease;
  transform: rotate(${(props) => (props.open ? "180" : "0")}deg);
`;