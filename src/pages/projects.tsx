import * as React from "react";

import { Grouping, Page } from "@Styles/general-components";

import { LeadPage, Paginate } from "@Layout";
import { ProjectFilter } from "@Posts";
import { ProjectCard } from "@Variants";

import { useMultiSelect, usePagination } from "@Hooks";

import projectsMisc from "@WPData/Projects/misc.json";
import projectsJson from "@WPData/Projects/projects.json";

import { FlattenedProjectCard } from "@Types/posts";
import { hasSomeContent } from "@/utils/search";
import { projectsDescription } from "@/data/pages";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Projects</title>
		<meta name="description" content={projectsDescription} />
	</>
);

const ProjectsPage: React.FC = () => {
	const projects = React.useMemo<FlattenedProjectCard[]>(
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

	function triggerFilter({
		newPublishedBefore,
		newPublishedAfter,
		newFilterWords,
		newHosts,
		newTechs,
	}: {
		newPublishedBefore?: Date;
		newPublishedAfter?: Date;
		newFilterWords?: string[];
		newHosts?: Set<string>;
		newTechs?: Set<string>;
	}) {
		const _publishedBefore = newPublishedBefore ?? publishedBefore;
		const _publishedAfter = newPublishedAfter ?? publishedAfter;
		const _filterWords = newFilterWords ?? filterWords;
		const _hosts = newHosts ?? hostChoices;
		const _techs = newTechs ?? techChoices;

		let filteredProjects = projects
			.filter(
				(p) => p.firstReleased.date.getTime() <= _publishedBefore.getTime(),
			)
			.filter(
				(p) => p.firstReleased.date.getTime() >= _publishedAfter.getTime(),
			);

		if (hasSomeContent(_filterWords)) {
			filteredProjects = filteredProjects.filter((p) =>
				_filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()]),
			);
		}

		filteredProjects = filterByHost(_hosts, filteredProjects, (project) =>
			project.hostedOn ? [project.hostedOn] : [""],
		);

		filteredProjects = filterByTech(
			_techs,
			filteredProjects,
			(project) => project.longTechnologies,
		);

		projectPagination.setCurrentItems(filteredProjects);
	}

	function changePublishedBefore(val: Date) {
		setPublishedBefore(val);
		triggerFilter({ newPublishedBefore: val });
	}

	function changePublishedAfter(val: Date) {
		setPublishedAfter(val);
		triggerFilter({ newPublishedAfter: val });
	}

	function changeFilterWords(words: string[]) {
		setFilterWords(words);
		triggerFilter({ newFilterWords: words });
	}

	function changeHosts(hosts: PotentialChoice[]) {
		const choices = new Set(hosts.map((host) => host.value));
		triggerFilter({ newHosts: choices });
	}

	function changeTechs(techs: PotentialChoice[]) {
		const choices = new Set(techs.map((tech) => tech.value));
		triggerFilter({ newTechs: choices });
	}

	return (
		<Page>
			<LeadPage
				title="Projects"
				filter={
					<ProjectFilter
						publishedBefore={publishedBefore}
						publishedAfter={publishedAfter}
						hosts={hosts}
						changeHosts={changeHosts}
						techs={techs}
						changeTechs={changeTechs}
						changePublishedBefore={changePublishedBefore}
						changePublishedAfter={changePublishedAfter}
						changeFilterWords={changeFilterWords}
					/>
				}
			>
				<Grouping>
					<Paginate<FlattenedProjectCard>
						{...projectPagination}
						El={ProjectCard}
					/>
				</Grouping>
			</LeadPage>
		</Page>
	);
};

export default ProjectsPage;
