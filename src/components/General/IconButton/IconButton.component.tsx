import { SIZE_MD, TRANSITION_EXTRA_SLOW } from "@/styles/variables";
import * as React from "react";
import { styled } from "styled-components";

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

export default IconButton;
