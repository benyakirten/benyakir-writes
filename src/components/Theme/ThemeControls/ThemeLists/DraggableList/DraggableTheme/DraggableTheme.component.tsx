import * as React from "react";
import { styled } from "styled-components";

import { FlatBox } from "@/styles/general-components";
import { ThemeName } from "./DraggableTheme.styles";

import { useAppDispatch } from "@Store/hooks";
import {
	copyThemeByID,
	deleteThemeByID,
	setActiveThemeByID,
	setThemePreferenceByID,
} from "@Store/theme/theme.slice";
import { SIZE_MD, TRANSITION_EXTRA_SLOW } from "@/styles/variables";

const IconButton: React.FC<IconButtonProps> = ({
	iconSrc,
	onClick,
	size,
	alt,
	disabled = false,
	name,
	tabIndex = 0,
}) => {
	const StyledIconButton = styled.div<{
		disabled: boolean;
		src: string;
		alt: string;
		size?: string;
	}>`
	  position: relative;
	
	  background-color: ${(props) => props.theme.base.textColor};
	  mask: url(${(props) => props.src}) no-repeat center;
	
	  height: ${(props) => props.size ?? SIZE_MD};
	  width: ${(props) => props.size ?? SIZE_MD};
	  
	  opacity: ${(props) => (props.disabled ? "0.4" : "0.6")};
	  &:hover {
		opacity: ${(props) => (props.disabled ? "0.4" : "1")};
	  }
	
	  transition: all ${TRANSITION_EXTRA_SLOW} ease;
	`;

	const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.code === "Space" || e.code === "Enter") {
			handleClick(e);
		}
	};

	const handleClick = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
		!disabled && onClick();
	};

	return (
		<StyledIconButton
			src={iconSrc}
			onClick={handleClick}
			size={size}
			alt={alt}
			tabIndex={tabIndex}
			disabled={disabled}
			aria-label={name}
			role="button"
			onKeyDown={keyDownHandler}
		/>
	);
};

const DraggableTheme: React.FC<DraggableThemeProps> = ({
	open,
	nodes,
	themeId,
	themeName,
}) => {
	const dispatch = useAppDispatch();
	return (
		<FlatBox style={{ justifyContent: "space-between" }}>
			<ThemeName>{themeName}</ThemeName>
			<FlatBox>
				<IconButton
					alt={nodes[0].name.slice(2)}
					onClick={() => dispatch(setThemePreferenceByID(themeId))}
					iconSrc={nodes[0].publicURL}
					name={`${themeName}-set-preference`}
					size="2rem"
					tabIndex={open ? 0 : -1}
				/>
				<IconButton
					alt={nodes[1].name.slice(2)}
					onClick={() => dispatch(setActiveThemeByID(themeId))}
					iconSrc={nodes[1].publicURL}
					name={`${themeName}-set-active`}
					size="2rem"
					tabIndex={open ? 0 : -1}
				/>
				<IconButton
					alt={nodes[2].name.slice(2)}
					onClick={() => dispatch(copyThemeByID(themeId))}
					iconSrc={nodes[2].publicURL}
					name={`${themeName}-copy`}
					size="2rem"
					tabIndex={open ? 0 : -1}
				/>
				<IconButton
					alt={nodes[3].name.slice(2)}
					onClick={() => dispatch(deleteThemeByID(themeId))}
					iconSrc={nodes[3].publicURL}
					name={`${themeName}-delete`}
					size="2rem"
					tabIndex={open ? 0 : -1}
					disabled={themeId === "0" || themeId === "1"}
				/>
			</FlatBox>
		</FlatBox>
	);
};

export default DraggableTheme;
