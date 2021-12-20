import * as React from 'react'

import { DestinationItemProps } from '@Types/props/draggable'
import { ItemContainer, ItemContent } from './DestinationItem.styles'

import { MinorHeading } from '@Styles/general-components'

const DraggableDestinationItem: React.FC<DestinationItemProps> = ({ title, children, onDrop }) => {
  const [draggedOver, setDraggedOver] = React.useState(false)
  const dropHandler = (e: React.DragEvent<HTMLLIElement>) => {
    const info = +e.dataTransfer.getData('item-information')
    setDraggedOver(false)
    onDrop(info)
  }

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    setDraggedOver(true)
  }

  const dragLeaveHandler = () => {
    setDraggedOver(false)
  }

  return (
    <ItemContainer
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      draggedOver={draggedOver}
    >
      <MinorHeading>{title}</MinorHeading>
      <ItemContent>{children}</ItemContent>
    </ItemContainer>
  )
}

export default DraggableDestinationItem