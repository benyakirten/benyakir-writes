import React from "react";

import { CustomLink, Foldout } from "@Gen";

import { capitalize, titleToKebab } from "@Utils/strings";

const LinkGroup: React.FC<LinkGroupProps> = ({
	open = false,
	domain,
	links,
	height = "4rem",
	onClick,
	children,
	tabIndex = 0,
}) => {
	return (
		<Foldout
			open={open}
			tabIndex={tabIndex}
			onClick={onClick}
			height={height}
			topbar={
				<CustomLink tabIndex={tabIndex} to={`/${domain}`}>
					{capitalize(domain)}
				</CustomLink>
			}
		>
			{links.map((l) => (
				<CustomLink
					tabIndex={tabIndex}
					key={typeof l === "string" ? l : l.name}
					small
					underbarsize="70%"
					to={`/${domain}/${titleToKebab(typeof l === "string" ? l : l.link)}/`}
				>
					{typeof l === "string" ? l : l.name}
				</CustomLink>
			))}
			{children}
		</Foldout>
	);
};

export default LinkGroup;
