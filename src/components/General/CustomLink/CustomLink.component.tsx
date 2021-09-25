import * as React from "react";

import { OutsideLink, StyledLink } from "./CustomLink.styles";

import { LinkProps } from "@Types/props";

const CustomLink: React.FC<LinkProps> = ({
    tabIndex = 0,
    small = false,
    dark = true,
    active = false,
    to,
    children,
    outside = false,
    inline = false,
    limitUnderbar = false,
    underbarSize
}) => (
    <>
        {outside ? (
            <OutsideLink
                tabIndex={tabIndex}
                inline={inline}
                small={small}
                active={active}
                dark={dark}
                href={to}
                limitUnderbar={limitUnderbar}
                underbarSize={underbarSize}
            >
                {children}
            </OutsideLink>
        ) : (
            <StyledLink
                tabIndex={tabIndex}
                inline={inline}
                small={small}
                active={active}
                dark={dark}
                to={to}
                limitUnderbar={limitUnderbar}
                underbarSize={underbarSize}
            >
                {children}
            </StyledLink>
        )}
    </>
);

export default CustomLink;
