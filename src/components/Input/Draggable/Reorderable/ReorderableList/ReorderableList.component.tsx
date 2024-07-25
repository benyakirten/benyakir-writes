import * as React from "react";

import ReorderableItem from "../ReorderableItem/ReorderableItem.component";
import {
	ReorderableColumn,
	ReorderableContainer,
} from "./ReorderableList.styles";

import type { ReorderableListProps } from "@Types/props/draggable";

const ReorderableList: React.FC<ReorderableListProps> = ({
	onDrop,
	onSelect,
	selectedItem,
	items,
	cyId,
}) => {
	return (
		<ReorderableColumn>
			<ReorderableContainer data-cy={cyId}>
				{items.map(({ dragValue, value }) => (
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
	);
};

export default ReorderableList;
