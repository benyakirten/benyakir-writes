import styled from "styled-components";

import {
	FONT_SM,
	FONT_XS,
	FONT_XXS,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
} from "@StyleVars";

export const TextInputContainer = styled.div`
  position: relative;

  label {
    position: absolute;
    top: ${SIZE_XS};
    left: calc(${SIZE_XS} + 0.1rem);

    cursor: text;

    color: ${(props) => props.theme.textInput.textColor};
    font-size: ${FONT_XS};

    transition: all ${TRANSITION_NORMAL} ease;
  }

  input {
    padding: ${SIZE_XS};
    padding-top: ${SIZE_SM};
    border: 2px solid ${(props) => props.theme.textInput.border};

    font-size: ${FONT_SM};
    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 2px;
      color: ${(props) => props.theme.base.disabled};
      font-size: ${FONT_XXS};
    }
  }
`;
