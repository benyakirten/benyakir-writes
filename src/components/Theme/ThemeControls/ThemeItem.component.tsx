import React from "react";
import styled from "styled-components";

import { EditIcon, SelectIcon } from "@/components/Icons";
import CopyIcon from "@/components/Icons/Copy.component";
import DeleteIcon from "@/components/Icons/Delete.component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	copyThemeByID,
	deleteThemeByID,
	setActiveThemeByID,
} from "@/store/theme/theme.slice";
import { media } from "@/styles/queries";
import { FONT_XL, SIZE_SM, SIZE_XS } from "@/styles/variables";
import ThemeButton from "./ThemeButton.component";

const StyledThemeItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: fit-content;
	padding: ${SIZE_SM} ${SIZE_XS};

	border: 1px solid ${({ theme }) => theme.base.border};
	border-radius: ${SIZE_SM};

	${media.phone} {
		flex-direction: column;
		gap: ${SIZE_SM};
		padding: ${SIZE_XS};
	}
`;

const StyledThemeButtons = styled.div`
	display: flex;
	gap: ${SIZE_SM};
`;

const NameContainer = styled.p`
	${FONT_XL};
`;

const ThemeItem: React.FC<ThemeItemProps> = ({
	id,
	name,
	selectedTheme,
	onSelect,
}) => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme);

	const active = id === theme.active.id;
	const selected = id === selectedTheme;

	return (
		<StyledThemeItem>
			<NameContainer>{name}</NameContainer>
			<StyledThemeButtons>
				<ThemeButton
					text="Select"
					icon={<SelectIcon />}
					disabled={active}
					onClick={() => dispatch(setActiveThemeByID(id))}
					iconColor={active ? theme.active.theme.selectedThemeColor : undefined}
				/>
				<ThemeButton
					text="Edit"
					icon={<EditIcon />}
					disabled={selected}
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
