import * as React from 'react';

import { ProjectBox, ProjectBoxes } from '@/components/Portfolio/Portfolio.styles';
import { ProjectGridData } from '@Types/portfolio';
import IndividualProject from './IndividualProject.component';

const ProjectGrid: React.FC<ProjectGridData> = ({
  projects,
  ghIcon,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  viewedTechs,
}) => {
  const filteredProjects = React.useMemo(
    () =>
      viewedTechs.size === 0
        ? projects
        : projects.filter((project) => project.technologies.some((tech) => viewedTechs.has(tech))),
    [viewedTechs, projects],
  );
  return (
    <ProjectBoxes>
      {filteredProjects.map((project) => (
        <ProjectBox
          key={project.title}
          onMouseEnter={() => handleMouseEnter(project.title)}
          onMouseLeave={() => handleMouseLeave()}
          hovered={hovered === project.title}
        >
          <IndividualProject project={project} ghIcon={ghIcon} techs={viewedTechs} />
        </ProjectBox>
      ))}
    </ProjectBoxes>
  );
};

export default ProjectGrid;
