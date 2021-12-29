import * as React from "react";

import { DestinationItemProps } from "@Types/props/draggable";
import {
  ItemContainer,
  ItemContent,
  ItemTitle,
} from "./DestinationItem.styles";

const DraggableDestinationItem: React.FC<DestinationItemProps> = ({
  title,
  children,
  onDrop,
}) => {
  const [draggedOver, setDraggedOver] = React.useState(false);
  const dropHandler = (e: React.DragEvent<HTMLLIElement>) => {
    const info = e.dataTransfer.getData("data-value");
    setDraggedOver(false);
    onDrop(info);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const dragLeaveHandler = () => {
    setDraggedOver(false);
  };

  return (
    <ItemContainer
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <ItemTitle draggedOver={draggedOver}>{title}</ItemTitle>
      <ItemContent draggedOver={draggedOver}>{children}</ItemContent>
    </ItemContainer>
  );
};

export default DraggableDestinationItem;
