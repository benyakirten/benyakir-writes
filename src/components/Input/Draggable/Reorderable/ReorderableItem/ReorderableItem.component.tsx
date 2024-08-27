import * as React from "react";

import { IndividualItem } from "./ReorderableItem.styles";

import { DraggedOverPosition } from "@/utils/enums";

import { setDraggedValue } from "@/store/drag/drag.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import type { ReorderableItemProps } from "@/types/props/draggable";

const DraggableItem: React.FC<ReorderableItemProps> = ({
	children,
	value,
	onSelect,
	selected,
	onDrop,
}) => {
	const [dragged, setDragged] = React.useState(false);
	const [draggedPosition, setDraggedPosition] =
		React.useState<DraggedOverPosition>(DraggedOverPosition.NONE);
	const dispatch = useAppDispatch();
	const draggedValue = useAppSelector((root) => root.drag.draggedValue);

	const dragStartHandler = (e: React.DragEvent<HTMLLIElement>) => {
		setDragged(true);
		e.dataTransfer.setData("data-value", value);
		dispatch(setDraggedValue(value));
	};

	const dragOverHandler = (
		e: React.DragEvent<HTMLLIElement> & { target: HTMLElement },
	) => {
		e.preventDefault();
		const targetValue = e.target.getAttribute("data-value");
		if (!targetValue || draggedValue === targetValue) {
			return setDraggedPosition(DraggedOverPosition.NONE);
		}
		const { clientY } = e;
		const { bottom, top }: DOMRect = e.target.getBoundingClientRect();
		const ave = (bottom + top) / 2;
		setDraggedPosition(
			clientY >= ave ? DraggedOverPosition.SOUTH : DraggedOverPosition.NORTH,
		);
	};

	const dragLeaveHandler = () => {
		setDraggedPosition(DraggedOverPosition.NONE);
	};

	const dropHandler = (
		e: React.DragEvent<HTMLLIElement> & { target: HTMLElement },
	) => {
		setDraggedPosition(DraggedOverPosition.NONE);
		onDrop(
			draggedValue,
			e.target.getAttribute("data-value") ?? "",
			draggedPosition,
		);
	};

	const dragEndHandler = () => {
		setDragged(false);
	};

	return (
		<IndividualItem
			draggable
			onClick={() => onSelect?.(value)}
			onDragStart={dragStartHandler}
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
			onDrop={dropHandler}
			onDragEnd={dragEndHandler}
			selected={selected}
			draggedPosition={draggedPosition}
			dragged={dragged}
			data-value={value}
		>
			{children}
		</IndividualItem>
	);
};

export default DraggableItem;
