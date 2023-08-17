import styled from 'styled-components'

import { FONT_LG, FONT_XXS, MULISH, TRANSITION_SLOW } from '@StyleVars'

export const TextAreaContainer = styled.div`
  position: relative;

  textarea {
    resize: both;

    width: 100%;
    height: 100%;

    padding: 1.2rem 0.5rem;

    font-size: ${FONT_LG};
    font-family: ${MULISH};

    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};
    border: 2px solid ${(props) => props.theme.textInput.border};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0.5rem;
      font-size: ${FONT_XXS};
    }
  }

  label {
    position: absolute;
    top: 1.2rem;
    left: 0.75rem;

    cursor: text;

    color: ${(props) => props.theme.textInput.textColor};
    font-size: ${FONT_LG};

    transition: all ${TRANSITION_SLOW} ease;
  }
`
