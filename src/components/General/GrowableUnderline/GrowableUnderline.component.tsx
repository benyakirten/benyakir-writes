import React from "react";
import styled from "styled-components";

import { hoverUnderline } from "@/styles/style-mixins";

const UnderlinableItem = styled.div<{
	display?: React.CSSProperties["display"];
	$underlineColor?: string;
}>`
    display: ${(props) => props.display ?? "inline"};

	${(props) => hoverUnderline(props.$underlineColor ?? props.theme.base.link)}
`;

const GrowableUnderline: React.FC<
	{
		display?: React.CSSProperties["display"];
		underlineColor?: string;
	} & ChildrenProp
> = ({ children, display, underlineColor }) => (
	<UnderlinableItem $underlineColor={underlineColor} display={display}>
		{children}
	</UnderlinableItem>
);

export default GrowableUnderline;
