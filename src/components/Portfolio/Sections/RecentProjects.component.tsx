import React from "react";
import styled from "styled-components";

import ProjectCard from "@/components/Cards/ProjectCard.component";
import { media } from "@/styles/queries";
import { SIZE_MD, Z_ABOVE } from "@/styles/variables";
import { RecentProjectItem } from "@/types/portfolio";

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
				<ProjectCard {...project} key={project.slug} image={project.image} />
			))}
		</RecentProjectsContainer>
	);
};

export default RecentProjects;
