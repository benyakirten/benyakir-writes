import {
	FONT_SIZE_MD,
	SIZE_MD,
	SIZE_SM,
	SIZE_XXL,
	TRANSITION_SLOW,
} from "@/styles/variables";
import styled from "styled-components";

export const ToggleGroup = styled.div`
  --orb-size: calc(${SIZE_MD} - 4px);
  position: relative;

  display: flex;
  align-items: center;
  height: ${SIZE_MD};
  gap: ${SIZE_SM};
`;

export const ToggleInput = styled.input`
  display: none;
  position: relative;

  &:checked + label {
    background-color: ${(props) => props.theme.toggle.onBackground};

    &::after {
      background-color: ${(props) => props.theme.toggle.onColor};
      left: calc(100% - var(--orb-size));
    }
  }

  & + label {
    background-color: ${(props) => props.theme.toggle.offBackground};

    &::after {
      background-color: ${(props) => props.theme.toggle.offColor};
      left: 0;
    }
  }
`;

export const ToggleLabel = styled.label<{ label: string }>`
  cursor: pointer;

  position: relative;

  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.toggle.border};
  height: ${SIZE_MD};
  width: ${SIZE_XXL};

  transition: all ${TRANSITION_SLOW} ease;

  &::after {
    content: '';
    position: absolute;
    width: var(--orb-size);
    height: var(--orb-size);
    border-radius: 9999px;

    transition: all ${TRANSITION_SLOW} ease;
  }
`;

export const ToggleOutput = styled.button`
  font-size: ${FONT_SIZE_MD};
`;
