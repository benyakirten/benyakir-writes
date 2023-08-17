import styled from 'styled-components'

import { media } from '@Styles/queries'
import { FONT_MD, TRANSITION_NORMAL } from '@StyleVars'

export const ResultsContainer = styled.div<{ resultLength?: number }>`
  cursor: default;
  overflow: auto;
  margin-top: 1rem;
  margin-left: -1px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  max-height: ${(props) =>
    props.resultLength && props.resultLength > 1 ? '13rem' : '6.5rem'};

  border: 2px solid ${(props) => props.theme.searchBox.border};
  background-color: ${(props) => props.theme.searchBox.background};
  color: ${(props) => props.theme.searchBox.textColor};
  padding: 0.5rem;

  transition: all ${TRANSITION_NORMAL} ease;
  ${media.reducedMotion} {
    transition: all 1ms ease;
  }
`

export const SingleResult = styled.div`
  cursor: pointer;

  padding: 0.5rem 1rem;
  max-height: 6.5rem;
  width: 100%;

  font-size: ${FONT_MD};
  color: ${(props) => props.theme.searchBox.result.textColor};
  border: 1px solid ${(props) => props.theme.searchBox.result.border};

  opacity: 0.85;

  ${media.noHover} {
    opacity: 1;
  }

  transition: opacity ${TRANSITION_NORMAL} ease;

  &:hover {
    opacity: 1;
  }
`
