import {
	SIZE_MD,
	SIZE_XS,
	TRANSITION_EXTRA_SLOW,
	TRANSITION_NORMAL,
} from "@/styles/variables";
import React from "react";
import styled from "styled-components";

const StyledThemeButton = styled.button`
    display: flex;
	flex-direction: column;
    justify-content: space-between;
	align-items: center;
	gap: ${SIZE_XS};

	transition: opacity ${TRANSITION_NORMAL} ease;

	&:disabled {
		cursor: default;
		opacity: 0.6;
	}

	& svg {
		transition: fill ${TRANSITION_EXTRA_SLOW} ease;
	}

	&:not(:disabled):hover svg {
		fill: ${({ theme }) => theme.theme.iconHoverColor};
	}
`;

const IconContainer = styled.div`
	width: ${SIZE_MD};
	height: ${SIZE_MD};
`;

const ThemeButton: React.FC<ThemeButtonProps> = ({
	icon,
	text,
	onClick,
	disabled,
}) => {
	return (
		<StyledThemeButton
			aria-label={text}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			<IconContainer>{icon}</IconContainer>
			<p>{text}</p>
		</StyledThemeButton>
	);
};

export default ThemeButton;
