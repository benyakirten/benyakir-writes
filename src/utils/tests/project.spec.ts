import { describe, expect, it } from "vitest";

import type { FlattenedProject, ProjectType } from "@/types/posts";
import * as project from "@/utils/project";

describe("project util", () => {
	const dummyQueries: ProjectType[] = [
		{
			title: "project title A",
			content: "project content A",
			slug: "projectaslug",
			project: {
				technologies: "py",
				firstReleased: "09/15/2019",
			},
		},
		{
			title: "project title B",
			content: "project content B",
			slug: "projectbslug",
			project: {
				technologies: "gql, ng",
				mainLink: "https://www.google.com",
				repoLink: "https://www.github.com/",
				hostedOn: "Google",
				firstReleased: "10/15/2019",
				latestUpdate: "11/15/2019",
			},
		},
	];
	const flattenedProjects: FlattenedProject[] = [
		{
			title: "project title A",
			content: "project content A",
			slug: "projectaslug",
			shortTechnologies: ["py"],
			longTechnologies: ["Python"],
			firstReleased: {
				date: new Date("09/15/2019"),
				short: "SEP",
				full: "September",
				month: 9,
				year: 2019,
			},
			meta: {},
		},
		{
			title: "project title B",
			content: "project content B",
			slug: "projectbslug",
			shortTechnologies: ["gql", "ng"],
			longTechnologies: ["GraphQL", "Angular"],
			mainLink: "https://www.google.com",
			hostedOn: "Google",
			repoLink: "https://www.github.com/",
			firstReleased: {
				date: new Date("10/15/2019"),
				short: "OCT",
				full: "October",
				month: 10,
				year: 2019,
			},
			latestUpdate: {
				date: new Date("11/15/2019"),
				short: "NOV",
				full: "November",
				month: 11,
				year: 2019,
			},

			meta: {},
		},
	];

	describe("formatProject", () => {
		it("should give known results for known inputs", () => {
			expect(project.formatProject(dummyQueries[0])).toEqual(
				flattenedProjects[0],
			);
			expect(project.formatProject(dummyQueries[1])).toEqual(
				flattenedProjects[1],
			);
		});
	});
});
