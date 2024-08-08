import { media } from "@/styles/queries";
import React from "react";
import styled from "styled-components";

const UnderlinableItem = styled.div<{ display?: string }>`
    display: ${(props) => props.display ?? "inline"};

	color: ${(props) => props.theme.link.dark};

	background-color: transparent;
	background-image: linear-gradient(${(props) => props.theme.link.dark}, ${(props) => props.theme.link.dark});
	background-repeat: no-repeat;
	background-size: 0px 2px;
	background-position: 0 100%;
	text-decoration: none;

	transition: background-size 0.3s;

	&:hover, &:focus-within {
		background-size: 100% 2px;
	}

	&:focus-within {
		outline: 1px solid ${(props) => props.theme.link.dark};
	}

    ${media.noHover} {
      background-size: 100% 2px;
    }
`;

const GrowableUnderline: React.FC<{ display?: string } & ChildrenProp> = ({
	children,
	display,
}) => <UnderlinableItem display={display}>{children}</UnderlinableItem>;

export default GrowableUnderline;
