import { FONT_MD, TRANSITION_SLOW } from '@StyleVars';
import styled from 'styled-components';

export const ToggleGroup = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  height: 2.2rem;
`

export const ToggleInput = styled.input`
  display: none;
  position: relative;
   
  &:checked + label {
    background-color: ${props => props.theme.toggle.onBackground};

    &::after {
      background-color: ${props => props.theme.toggle.onColor};
      left: calc(100% - 1.8rem);
    }
  }

  & + label {
    background-color: ${props => props.theme.toggle.offBackground};

    &::after {
      background-color: ${props => props.theme.toggle.offColor};
      left: 0;
    }
  }
`

export const ToggleLabel = styled.label<{ label: string }>`
  cursor: pointer;

  position: relative;

  border-radius: 2rem;
  border: 2px solid ${props => props.theme.toggle.border};
  height: 2.2rem;
  width: 6rem;

  transition: all ${TRANSITION_SLOW} ease;

  &::after {
    content: "";
    position: absolute;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;

    transition: all ${TRANSITION_SLOW} ease;
  }
`

export const ToggleOutput = styled.span`
  cursor: pointer;
  font-size: ${FONT_MD};
  margin-left: 1rem;
`