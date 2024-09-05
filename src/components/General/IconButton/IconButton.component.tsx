import React from "react";
import styled from "styled-components";

import { FillIn } from "@/components/General";
import { FONT_SIZE_MD, SIZE_MD, SIZE_SM } from "@/styles/variables";
import { BorderRadiusCorners } from "@/types/filters";

const StyledIconButton = styled.button<{ $width?: string }>`
	display: flex;
	gap: ${SIZE_SM};
	align-items: center;
	
	width: ${({ $width }) => $width || "fit-content"};

    padding: ${SIZE_SM};
    
    border: 1px solid ${({ theme }) => theme.base.border};
    border-radius: ${SIZE_MD};
`;

const IconContainer = styled.div`
	width: 1.5rem;
	height: 1.5rem;

	display: grid;
	place-items: center;
`;

const TextContainer = styled.span`
	font-size: ${FONT_SIZE_MD};
`;

const IconButton: React.FC<
	{
		onClick: () => void;
		icon: React.ReactNode;
		borderRadiusCorners?: BorderRadiusCorners;
		width?: string;
		disabled?: boolean;
	} & ChildrenProp
> = ({
	onClick,
	icon,
	children,
	width,
	borderRadiusCorners = {
		topLeft: SIZE_MD,
		bottomLeft: SIZE_MD,
		topRight: SIZE_MD,
		bottomRight: SIZE_MD,
	},
	disabled = false,
}) => {
	return (
		<FillIn borderRadiusCorners={borderRadiusCorners}>
			<StyledIconButton
				disabled={disabled}
				$width={width}
				type="button"
				onClick={onClick}
			>
				{icon && <IconContainer>{icon}</IconContainer>}
				<TextContainer>{children}</TextContainer>
			</StyledIconButton>
		</FillIn>
	);
};

export default IconButton;
