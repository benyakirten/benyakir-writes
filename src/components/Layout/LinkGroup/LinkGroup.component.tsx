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
}) => {
    return (
        <Foldout
            open={open}
            onClick={onClick}
            height={height}
            topbar={
                <CustomLink to={`/${domain}`}>
                    {domain.toUpperCase()}
                </CustomLink>
            }
        >
            {links.map((l) => (
                <CustomLink key={l} small to={`/${domain}/${titleToKebab(l)}/`}>
                    {l}
                </CustomLink>
            ))}
            {children}
        </Foldout>
    );
};

export default LinkGroup;
