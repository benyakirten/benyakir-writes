import * as React from "react";

import {
	Grouping,
	LeadHeading,
	Page,
	PaginatedPageContents,
} from "@Styles/general-components";

import { usePagination } from "@Hooks";
import {
	projectHosts,
	projectTechs,
	projects,
	projectsDescription,
} from "@/data/search";
import { CardContainer, NewProjectCard } from "@/components/Cards";
import {
	CreateFilterOption,
	DateFilter,
	FilterOption,
	ItemFilter,
	KeywordFilter,
	SearchFilter,
} from "@/types/filters";
import {
	createAddDateFilterFn,
	createAddKeywordFilterFn,
	createAddSearchFilterFn,
	createModifyFilterFns,
} from "@/utils/filter";
import { FlattenedProjectCard } from "@/types/posts";
import { Filter } from "@/components/Filters";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Projects</title>
		<meta name="description" content={projectsDescription} />
	</>
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

	function filterBySearch(
		filter: SearchFilter,
		projects: FlattenedProjectCard[],
	): FlattenedProjectCard[] {
		if (filter.search === "") {
			return projects;
		}

		const search = filter.search.toLowerCase().split(" ");
		const fn =
			filter.type === "any"
				? search.some.bind(search)
				: search.every.bind(search);

		return projects.filter((project) =>
			fn((word) => {
				const lcWord = word.toLocaleLowerCase();
				return (
					project.meta[word] ||
					project.title.toLocaleLowerCase().includes(lcWord) ||
					project.content?.toLocaleLowerCase().includes(lcWord) ||
					project.longTechnologies?.find((lt) =>
						lt.toLocaleLowerCase().includes(lcWord),
					) ||
					project.shortTechnologies.find((st) =>
						st.toLocaleLowerCase().includes(lcWord),
					) ||
					project.hostedOn?.toLocaleLowerCase().includes(lcWord)
				);
			}),
		);
	}

	function filterByKeywords(
		filter: KeywordFilter,
		projects: FlattenedProjectCard[],
	): FlattenedProjectCard[] {
		if (filter.currentKeywords.length === 0) {
			return projects;
		}

		const fn =
			filter.type === "any"
				? filter.currentKeywords.some.bind(filter.currentKeywords)
				: filter.currentKeywords.every.bind(filter.currentKeywords);
		return projects.filter((project) => {
			const keywords =
				filter.id === "hosts" ? [project.hostedOn] : project.longTechnologies;
			return fn((keyword) => keywords?.includes(keyword.value));
		});
	}

	function filterByDate(filter: DateFilter, projects: FlattenedProjectCard[]) {
		return projects.filter((project) => {
			const projectDate = project.firstReleased.date.getTime();
			const start = filter.start.getTime();
			const end = filter.end.getTime();
			return projectDate >= start && projectDate <= end;
		});
	}

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
