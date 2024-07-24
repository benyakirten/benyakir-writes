import type * as React from "react";
import { ProjectLink } from "./Portfolio.styles";

const LinkOrNot: React.FC<{ link?: string; children: React.ReactNode }> = ({
	link,
	children,
}) => {
	if (link) {
		return <ProjectLink href={link}>{children}</ProjectLink>;
	}
	return children;
};

export default LinkOrNot;
