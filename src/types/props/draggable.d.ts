import { DraggedOverPosition } from "@Utils/enums";

interface DraggableItemData {
  value: string;
  dragValue: string;
}

interface ReorderableListProps {
  onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
  onSelect: (value: string) => void;
  selectedItem: string;
  items: DraggableItemData[];
}

interface ReorderableItemProps {
  onSelect?: (value: string) => void;
  onDrag?: (value: string) => void;
  onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
  value: string;
  selected: boolean;
}

interface DestinationItem {
  title: string;
  content: string;
  onDrop: (value: string) => void;
}

interface DestinationItemProps {
  title: string;
  onDrop: (value: string) => void;
}

interface DestinationListProps {
  destinations: DestinationItem[];
}