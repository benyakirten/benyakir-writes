import * as React from "react";

import { Foldout } from "@Gen";
import { DatePicker, Filter, MultipleChoice } from "@Input";
import { SubHeading } from "@Styles/general-components";

import { useAlternation, useMultiSelect } from "@/hooks";
import { hasSomeContent } from "@/utils/search";

import type { ProjectsFilterProps } from "@/types/props/post-components";
import { FlattenedProjectCard } from "@/types/posts";
import { MultiSelectHookFilterFunction } from "@/types/hooks";

const ProjectFilter: React.FC<ProjectsFilterProps> = ({
	allProjects,
	allHosts,
	allTechs,
	onFilter,
}) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	const [publishedBefore, setPublishedBefore] = React.useState<Date>(
		allProjects[0].firstReleased.date,
	);
	const [publishedAfter, setPublishedAfter] = React.useState<Date>(
		allProjects[allProjects.length - 1].firstReleased.date,
	);

	const [filterWords, setFilterWords] = React.useState<string[]>([]);

	const hosts = React.useMemo(
		() => allHosts.map((host) => ({ label: host, value: host })),
		[allHosts],
	);
	const techs = React.useMemo(
		() => allTechs.map((tech) => ({ label: tech, value: tech })),
		[allTechs],
	);

	const [hostChoices, setHostChoices] = useMultiSelect();
	const [_, setTechChoices, filterByTechChoices] = useMultiSelect();

	function filterProjects(
		publishedBefore: Date,
		publishedAfter: Date,
		filterWords: string[],
		hostChoices: Set<string>,
		projects: FlattenedProjectCard[],
		filterByTechChoices: MultiSelectHookFilterFunction,
		onFilter: (projects: FlattenedProjectCard[]) => void,
	) {
		let filteredProjects = projects
			.filter(
				(p) => p.firstReleased.date.getTime() <= publishedBefore.getTime(),
			)
			.filter(
				(p) => p.firstReleased.date.getTime() >= publishedAfter.getTime(),
			);

		if (hasSomeContent(filterWords)) {
			filteredProjects = filteredProjects.filter((p) =>
				filterWords.every((w) => p.meta[w] || p.meta[w.toLowerCase()]),
			);
		}

		if (hostChoices.size > 0) {
			filteredProjects = filteredProjects.filter((project) =>
				hostChoices.has(project.hostedOn ?? ""),
			);
		}

		filteredProjects = filterByTechChoices(
			filteredProjects,
			(project) => project.longTechnologies,
		);

		onFilter(filteredProjects);
	}

	filterProjects(
		publishedBefore,
		publishedAfter,
		filterWords,
		hostChoices,
		allProjects,
		filterByTechChoices,
		onFilter,
	);

	return (
		<Filter name="projects" onSearch={(val) => setFilterWords(val.split(" "))}>
			<Foldout
				topbar={<SubHeading>Filter by date</SubHeading>}
				open={dropdownOpen === "date"}
				onClick={() => setDropdown("date")}
				height="10rem"
				cyId="foldout-dates"
			>
				<DatePicker
					name="proect-published-before"
					value={publishedBefore}
					label="Published before"
					onChange={setPublishedBefore}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
				<DatePicker
					name="project-published-after"
					value={publishedAfter}
					label="Published after"
					onChange={setPublishedAfter}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by host</SubHeading>}
				open={dropdownOpen === "host"}
				onClick={() => setDropdown("host")}
				height="20rem"
				heightMultiplierOnPhone={3}
				heightMultiplierOnTablet={1.6}
				cyId="foldout-host"
			>
				<MultipleChoice
					tabIndex={dropdownOpen === "host" ? 0 : -1}
					choices={hosts}
					onSelect={setHostChoices}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by technology</SubHeading>}
				open={dropdownOpen === "tech"}
				onClick={() => setDropdown("tech")}
				height="20rem"
				cyId="foldout-tech"
			>
				<MultipleChoice
					choices={techs}
					onSelect={setTechChoices}
					tabIndex={dropdownOpen === "tech" ? 0 : -1}
				/>
			</Foldout>
		</Filter>
	);
};

export default ProjectFilter;
