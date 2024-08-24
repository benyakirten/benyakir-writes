import { FlattenedProjectCard } from "./posts";

export type ProjectImage = FileNode & {
	childImageSharp: {
		gatsbyImageData: IGatsbyImageData;
	};
};

export type RecentProjectItem = FlattenedProjectCard & {
	image?: ProjectImage;
};

export type ProjectGridData = {
	projects: RecentProjectItem[];
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
