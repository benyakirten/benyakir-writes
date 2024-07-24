import { GatsbyImage } from "gatsby-plugin-image";
import type * as React from "react";

import LatestUpdate from "@/components/Portfolio/LatestUpdate.component";
import { useFetchRepoUpdatedDate } from "@/hooks";
import { Column } from "@/styles/general-components";
import type { ProjectGridDatum } from "@/types/portfolio";
import { getPrettyDate } from "@/utils/dates";
import { getFullTechName } from "@/utils/project";
import {
	ProjectCardBottom,
	ProjectCardTop,
	ProjectContents,
	ProjectDates,
	ProjectDescription,
	ProjectTitle,
	TechBadge,
	TechBadges,
	TitleContainer,
} from "./Portfolio.styles";

const IndividualProject: React.FC<{
	project: ProjectGridDatum;
	techs: Set<string>;
}> = ({ project, techs }) => {
	const latestUpdateState = useFetchRepoUpdatedDate(project.repoLink);
	return (
		<ProjectContents>
			<ProjectCardTop>
				<TitleContainer>
					<ProjectTitle>{project.title}</ProjectTitle>
				</TitleContainer>
				{/* Since we're using content directly from WP, we have to set the HTML and trust that the WP server hasn't been hacked */}
				<Column style={{ gap: "1.5rem" }}>
					{project.image && (
						<GatsbyImage
							image={project.image.childImageSharp.gatsbyImageData}
							alt={project.image.name}
						/>
					)}
					<ProjectDescription
						dangerouslySetInnerHTML={{ __html: project.description }}
					/>
				</Column>
			</ProjectCardTop>
			<ProjectCardBottom>
				<ProjectDates>
					<div>First Created: {getPrettyDate(project.firstReleased)}</div>
					<LatestUpdate state={latestUpdateState} />
				</ProjectDates>
				<TechBadges>
					{project.technologies.map((tech) => (
						<TechBadge selected={techs.has(tech)} key={tech}>
							{getFullTechName(tech)}
						</TechBadge>
					))}
				</TechBadges>
			</ProjectCardBottom>
		</ProjectContents>
	);
};

export default IndividualProject;
