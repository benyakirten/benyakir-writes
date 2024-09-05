import styled from "styled-components";

import {
	FONT_SIZE_MD,
	FONT_SIZE_SM,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
} from "@/styles/variables";

export const TextInputContainer = styled.div`
  position: relative;
  margin-left: 2px;
  
  label {
    position: absolute;
    top: 40%;
    left: calc(${SIZE_MD} - 2px);
    transform: translateY(-40%) scale(1);
    transform-origin: left;

    cursor: text;

    color: ${(props) => props.theme.base.textColor};
    font-size: ${FONT_SIZE_MD};

    opacity: 0.5;

    transition: all ${TRANSITION_NORMAL} ease;
  }

  input {
    padding: calc(${SIZE_SM} + ${SIZE_XS}) calc(${SIZE_MD} - 4px) 2px;
    border: 2px solid ${(props) => props.theme.base.border};

    font-size: ${FONT_SIZE_SM};
    color: ${(props) => props.theme.base.textColor};
    background-color: ${(props) => props.theme.base.background};

    border-top-right-radius: ${SIZE_MD};
    border-bottom-right-radius: ${SIZE_MD};
    border-bottom-left-radius: ${SIZE_MD};
    border-top-left-radius: ${SIZE_MD};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0;
      opacity: 1;
      color: ${(props) => props.theme.base.disabled};
      transform: translateY(0) scale(0.6);
    }
  }
`;
