import * as React from 'react'

import { IndividualItem } from './ReorderableItem.styles'

import { DraggedOverPosition } from '@Utils/enums'

import { useAppDispatch, useAppSelector } from '@Store/hooks'
import { setDraggedIndex } from '@Store/drag/drag.slice'

import { ReorderableItemProps } from '@Types/props/draggable'

const DraggableItem: React.FC<ReorderableItemProps> = ({ children, index, onSelect, selected, onDrop }) => {
  const [dragged, setDragged] = React.useState(false)
  const [draggedPosition, setDraggedPosition] = React.useState<DraggedOverPosition>(DraggedOverPosition.NONE)
  const dispatch = useAppDispatch()
  const draggedIndex = useAppSelector(root => root.drag.draggedIndex)

  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>) => {
    setDragged(true)
    e.dataTransfer.setData('item-information', index.toString())
    dispatch(setDraggedIndex(index))
  }

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement> & { target: HTMLElement }) => {
    e.preventDefault()
    const targetIndex = +e.target.getAttribute('item-information')!
    if (targetIndex && draggedIndex === +targetIndex) {
      return setDraggedPosition(DraggedOverPosition.NONE)
    }
    const { clientY } = e;
    const { bottom, top }: DOMRect = e.target.getBoundingClientRect()
    const ave = (bottom + top) / 2
    setDraggedPosition(
      clientY >= ave
        ? DraggedOverPosition.SOUTH
        : DraggedOverPosition.NORTH
    )
  }

  const dragLeaveHandler = () => {
    setDraggedPosition(DraggedOverPosition.NONE)
  }

  const dropHandler = (e: React.DragEvent<HTMLLIElement> & { target: HTMLElement }) => {
    setDraggedPosition(DraggedOverPosition.NONE)
    onDrop(draggedIndex, +e.target.getAttribute('item-information')!, draggedPosition)
  }

  const dragEndHandler = () => {
    setDragged(false)
  }

  return (
    <IndividualItem
      draggable
      onClick={() => onSelect && onSelect(index)}
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onDragEnd={dragEndHandler}
      selected={selected}
      draggedPosition={draggedPosition}
      dragged={dragged}
      data-index={index}
    >
        {children}
    </IndividualItem>
  )
}

export default DraggableItem