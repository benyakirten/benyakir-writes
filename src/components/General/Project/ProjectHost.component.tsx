import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { FileQuery } from "@/types/general";
import ProjectTech from "./ProjectTech.component";

const ProjectHost: React.FC<{ host: string }> = ({ host }) => {
	const iconQuery = useStaticQuery<FileQuery>(graphql`
		query IconQuery {
			file (name: { eq: "Globe" }) {
				publicURL
			}
		}
	`);
	return (
		<ProjectTech tech={host} publicURL={iconQuery.file?.publicURL ?? ""} />
	);
};

export default ProjectHost;