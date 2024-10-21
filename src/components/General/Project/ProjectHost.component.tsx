import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { FileQuery } from "@/types/general";
import ProjectTech from "./ProjectTech.component";

const ProjectHost: React.FC<{ host: string }> = ({ host }) => {
	const iconQuery = useStaticQuery<FileQuery>(graphql`
    query IconQuery {
      file(name: { eq: "Globe" }) {
        publicURL
      }
    }
  `);
	return (
		<ProjectTech
			shouldInvertInDark
			tech={host}
			publicURL={iconQuery.file?.publicURL ?? ""}
		/>
	);
};

export default ProjectHost;
