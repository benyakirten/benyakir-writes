import { getTimeFromDateString } from "./dates";
import { createSearchableString } from "./posts";

import type {
	FlattenedProject,
	PartialFlattenedProject,
	ProjectType,
} from "@/types/posts";

export function formatProject(project: ProjectType): FlattenedProject {
	const tech = project.project.technologies.split(", ");
	const piecemealProject: PartialFlattenedProject = {
		title: project.title,
		slug: project.slug,
		mainLink: project.project.mainLink,
		hostedOn: project.project.hostedOn,
		repoLink: project.project.repoLink,
		content: project.content,
		firstReleased: getTimeFromDateString(project.project.firstReleased),
		shortTechnologies: tech,
		longTechnologies: tech.map((t) => getFullTechName(t)),
	};
	if (project.project.latestUpdate) {
		piecemealProject.latestUpdate = getTimeFromDateString(
			project.project.latestUpdate,
		);
	}
	const _project: FlattenedProject = {
		...piecemealProject,
		meta: {},
	};
	return _project;
}

export function getFullTechName(tech: string) {
	switch (tech.toLowerCase()) {
		case "html":
			return "HTML";
		case "css":
			return "CSS";
		case "sass":
			return "Sass";
		case "js":
			return "JavaScript";
		case "ts":
			return "TypeScript";
		case "py":
			return "Python";
		case "php":
			return "PHP";
		case "wp":
			return "WordPress";
		case "ng":
			return "Angular";
		case "swift":
			return "Swift";
		case "react":
			return "React";
		case "vue":
			return "Vue";
		case "cs":
			return "C#";
		case "unity":
			return "Unity";
		case "ml":
			return "Machine Learning";
		case "svelte":
			return "Svelte";
		case "gql":
			return "GraphQL";
		case "tw":
			return "Tailwind";
		case "go":
			return "Golang";
		case "ex":
			return "Elixir";
		case "ws":
			return "Web Sockets";
		case "rs":
			return "Rust";
		case "wip":
			return "Under Construction";
		default:
			return tech;
	}
}

/**
 * Given an amount of WP content split into paragraphs, take the first paragraph of content
 * without the html tags
 */
export const getFirstParagraphOfContent = (content: string) => {
	const [firstParagraph] = content.split("</p>");
	return firstParagraph.replace(/<p>/g, "");
};
