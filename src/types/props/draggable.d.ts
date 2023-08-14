import { DraggedOverPosition } from "@Utils/enums";

interface DraggableItemData {
  value: string | JSX.Element;
  dragValue: string;
}

interface ReorderableListProps {
  onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
  onSelect: (value: string) => void;
  selectedItem: string;
  items: DraggableItemData[];
  cyId?: string;
}

interface ReorderableItemProps extends ChildrenProp {
  onSelect?: (value: string) => void;
  onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
  value: string;
  selected: boolean;
}

interface DestinationItem extends ChildrenProp {
  title: string;
  content: string;
  onDrop: (value: string) => void;
}

interface DestinationItemProps extends ChildrenProp {
  title: string;
  onDrop: (value: string) => void;
}

interface DestinationListProps {
  destinations: DestinationItem[];
}