import React from "react";
import styled from "styled-components";

import { RecentProjectItem } from "@/types/portfolio";
import ProjectCard from "@/components/Cards/ProjectCard.component";
import { SIZE_MD, Z_ABOVE } from "@/styles/variables";
import { media } from "@/styles/queries";

const RecentProjectsContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: ${SIZE_MD};

	& > li {
		z-index: ${Z_ABOVE};
		background-color: ${(props) => props.theme.base.background};
	}

	${media.tablet} {
		grid-template-columns: 1fr;
	}
`;

const RecentProjects: React.FC<{ projects: RecentProjectItem[] }> = ({
	projects,
}) => {
	return (
		<RecentProjectsContainer>
			{projects.map((project) => (
				<ProjectCard
					project={project}
					key={project.slug}
					image={project.image}
				/>
			))}
		</RecentProjectsContainer>
	);
};

export default RecentProjects;
