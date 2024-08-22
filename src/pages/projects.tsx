import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";

import { useMultiSelect, usePagination } from "@Hooks";
import projectsMisc from "@WPData/Projects/misc.json";
import { FlattenedProjectCard } from "@Types/posts";
import { projects, projectsDescription } from "@/data/search";
import { CardContainer, NewProjectCard } from "@/components/Cards";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Projects</title>
		<meta name="description" content={projectsDescription} />
	</>
);

const ProjectsPage: React.FC = () => {
	const projectPagination = usePagination<FlattenedProjectCard>(projects);

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		projects[0].firstReleased.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		projects[projects.length - 1].firstReleased.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const hosts = React.useMemo(
		() => projectsMisc.hosts.map((host) => ({ label: host, value: host })),
		[],
	);
	const techs = React.useMemo(
		() => projectsMisc.longTechs.map((tech) => ({ label: tech, value: tech })),
		[],
	);

	const [hostChoices, filterByHost] = useMultiSelect();
	const [techChoices, filterByTech] = useMultiSelect();
	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Projects</LeadHeading>
				<Grouping>
					<CardContainer>
						{projectPagination.visibleItems.map((project) => (
							<NewProjectCard key={project.title} project={project} />
						))}
					</CardContainer>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default ProjectsPage;
