import type * as React from "react";

import {
	ProjectBox,
	ProjectBoxes,
} from "@/components/Portfolio/Portfolio.styles";
import type { ProjectGridData } from "@Types/portfolio";
import IndividualProject from "./IndividualProject.component";
import LinkOrNot from "./LinkOrNot.component";

const ProjectGrid: React.FC<ProjectGridData> = ({
	projects,
	handleMouseEnter,
	handleMouseLeave,
	highlightedProjectTitles,
	viewedTechs,
}) => {
	return (
		<ProjectBoxes>
			{projects.map((project) => (
				<ProjectBox
					key={project.title}
					onMouseEnter={() => handleMouseEnter(project.title)}
					onMouseLeave={() => handleMouseLeave()}
					highlighted={highlightedProjectTitles.has(project.title)}
				>
					<LinkOrNot link={project.repoLink ?? project.mainLink}>
						<IndividualProject project={project} techs={viewedTechs} />
					</LinkOrNot>
				</ProjectBox>
			))}
		</ProjectBoxes>
	);
};

export default ProjectGrid;
