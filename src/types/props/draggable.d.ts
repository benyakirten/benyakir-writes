import type { DraggedOverPosition } from "@/utils/enums";

type DraggableItemData = {
	value: string | JSX.Element;
	dragValue: string;
};

type ReorderableListProps = {
	onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
	onSelect: (value: string) => void;
	selectedItem: string;
	items: DraggableItemData[];
	cyId?: string;
};

type ReorderableItemProps = ChildrenProp & {
	onSelect?: (value: string) => void;
	onDrop: (start: string, end: string, position: DraggedOverPosition) => void;
	value: string;
	selected: boolean;
};

type DestinationItem = ChildrenProp & {
	title: string;
	content: string;
	onDrop: (value: string) => void;
};

type DestinationItemProps = ChildrenProp & {
	title: string;
	onDrop: (value: string) => void;
};

type DestinationListProps = {
	destinations: DestinationItem[];
};
