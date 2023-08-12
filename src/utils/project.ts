import { getTimeFromDateString } from "./dates";
import { createSearchableString } from './posts';

import { FlattenedProject, PartialFlattenedProject, ProjectType } from "@Types/posts";

export function formatAllProjects(projects: ProjectType[]): FlattenedProject[] {
  return projects.map(p => formatProject(p)).sort((a, b) => b.firstReleased.date.getTime() - a.firstReleased.date.getTime());
}

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
    longTechnologies: tech.map(t => getFullTechName(t)),
  }
  if (project.project.latestUpdate) {
    piecemealProject.latestUpdate = getTimeFromDateString(project.project.latestUpdate)
  }
  const _project: FlattenedProject = {
    ...piecemealProject,
    meta: createMetaForProject(piecemealProject)
  }
  return _project;
}

export function createMetaForProject(project: PartialFlattenedProject) {
  const data = [
    project.title,
    project.slug,
    project.content,
    project.hostedOn,
    project.firstReleased.year,
    project.firstReleased.full,
    project.firstReleased.short,
    ...project.shortTechnologies,
    ...project.longTechnologies
  ];
  if (project.repoLink) {
    data.push('github')
    data.push('repo')
  }
  return createSearchableString(data.filter(d => !!d))
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
      return "WebSockets"
    default:
      return tech;
  }
}

/**
 * Given an amount of WP content split into paragraphs, take the first paragraph of content
 * without the html tags
 */
export const getFirstParagraphOfContent = (content: string) => {
  const [firstParagraph] = content.split("</p>")
  return firstParagraph.replace(/<p>/g, "")
}
