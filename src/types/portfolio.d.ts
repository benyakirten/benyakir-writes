import type { ProjectImageData } from "./query";

export type ProjectGridDatum = {
	title: string;
	description: string;
	technologies: string[];
	firstReleased: Date;
	mainLink?: string;
	repoLink?: string;
	hostedOn?: string;
	image?: ProjectImageData;
};

export type ProjectGridData = {
	projects: ProjectGridDatum[];
	highlightedProjectTitles: Set<string>;
	viewedTechs: Set<string>;
	handleMouseEnter: (title: string) => void;
	handleMouseLeave: () => void;
};

export type SVGData = {
	xMovement: number;
	yMovement: number;
};

export type SVGShapeData = SVGData & ChildrenProp;

export type ProjectFiltersData = {
	allTechs: string[];
	viewedTechs: Set<string>;
	onToggle: (tech: string) => void;
	onToggleTentativeTech: (tech: string) => void;
};
