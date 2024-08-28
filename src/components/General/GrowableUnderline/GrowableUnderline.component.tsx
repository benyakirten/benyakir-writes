import React from "react";
import styled from "styled-components";

import { hoverUnderline } from "@/styles/style-mixins";

const UnderlinableItem = styled.div<{
	display?: React.CSSProperties["display"];
}>`
    display: ${(props) => props.display ?? "inline"};

	${(props) => hoverUnderline(props.theme.base.link)}
`;

const GrowableUnderline: React.FC<
	{ display?: React.CSSProperties["display"] } & ChildrenProp
> = ({ children, display }) => (
	<UnderlinableItem display={display}>{children}</UnderlinableItem>
);

export default GrowableUnderline;
