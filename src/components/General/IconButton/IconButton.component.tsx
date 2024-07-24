import type * as React from "react";

import { StyledIconButton } from "./IconButton.styles";

const IconButton: React.FC<IconButtonProps> = ({
	iconSrc,
	onClick,
	size,
	alt,
	disabled = false,
	name,
	tabIndex = 0,
}) => {
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

export default IconButton;
