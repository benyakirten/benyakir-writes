import React from "react";
import styled from "styled-components";

import {
	SIZE_XS,
	FONT_XS,
	TRANSITION_NORMAL,
	SIZE_SM,
	FONT_SM,
	FONT_XXS,
} from "@/styles/variables";

const TextInputContainer = styled.div`
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
    padding: calc(${SIZE_SM} + 4px) ${SIZE_XS} 2px;
    border: 2px solid ${(props) => props.theme.textInput.border};

    font-size: ${FONT_SM};
    color: ${(props) => props.theme.textInput.textColor};
    background-color: ${(props) => props.theme.textInput.background};

    &:hover + label,
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 4px;
      opacity: 0.7;
      font-size: ${FONT_XXS};
    }
  }
`;

const Text: React.FC<TextInputProps> = ({ label, name, onChange, value }) => {
	return (
		<TextInputContainer>
			<input
				value={value}
				type="text"
				placeholder=" "
				name={name}
				id={name}
				onChange={(e) => onChange(e.target.value)}
			/>
			<label htmlFor={name}>{label}</label>
		</TextInputContainer>
	);
};

export default Text;
