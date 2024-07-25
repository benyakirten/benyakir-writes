import * as React from "react";

import { getFullTechName } from "@/utils/project";
import type { ProjectFiltersData } from "@Types/portfolio";
import { FilterContainer } from "./Portfolio.styles";
import TextCheckbox from "./TextCheckbox.component";

const ProjectFilters: React.FC<ProjectFiltersData> = ({
	allTechs,
	viewedTechs,
	onToggle,
	onToggleTentativeTech,
}) => {
	return (
		<FilterContainer>
			{allTechs.map((tech) => (
				<TextCheckbox
					key={tech}
					checked={viewedTechs.has(tech)}
					onToggle={() => onToggle(tech)}
					onMouseEnter={() => onToggleTentativeTech(tech)}
					onMouseLeave={() => onToggleTentativeTech(tech)}
				>
					{getFullTechName(tech)}
				</TextCheckbox>
			))}
		</FilterContainer>
	);
};

export default ProjectFilters;
