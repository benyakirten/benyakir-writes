import * as React from "react";

import { NoLineBreak } from "@Styles/general-components";
import { OutsideLink, StyledLink } from "./CustomLink.styles";

import { LinkProps } from "@/types/props";

const CustomLink: React.FC<LinkProps> = ({
    small = false,
    dark = true,
    active = false,
    to,
    children,
    outside = false,
    inline = false,
    limitUnderbar = false
}) => (
    <>
        {outside ? (
            <OutsideLink
                inline={inline}
                small={small}
                active={active}
                dark={dark}
                href={to}
                limitUnderbar={limitUnderbar}
            >
                {children}
            </OutsideLink>
        ) : (
            <StyledLink
                inline={inline}
                small={small}
                active={active}
                dark={dark}
                to={to}
                limitUnderbar={limitUnderbar}
            >
                {children}
            </StyledLink>
        )}
    </>
);

export default CustomLink;
