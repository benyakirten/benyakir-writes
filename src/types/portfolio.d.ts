import { FlattenedProjectCard } from "./posts";

type ProjectImage = FileNode & {
	childImageSharp: {
		gatsbyImageData: IGatsbyImageData;
	};
};

type RecentProjectItem = FlattenedProjectCard & {
	image?: ProjectImage;
};

type ProjectGridData = {
	projects: RecentProjectItem[];
	highlightedProjectTitles: Set<string>;
	viewedTechs: Set<string>;
	handleMouseEnter: (title: string) => void;
	handleMouseLeave: () => void;
};

type SVGData = {
	xMovement: number;
	yMovement: number;
};

type SVGShapeData = SVGData & ChildrenProp;

type ProjectFiltersData = {
	allTechs: string[];
	viewedTechs: Set<string>;
	onToggle: (tech: string) => void;
	onToggleTentativeTech: (tech: string) => void;
};

type WorkHistoryDatum = {
	title: string;
	company: string;
	startDate: Date;
	endDate: Date | null;
	points: string[];
};
