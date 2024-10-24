import * as React from "react";

import { CardContainer, ProjectCard } from "@/components/Cards";
import { Filter } from "@/components/Filters";
import { HeadBase } from "@/components/SEO";
import {
	projectHosts,
	projectTechs,
	projects,
	projectsDescription,
} from "@/data/search";
import { useFilter } from "@/hooks";
import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@/styles/general-components";
import { CreateFilterOption, FilterOption } from "@/types/filters";
import { FlattenedProjectCard } from "@/types/posts";
import {
	createAddDateFilterFn,
	createAddKeywordFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterByKeywordFn,
	createFilterBySearchFn,
} from "@/utils/filter";

export const Head: React.FC = () => (
	<HeadBase title="Projects" description={projectsDescription} />
);

const createFilterOptions: CreateFilterOption[] = [
	{
		match: "date",
		fn: createAddDateFilterFn(
			projects[projects.length - 1].firstReleased.date,
			projects[0].firstReleased.date,
		),
	},
	{
		match: "hosts",
		fn: createAddKeywordFilterFn("hosts"),
	},
	{
		match: "technologies",
		fn: createAddKeywordFilterFn("technologies"),
	},
	{
		match: "search",
		fn: createAddSearchFilterFn(),
	},
];

const filterBySearch = createFilterBySearchFn<FlattenedProjectCard>(
	(project, word) => {
		const lcWord = word.toLocaleLowerCase();
		return (
			!!project.meta[word] ||
			project.title.toLocaleLowerCase().includes(lcWord) ||
			project.content?.toLocaleLowerCase().includes(lcWord) ||
			!!project.longTechnologies?.find((lt) =>
				lt.toLocaleLowerCase().includes(lcWord),
			) ||
			!!project.shortTechnologies.find((st) =>
				st.toLocaleLowerCase().includes(lcWord),
			) ||
			!!project.hostedOn?.toLocaleLowerCase().includes(lcWord)
		);
	},
);

const filterByKeywords = createFilterByKeywordFn<FlattenedProjectCard>(
	(project, id) =>
		id === "hosts" ? [project.hostedOn ?? ""] : project.longTechnologies,
);

const filterByDate = createFilterByDateFn<FlattenedProjectCard>(
	(project) => project.firstReleased.date,
);

const ProjectsPage: React.FC = () => {
	const {
		pagination,
		createFilter,
		removeFilter,
		modifyDate,
		modifyKeywords,
		modifyFilterType,
		modifySearch,
		filters,
	} = useFilter(
		projects,
		projects[projects.length - 1].firstReleased.date,
		projects[0].firstReleased.date,
		[
			{ id: "hosts", allKeywords: projectHosts },
			{ id: "technologies", allKeywords: projectTechs },
		],
		createFilterOptions,
		filterByDate,
		filterByKeywords,
		filterBySearch,
	);

	const options: FilterOption[] = [
		{
			label: "Publish Date",
			id: "date",
			disabled: filters.some((filter) => filter.id === "date"),
		},
		{
			label: "Hosts",
			id: "hosts",
			disabled: filters.some((filter) => filter.id === "hosts"),
		},
		{
			label: "Technologies",
			id: "technologies",
			disabled: filters.some((filter) => filter.id === "technologies"),
		},
		{
			label: "Search",
			id: "search",
			disabled: false,
		},
	];

	return (
		<Page>
			<PaginatedPageContents>
				<LeadHeading>Projects</LeadHeading>
				<Filter
					onCreate={createFilter}
					onRemove={removeFilter}
					onModifyDate={modifyDate}
					onModifyKeywords={modifyKeywords}
					onModifyWordFilterType={modifyFilterType}
					onModifySearch={modifySearch}
					options={options}
					filters={filters}
					currentPage={pagination.page}
					numPages={pagination.numPages}
					setPage={pagination.setPage}
				/>
				<Grouping>
					<CardContainer
						items={pagination.visibleItems}
						type="project"
						Card={ProjectCard}
					/>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default ProjectsPage;
