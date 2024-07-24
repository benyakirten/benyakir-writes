import { graphql } from "gatsby";
import type * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	WpContent,
} from "@Styles/general-components";
import { ProjectHeader } from "@Variants";

import { getPrettyDate } from "@Utils/dates";
import { formatWpText } from "@Utils/posts";
import { formatProject, getFullTechName } from "@Utils/project";
import { firstWords } from "@Utils/strings";

import { useFetchRepoUpdatedDate } from "@/hooks";
import type { WpProject } from "@Types/query";

export const Head: React.FC<WpProject> = ({ data }) => {
	const project = formatProject(data.wpProject);
	return (
		<>
			<title>{project.title}</title>
			<meta
				name="description"
				content={`${project.title}, created on ${getPrettyDate(
					project.firstReleased.date,
				)}, using ${project.longTechnologies.join(", ")}. ${firstWords(
					formatWpText(project.content),
					150,
				)}`}
			/>
		</>
	);
};

const Project: React.FC<WpProject> = ({ data }) => {
	const project = formatProject(data.wpProject);
	const icons: FileNode[] = data.allFile.nodes
		.filter((f) => project.shortTechnologies.includes(f.name))
		.map((f) => ({ ...f, name: getFullTechName(f.name) }));

	const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
	return (
		<Page>
			<LeadHeading>{project.title}</LeadHeading>
			<ProjectHeader
				project={project}
				icons={icons}
				latestUpdateState={latestUpdateState}
			/>
			<Grouping>
				<WpContent dangerouslySetInnerHTML={{ __html: project.content }} />
			</Grouping>
		</Page>
	);
};

export const query = graphql`
  query ($id: String) {
    wpProject(id: { eq: $id }) {
      project {
        firstReleased
        hostedOn
        latestUpdate
        mainLink
        repoLink
        technologies
      }
      content
      title
    }
    allFile {
      nodes {
        publicURL
        name
      }
    }
  }
`;

export default Project;
