import React from "react";
import styled from "styled-components";

import { SIZE_SM, SIZE_XS } from "@/styles/variables";
import ThemeButton from "./ThemeButton.component";
import DeleteIcon from "@/components/Icons/Delete.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	copyThemeByID,
	deleteThemeByID,
	setActiveThemeByID,
} from "@/store/theme/theme.slice";
import CopyIcon from "@/components/Icons/Copy.component";
import { EditIcon, FavoriteIcon } from "@/components/Icons";

const StyledThemeItem = styled.li<{ selected: boolean }>`
	position: relative;

	display: flex;
	justify-contents: space-between;
	align-items: center;

	padding: ${SIZE_SM} ${SIZE_XS};

	&::before {
		content: "";
		display: ${(props) => (props.selected ? "block" : "none")};

		position: absolute;
	}
`;

const StyledThemeButtons = styled.div`
	display: flex;
	gap: ${SIZE_XS};
	align-items: center;
`;

const ThemeItem: React.FC<ThemeItemProps> = ({
	id,
	name,
	selectedTheme,
	onSelect,
}) => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme);

	const ActiveIcon = React.useMemo(
		() => (
			<FavoriteIcon
				fill={id === theme.active.id ? theme.active.base.focus : "none"}
			/>
		),
		[id, theme],
	);

	return (
		<StyledThemeItem selected={id === selectedTheme}>
			<p>{name}</p>
			<StyledThemeButtons>
				<ThemeButton
					text="Select"
					icon={ActiveIcon}
					onClick={() => dispatch(setActiveThemeByID(id))}
				/>
				<ThemeButton
					text="Edit"
					icon={<EditIcon />}
					onClick={() => onSelect(id)}
				/>
				<ThemeButton
					text="Copy"
					icon={<CopyIcon />}
					onClick={() => dispatch(copyThemeByID(id))}
				/>
				<ThemeButton
					text="Delete"
					icon={<DeleteIcon />}
					disabled={id === "0" || id === "1"}
					onClick={() => dispatch(deleteThemeByID(id))}
				/>
			</StyledThemeButtons>
		</StyledThemeItem>
	);
};

export default ThemeItem;
