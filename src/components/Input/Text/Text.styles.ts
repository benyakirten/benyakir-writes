import styled from "styled-components";

import { FONT_LG, FONT_XS, TRANSITION_NORMAL } from "@StyleVars";
import { media } from "@Styles/queries";

export const TextInputContainer = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 1.6rem;
    left: 0.75rem;

    cursor: text;

    color: ${(props) => props.theme.textInput.textColor};
    font-size: ${FONT_LG};

    transition: all ${TRANSITION_NORMAL} ease;
  }

  input {
    padding: 1.6rem 0.5rem;
    border: 2px solid ${(props) => props.theme.textInput.border};

    font-size: ${FONT_LG};
    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};

    ${media.phone} {
      min-width: 10rem;
    }

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0.5rem;
      font-size: ${FONT_XS};
    }
  }
`;
