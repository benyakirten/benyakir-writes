import * as React from "react";

import { Grouping, Page } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { ProjectFilter } from "@Posts";
import { ProjectCard } from "@Variants";

import { usePagination } from "@Hooks";

import projectsMisc from "@WPData/Projects/misc.json";
import projectsJson from "@WPData/Projects/projects.json";

import { FlattenedProjectCard } from "@Types/posts";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Projects</title>
		<meta
			name="description"
			content="A view of all of my completed projects with various details from when I first started to learn programming."
		/>
	</>
);

const ProjectsPage: React.FC = () => {
	const preparedProjects = React.useMemo<FlattenedProjectCard[]>(
		() =>
			// @ts-ignore
			projectsJson.map((p: FlattenedProjectCard) => ({
				...p,
				firstReleased: {
					...p.firstReleased,
					date: new Date(p.firstReleased.date),
				},
			})),
		[],
	);

	const projectPagination =
		usePagination<FlattenedProjectCard>(preparedProjects);

	return (
		<Page>
			<LeadPage
				title="Projects"
				filter={
					<ProjectFilter
						allProjects={preparedProjects}
						allHosts={projectsMisc.hosts}
						allTechs={projectsMisc.longTechs}
						onFilter={projectPagination.setCurrentItems}
					/>
				}
			>
				<Grouping>
					<Paginate {...projectPagination} El={ProjectCard} />
				</Grouping>
			</LeadPage>
		</Page>
	);
};

export default ProjectsPage;
