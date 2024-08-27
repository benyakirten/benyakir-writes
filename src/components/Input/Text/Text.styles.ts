import styled from "styled-components";

import {
	FONT_SIZE_SM,
	FONT_SIZE_XS,
	FONT_SIZE_XXS,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
} from "@/styles/variables";

export const TextInputContainer = styled.div`
  position: relative;

  label {
    position: absolute;
    top: ${SIZE_XS};
    left: calc(${SIZE_XS} + 0.1rem);

    cursor: text;

    color: ${(props) => props.theme.textInput.textColor};
    font-size: ${FONT_SIZE_XS};

    transition: all ${TRANSITION_NORMAL} ease;
  }

  input {
    padding: calc(${SIZE_SM} + 4px) ${SIZE_XS} 2px;
    border: 2px solid ${(props) => props.theme.textInput.border};

    font-size: ${FONT_SIZE_SM};
    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 4px;
      color: ${(props) => props.theme.base.disabled};
      font-size: ${FONT_SIZE_XXS};
    }
  }
`;
