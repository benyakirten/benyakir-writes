import { FONT_MD } from "@/styles/variables"
import styled from "styled-components"

export const ItemContainer = styled.li<{ draggedOver: boolean }>`
  display: flex;
  flex-direction: column;

  padding: 0.5rem;

  background-color: ${props => props.draggedOver ? props.theme.base.textColor : props.theme.base.background};
  color: ${props => props.draggedOver ? props.theme.base.background : props.theme.base.textColor};
  border: 2px solid ${props => props.theme.base.border};

  transition: all 1s ease;
`

export const ItemContent = styled.p`
  overflow: auto;
  padding: 1.5rem 0.5rem;
  font-size: ${FONT_MD};
`