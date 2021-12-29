import styled from "styled-components"

import { FONT_MD, MULISH } from "@StyleVars"

export const ItemContainer = styled.li`
  position: relative;

  display: flex;
  flex-direction: column;

  border: 2px solid ${props => props.theme.base.border};
`

export const ItemTitle = styled.span<{ draggedOver: boolean }>`
  position: absolute;
  top: -1rem;
  left: 1rem;
  z-index: 1;

  background-color: ${props => props.draggedOver ? props.theme.base.textColor : props.theme.base.background};
  color: ${props => props.draggedOver ? props.theme.base.background : props.theme.base.textColor};

  font-family: ${MULISH};
  font-size: ${FONT_MD};
  
  transition: all 1s ease;
`

export const ItemContent = styled.p<{ draggedOver: boolean }>`
  overflow: auto;
  padding: 2rem 1rem;
  
  font-size: ${FONT_MD};

  background-color: ${props => props.draggedOver ? props.theme.base.textColor : props.theme.base.background};
  color: ${props => props.draggedOver ? props.theme.base.background : props.theme.base.textColor};

  transition: all 1s ease;
`