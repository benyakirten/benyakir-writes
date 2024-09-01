import styled from "styled-components";

import {
	FONT_SIZE_MD,
	FONT_SIZE_SM,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
} from "@/styles/variables";

export const TextInputContainer = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 40%;
    left: calc(${SIZE_XS} + 2.6px);
    transform: translateY(-40%) scale(1);
    transform-origin: left;

    cursor: text;

    color: ${(props) => props.theme.textInput.textColor};
    font-size: ${FONT_SIZE_MD};

    opacity: 0.5;

    transition: all ${TRANSITION_NORMAL} ease;
  }

  input {
    padding: calc(${SIZE_SM} + ${SIZE_XS}) ${SIZE_XS} 2px;
    border: 2px solid ${(props) => props.theme.textInput.border};

    font-size: ${FONT_SIZE_SM};
    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0;
      opacity: 1;
      color: ${(props) => props.theme.textInput.disabled};
      transform: translateY(0) scale(0.6);
    }
  }
`;
