import { DraggedOverPosition } from "@Utils/enums";

interface ReorderableListProps {
  onDrop: (start: number, end: number, position: DraggedOverPosition) => void;
  items: string[];
  title: string;
}

interface ReorderableItemProps {
  onSelect?: (index: number) => void;
  onDrag?: (index: number) => void;
  onDrop: (start: number, end: number, position: DraggedOverPosition) => void;
  index: number;
  selected: boolean;
}

interface DestinationItem {
  title: string;
  content: string;
  onDrop: (index: number) => void;
}

interface DestinationItemProps {
  title: string;
  onDrop: (index: number) => void;
}

interface DestinationListProps {
  title: string;
  destinations: DestinationItem[];
}