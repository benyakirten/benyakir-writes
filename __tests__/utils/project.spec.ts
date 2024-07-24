import * as project from "@Utils/project";

import type { FlattenedProject, ProjectType } from "@Types/posts";

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
			meta: "python py sep september 2019 project content a projectaslug project title a",
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

			meta: "repo github angular graphql ng gql oct october 2019 google project content b projectbslug project title b",
		},
	];
	describe("createMetaForProject", () => {
		it("should create the meta in a particular way based on the project", () => {
			const projectOne = flattenedProjects[0];
			const resultOne = project.createMetaForProject(projectOne).split(" ");

			expect(resultOne.length).toEqual(12);
			expect(resultOne[0]).toEqual(
				projectOne.longTechnologies[0].toLowerCase(),
			);
			expect(resultOne[1]).toEqual(projectOne.shortTechnologies[0]);
			expect(resultOne[2]).toEqual(
				projectOne.firstReleased.short.toLowerCase(),
			);
			expect(resultOne[3]).toEqual(projectOne.firstReleased.full.toLowerCase());
			expect(resultOne[4]).toEqual(projectOne.firstReleased.year.toString());
			expect(resultOne.slice(5, 8).join(" ")).toEqual(
				projectOne.content.toLowerCase(),
			);
			expect(resultOne[8]).toEqual(projectOne.slug!.toLowerCase());
			expect(resultOne.slice(9).join(" ")).toEqual(
				projectOne.title.toLowerCase(),
			);

			const projectTwo = flattenedProjects[1];
			const resultTwo = project.createMetaForProject(projectTwo).split(" ");

			expect(resultTwo.length).toEqual(17);
			expect(resultTwo[0]).toEqual("repo");
			expect(resultTwo[1]).toEqual("github");
			expect(resultTwo[2]).toEqual(
				projectTwo.longTechnologies[1].toLowerCase(),
			);
			expect(resultTwo[3]).toEqual(
				projectTwo.longTechnologies[0].toLowerCase(),
			);
			expect(resultTwo[4]).toEqual(
				projectTwo.shortTechnologies[1].toLowerCase(),
			);
			expect(resultTwo[5]).toEqual(
				projectTwo.shortTechnologies[0].toLowerCase(),
			);
			expect(resultTwo[6]).toEqual(
				projectTwo.firstReleased.short.toLowerCase(),
			);
			expect(resultTwo[7]).toEqual(projectTwo.firstReleased.full.toLowerCase());
			expect(resultTwo[8]).toEqual(projectTwo.firstReleased.year.toString());
			expect(resultTwo[9]).toEqual(projectTwo.hostedOn?.toLowerCase());
			expect(resultTwo.slice(10, 13).join(" ")).toEqual(
				projectTwo.content.toLowerCase(),
			);
			expect(resultTwo[13]).toEqual(projectTwo.slug);
			expect(resultTwo.slice(14).join(" ")).toEqual(
				projectTwo.title.toLowerCase(),
			);

			// meta: 'repo github angular graphql ng gql oct october 2019 google project content b projectbslug project title b'
		});

		it("should give known results for known inputs", () => {
			for (const flattenedProject of flattenedProjects) {
				expect(project.createMetaForProject(flattenedProject)).toEqual(
					flattenedProject.meta,
				);
			}
		});
	});

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

	describe("formatAllProjects", () => {
		it("should return the projects and returned in descending chronological order", () => {
			const result = project.formatAllProjects(dummyQueries);
			expect(result[0]).toEqual(flattenedProjects[1]);
			expect(result[1]).toEqual(flattenedProjects[0]);
		});
	});
});
