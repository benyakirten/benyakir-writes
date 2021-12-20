import * as React from "react"

import { SubHeading } from "@Styles/general-components"
import { ReorderableColumn, ReorderableContainer } from "./ReorderableList.styles"
import ReorderableItem from "../ReorderableItem/ReorderableItem.component"

import useAlternation from "@Hooks/useAlternation.hook"

import { ReorderableListProps } from "@Types/props/draggable"

const ReorderableList: React.FC<ReorderableListProps> = ({
  onDrop,
  items,
  title,
}) => {
  const [selectedItem, setSelectedItem] = useAlternation()
  return (
    <ReorderableColumn>
      <SubHeading>{title}</SubHeading>
      <ReorderableContainer>
        {items.map((val, idx) => (
          <ReorderableItem
            key={val}
            onDrop={onDrop}
            onSelect={(e) => setSelectedItem(e.toString())}
            index={idx}
            selected={selectedItem === idx.toString()}
          >
            {val}
          </ReorderableItem>
        ))}
      </ReorderableContainer>
    </ReorderableColumn>
  )
}

export default ReorderableList
