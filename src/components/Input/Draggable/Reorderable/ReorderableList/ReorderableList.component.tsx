import * as React from "react"

import { ReorderableColumn, ReorderableContainer } from "./ReorderableList.styles"
import ReorderableItem from "../ReorderableItem/ReorderableItem.component"

import { ReorderableListProps } from "@Types/props/draggable"

const ReorderableList: React.FC<ReorderableListProps> = ({
  onDrop,
  onSelect,
  selectedItem,
  items
}) => {
  return (
    <ReorderableColumn>
      <ReorderableContainer>
        {items.map(({ dragValue, value })=> (
          <ReorderableItem
            key={dragValue}
            onDrop={onDrop}
            onSelect={onSelect}
            value={dragValue}
            selected={selectedItem === dragValue}
          >
            {value}
          </ReorderableItem>
        ))}
      </ReorderableContainer>
    </ReorderableColumn>
  )
}

export default ReorderableList
