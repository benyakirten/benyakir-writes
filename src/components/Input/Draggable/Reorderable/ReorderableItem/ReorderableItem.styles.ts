import styled from 'styled-components'

import { FONT_MD, SHADOW_SM, TRANSITION_NORMAL } from '@Styles/variables'

import { DraggedOverPosition } from '@Utils/enums'

export const IndividualItem = styled.li<{
  selected: boolean
  draggedPosition: DraggedOverPosition
  dragged: boolean
}>`
  cursor: pointer;

  overflow: auto;
  position: relative;

  font-size: ${FONT_MD};

  border: 2px solid
    ${(props) =>
      props.selected ? props.theme.base.highlighted : props.theme.base.border};
  box-shadow: ${SHADOW_SM} ${(props) => props.theme.base.shadowColor};

  background-color: ${(props) =>
    props.draggedPosition === DraggedOverPosition.NONE
      ? props.theme.base.background
      : props.theme.base.textColor};
  color: ${(props) =>
    props.draggedPosition === DraggedOverPosition.NONE
      ? props.theme.base.textColor
      : props.theme.base.background};

  padding: ${(props) => (props.dragged ? '0.5rem' : '1.5rem 0.5rem')};

  margin: ${(props) => {
    switch (props.draggedPosition) {
      case DraggedOverPosition.NORTH:
        return '3rem 0 0 0'
      case DraggedOverPosition.SOUTH:
        return '0 0 3rem 0'
      default:
        return '0'
    }
  }};

  transition: all ${TRANSITION_NORMAL} ease;
`
