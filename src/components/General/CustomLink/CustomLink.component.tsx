import * as React from "react";

import { OutsideLink, StyledLink } from "./CustomLink.styles";

const CustomLink: React.FC<LinkProps> = ({
    tabIndex = 0,
    small = false,
    dark = true,
    active = false,
    inheritColor = false,
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
                inheritColor={inheritColor}
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
                inheritColor={inheritColor}
                limitUnderbar={limitUnderbar}
                underbarSize={underbarSize}
            >
                {children}
            </StyledLink>
        )}
    </>
);

export default CustomLink;
