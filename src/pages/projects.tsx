import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@/styles/general-components";

import { usePagination } from "@/hooks";
import {
	projectHosts,
	projectTechs,
	projects,
	projectsDescription,
} from "@/data/search";
import { CardContainer, ProjectCard } from "@/components/Cards";
import { CreateFilterOption, FilterOption, ItemFilter } from "@/types/filters";
import {
	createAddDateFilterFn,
	createAddKeywordFilterFn,
	createAddSearchFilterFn,
	createFilterByDateFn,
	createFilterByKeywordFn,
	createFilterBySearchFn,
	createModifyFilterFns,
} from "@/utils/filter";
import { FlattenedProjectCard } from "@/types/posts";
import { Filter } from "@/components/Filters";
import { HeadBase } from "@/components/SEO";

export const Head: React.FC = () => (
	<HeadBase title="Projects" description={projectsDescription} />
);

const ProjectsPage: React.FC = () => {
	const projectPagination = usePagination<FlattenedProjectCard>(projects);
	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	const options: FilterOption[] = [
		{
			label: "Publish Date",
			id: "date",
			disabled: filters.some((filter) => filter.id === "date"),
		},
		{
			label: "Hosts",
			id: "hosts",
			disabled: false,
		},
		{
			label: "Technologies",
			id: "technologies",
			disabled: false,
		},
		{
			label: "Search",
			id: "search",
			disabled: false,
		},
	];

	const newFilterOptions: CreateFilterOption[] = [
		{
			match: "date",
			fn: createAddDateFilterFn(
				projects[projects.length - 1].firstReleased.date,
				projects[0].firstReleased.date,
				setFilters,
			),
		},
		{
			match: "hosts",
			fn: createAddKeywordFilterFn("hosts", projectHosts, setFilters),
		},
		{
			match: "technologies",
			fn: createAddKeywordFilterFn("technologies", projectTechs, setFilters),
		},
		{
			match: "search",
			fn: createAddSearchFilterFn(setFilters),
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

	const {
		createFilter,
		removeFilter,
		modifyDate,
		modifyKeywords,
		modifySearch,
		modifyFilterType,
	} = createModifyFilterFns(
		newFilterOptions,
		setFilters,
		filterByDate,
		filterByKeywords,
		filterBySearch,
		projectPagination.setItems,
		projects,
	);

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
					currentPage={projectPagination.page}
					numPages={projectPagination.numPages}
					setPage={projectPagination.setPage}
				/>
				<Grouping>
					<CardContainer
						items={projectPagination.visibleItems}
						type="project"
						Card={ProjectCard}
					/>
				</Grouping>
			</PaginatedPageContents>
		</Page>
	);
};

export default ProjectsPage;
