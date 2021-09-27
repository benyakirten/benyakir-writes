import * as React from "react";

import Foldout from "@Gen/Foldout/Foldout.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { titleToKebab } from "@Utils/strings";

import { LinkGroupProps } from "@Types/props";

const LinkGroup: React.FC<LinkGroupProps> = ({
    open = false,
    domain,
    links,
    height = "4rem",
    onClick,
    children,
    tabIndex = 0
}) => {
    return (
        <Foldout
            open={open}
            tabIndex={tabIndex}
            onClick={onClick}
            height={height}
            topbar={
                <CustomLink tabIndex={tabIndex} to={`/${domain}`}>
                    {domain.toUpperCase()}
                </CustomLink>
            }
        >
            {links.map((l) => (
                <CustomLink tabIndex={tabIndex} key={l} small underbarSize="85%" to={`/${domain}/${titleToKebab(l)}/`}>
                    {l}
                </CustomLink>
            ))}
            {children}
        </Foldout>
    );
};

export default LinkGroup;
