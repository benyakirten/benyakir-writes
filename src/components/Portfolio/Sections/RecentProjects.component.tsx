import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { RecentProjectItem } from "@/types/portfolio";
import { ProjectCardInterior } from "@/components/Cards/ProjectCard.component";
import { SIZE_MD, SIZE_SM, SIZE_XS, Z_ABOVE } from "@/styles/variables";

const RecentProjectsContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: ${SIZE_MD};
`;

const ProjectCardListItem = styled.li`
	border-radius: ${SIZE_XS};
	border: 1px solid ${(props) => props.theme.base.border};
	
	padding: ${SIZE_SM};
	background-color: ${(props) => props.theme.base.background};
	z-index: ${Z_ABOVE};
`;

const ProjectCardLink = styled(Link)`
	display: grid;
	gap: ${SIZE_SM};
	grid-template-columns: repeat(2, 1fr);
`;

const RecentProjects: React.FC<{ projects: RecentProjectItem[] }> = ({
	projects,
}) => {
	return (
		<RecentProjectsContainer>
			{projects.map((project) => (
				<ProjectCardListItem key={project.slug}>
					<ProjectCardLink to={`/project/${project.slug}`}>
						<ProjectCardInterior project={project} image={project.image} />
					</ProjectCardLink>
				</ProjectCardListItem>
			))}
		</RecentProjectsContainer>
	);
};

export default RecentProjects;
